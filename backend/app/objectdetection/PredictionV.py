# import cv2
# import numpy as np
# import onnx
# import onnxruntime
# import torch
# import torchvision.transforms as T
# from PIL import Image
# from ocr2 import perform_ocr
# import time
# # Settings
# INPUT_WIDTH = 640
# INPUT_HEIGHT = 640

# # Load the ONNX model
# onnx_file_path = '/Users/fasihmuhammadvirk/Desktop/Test FYP/model/best.onnx'
# onnx_model = onnx.load(onnx_file_path)
# onnx.checker.check_model(onnx_model)

# # Initialize ONNX Runtime session
# providers = ['CoreMLExecutionProvider', 'CPUExecutionProvider']
# session = onnxruntime.InferenceSession(onnx_file_path, providers=providers)

# def preprocess_image(img):
#     img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
#     img_pil = Image.fromarray(img_rgb)
#     transform = T.Compose([
#         T.Resize((INPUT_WIDTH, INPUT_HEIGHT)),
#         T.ToTensor(),
#     ])
#     return transform(img_pil).unsqueeze(0).numpy()

# def postprocess_detections(detections, original_shape):
#     boxes = []
#     confidences = []

#     input_w, input_h = original_shape[1], original_shape[0]
#     x_factor = input_w / INPUT_WIDTH
#     y_factor = input_h / INPUT_HEIGHT

#     for i in range(detections.shape[1]):
#         row = detections[0, i]
#         confidence = row[4]  # Confidence of detecting license plate
#         if confidence > 0.4:
#             class_score = row[5]  # Probability score of license plate
#             if class_score > 0.25:
#                 cx, cy, w, h = row[0:4]
#                 left = int((cx - 0.5 * w) * x_factor)
#                 top = int((cy - 0.5 * h) * y_factor)
#                 width = int(w * x_factor)
#                 height = int(h * y_factor)
#                 box = [left, top, width, height]

#                 confidences.append(confidence)
#                 boxes.append(box)

#     indices = cv2.dnn.NMSBoxes(boxes, confidences, 0.25, 0.45)
#     if len(indices) > 0:
#         indices = indices.flatten()
#     else:
#         indices = []

#     return boxes, confidences, indices

# def extract_plate(image, bbox, target_height=800):
#     x, y, w, h = bbox
#     roi = image[y:y+h, x:x+w]

#     if 0 in roi.shape:
#         return 'Number Plate Not Detected'

#     # Resize the image while preserving aspect ratio
#     aspect_ratio = roi.shape[1] / roi.shape[0]
#     target_width = int(target_height * aspect_ratio)
#     resized_roi = cv2.resize(roi, (target_width, target_height))
    
#     return resized_roi

# def yolo_predictions(image):
#     # Preprocess image
#     input_image = preprocess_image(image)
    
#     # Get detections
#     input_name = session.get_inputs()[0].name
#     output_name = session.get_outputs()[0].name
#     detections = session.run([output_name], {input_name: input_image})[0]
    
#     # Postprocess detections
#     boxes, confidences, indices = postprocess_detections(detections, image.shape)
    
#     if len(indices) > 0:
#         best_box = boxes[indices[0]]
#         acc = confidences[indices[0]] * 100
#         plate_image = extract_plate(image, best_box)
        
#         # Draw bounding boxes on the original image
#         for box in boxes:
#             cv2.rectangle(image, (box[0], box[1]), (box[0]+box[2], box[1]+box[3]), (255, 0, 0), 2)
        
#         return image, plate_image, acc
#     else:
#         return 'Number Plate Not Detected', 'Number Plate Not Detected', 0

# # def process_video(input_video_path):
# #     cap = cv2.VideoCapture(input_video_path)
# #     frame_counter = 0  # Counter to keep track of processed frames

# #     while cap.isOpened():
# #         ret, frame = cap.read()
# #         if not ret:
# #             break

# #         # Increment the frame counter
# #         frame_counter += 1
        
# #         # Process every 10th frame

# #         result_image, plate_image, acc = yolo_predictions(frame)
        
# #         if isinstance(result_image, str):
# #             cv2.imshow("Extracted Number Plate", frame)
# #             print(result_image)
# #             if cv2.waitKey(1) & 0xFF == ord('q'):
# #                 cap.release()
# #                 cv2.destroyAllWindows()
# #                 break

# #         else:
# #             cv2.imshow("Extracted Number Plate", result_image)
# #             if frame_counter % 10 == 0:
# #                 result_text = perform_ocr(plate_image)
# #                 print(f"Plate Image: {result_text}")
# #                 print(f"Accuracy: {acc:.2f}%")

# #             if cv2.waitKey(1) & 0xFF == ord('q'):
# #                 cap.release()
# #                 cv2.destroyAllWindows()
# #                 break

# start_time = time.time()
# image = cv2.imread('/Users/fasihmuhammadvirk/Desktop/Test FYP/test_images/test1.jpeg')
# plate_image, a,acc = yolo_predictions(image)
# print(f"Accuracy: {acc:.2f}%")
# end_time = time.time()

# elapsed_time = end_time - start_time

# print(f"Elapsed time: {elapsed_time:.2f} seconds")


import cv2
import numpy as np
import onnx
import onnxruntime as ort 
import torch
import torchvision.transforms as T
from PIL import Image
from objectdetection.ocr2 import perform_ocr
import asyncio
from concurrent.futures import ThreadPoolExecutor

# Settings
INPUT_WIDTH = 640
INPUT_HEIGHT = 640

# Load the ONNX model
onnx_file_path = '/Users/fasihmuhammadvirk/Desktop/Test FYP/model/best.onnx'
onnx_model = onnx.load(onnx_file_path)
onnx.checker.check_model(onnx_model)

# Initialize ONNX Runtime session with CoreML and CPU Execution Providers
providers = ['CoreMLExecutionProvider', 'CPUExecutionProvider']
session = ort.InferenceSession(onnx_file_path, providers=providers)

def preprocess_image(img):
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img_pil = Image.fromarray(img_rgb)
    transform = T.Compose([
        T.Resize((INPUT_WIDTH, INPUT_HEIGHT)),
        T.ToTensor(),
    ])
    return transform(img_pil).unsqueeze(0).numpy()

def postprocess_detections(detections, original_shape):
    boxes = []
    confidences = []

    input_w, input_h = original_shape[1], original_shape[0]
    x_factor = input_w / INPUT_WIDTH
    y_factor = input_h / INPUT_HEIGHT

    for i in range(detections.shape[1]):
        row = detections[0, i]
        confidence = row[4]  # Confidence of detecting license plate
        if confidence > 0.4:
            class_score = row[5]  # Probability score of license plate
            if class_score > 0.25:
                cx, cy, w, h = row[0:4]
                left = int((cx - 0.5 * w) * x_factor)
                top = int((cy - 0.5 * h) * y_factor)
                width = int(w * x_factor)
                height = int(h * y_factor)
                box = [left, top, width, height]

                confidences.append(confidence)
                boxes.append(box)

    indices = cv2.dnn.NMSBoxes(boxes, confidences, 0.25, 0.45)
    if len(indices) > 0:
        indices = indices.flatten()
    else:
        indices = []

    return boxes, confidences, indices

def extract_plate(image, bbox, target_height=800):
    x, y, w, h = bbox
    roi = image[y:y+h, x:x+w]

    if 0 in roi.shape:
        return 'Number Plate Not Detected'

    # Resize the image while preserving aspect ratio
    aspect_ratio = roi.shape[1] / roi.shape[0]
    target_width = int(target_height * aspect_ratio)
    resized_roi = cv2.resize(roi, (target_width, target_height))
    
    return resized_roi

def yolo_predictions(image):
    # Preprocess image
    input_image = preprocess_image(image)
    
    # Get detections
    input_name = session.get_inputs()[0].name
    output_name = session.get_outputs()[0].name
    detections = session.run([output_name], {input_name: input_image})[0]
    
    # Postprocess detections
    boxes, confidences, indices = postprocess_detections(detections, image.shape)
    
    if len(indices) > 0:
        best_box = boxes[indices[0]]
        acc = confidences[indices[0]] * 100
        plate_image = extract_plate(image, best_box)
        
        # Draw bounding boxes on the original image
        for box in boxes:
            cv2.putText(image,str(int(acc)), (box[0], box[1]-10),cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 0, 255), 1)
            cv2.rectangle(image, (box[0], box[1]), (box[0]+box[2], box[1]+box[3]), (255, 0, 255),2)
        return image, plate_image, acc
    else:
        return 'Number Plate Not Detected', 'Number Plate Not Detected', 0





def get_number_plate(image):
    image = cv2.imread(image)
    # Preprocess image
    result_image, plate_image, acc = yolo_predictions(image)
    text = perform_ocr(plate_image)
    return text




def process_video(input_video_path):
    cap = cv2.VideoCapture(input_video_path)
    frame_counter = 0  # Counter to keep track of processed frames

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        # Increment the frame counter
        frame_counter += 1
        
        # Process every 10th frame

        result_image, plate_image, acc = yolo_predictions(frame)
        
        if isinstance(result_image, str):
            cv2.imshow("Extracted Number Plate", frame)
            print(result_image)
            if cv2.waitKey(1) & 0xFF == ord('q'):
                cap.release()
                cv2.destroyAllWindows()
                break

        else:
            cv2.imshow("Extracted Number Plate", result_image)
            # if acc >= 60 and frame_counter % 10 == 0:
            #     result_text = perform_ocr(plate_image)
            #     print(f"Plate Image: {result_text}")
            #     print(f"Accuracy: {acc:.2f}%")

            if cv2.waitKey(1) & 0xFF == ord('q'):
                cap.release()
                cv2.destroyAllWindows()
                break


# input_video = '/Users/fasihmuhammadvirk/Desktop/Github/Automated-Car-Data-Validation-and-Tracking/backend/objectdetection/test_images/traffic.mp4'
# process_video(input_video)


