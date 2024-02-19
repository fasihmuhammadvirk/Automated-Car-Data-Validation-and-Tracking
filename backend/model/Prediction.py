import cv2
import numpy as np
import os



# settings
INPUT_WIDTH = 640
INPUT_HEIGHT = 640


def get_detections(img):
    
    onnx_file_path = '/Users/fasihmuhammad/Desktop/FYP Code/Final FYP App/backend/model/best.onnx'
    net = cv2.dnn.readNetFromONNX(onnx_file_path)
    # # LOAD YOLO MODEL
    # net = cv2.dnn.readNetFromONNX('')
    net.setPreferableBackend(cv2.dnn.DNN_BACKEND_OPENCV)
    net.setPreferableTarget(cv2.dnn.DNN_TARGET_CPU)
    # CONVERT IMAGE TO YOLO FORMAT
    image = img.copy()
    row, col, d = image.shape

    max_rc = max(row,col)
    input_image = np.zeros((max_rc, max_rc, 3), dtype=np.uint8)
    input_image[0:row, 0:col] = image

    # GET PREDICTION FROM YOLO MODEL
    blob = cv2.dnn.blobFromImage(
        input_image, 1/255, (INPUT_WIDTH, INPUT_HEIGHT), swapRB=True, crop=False)
    net.setInput(blob)
    #  it is a three deminision form like (1,25200,6) but we want two deminision.
    preds = net.forward()
    detections = preds[0]

    return input_image, detections


def non_maximum_supression(input_image, detections):
    # FILTER DETECTIONS BASED ON CONFIDENCE AND PROBABILIY SCORE
    # center x, center y, w , h, conf, proba
    boxes = []
    confidences = []

    image_w, image_h = input_image.shape[:2]
    x_factor = image_w/INPUT_WIDTH
    y_factor = image_h/INPUT_HEIGHT

    for i in range(len(detections)):
        row = detections[i]
        confidence = row[4]  # confidence of detecting license plate
        if confidence > 0.4:
            class_score = row[5]  # probability score of license plate
            if class_score > 0.25:
                cx, cy, w, h = row[0:4]

                left = int((cx - 0.5*w)*x_factor)
                top = int((cy-0.5*h)*y_factor)
                width = int(w*x_factor)
                height = int(h*y_factor)
                box = np.array([left, top, width, height])

                confidences.append(confidence)
                boxes.append(box)

    # clean
    boxes_np = np.array(boxes).tolist()
    confidences_np = np.array(confidences).tolist()
    # NMS
    index = np.array(cv2.dnn.NMSBoxes(
        boxes_np, confidences_np, 0.25, 0.45)).flatten()

    return boxes_np, confidences_np, index


def drawings(image, boxes_np, confidences_np, index):
    # drawings
    license_text = ''
    acc = 0
    for ind in index:
        x, y, w, h = boxes_np[ind]
        bb_conf = confidences_np[ind]
        acc = bb_conf*100
        conf_text = 'plate: {:.0f}%'.format(bb_conf*100)
#         license_text += extract_text(image,boxes_np[ind])

        cv2.rectangle(image, (x, y), (x+w, y+h), (255, 0, 255), 2)
        cv2.rectangle(image, (x, y-30), (x+w, y), (255, 0, 255), -1)
        cv2.rectangle(image, (x, y+h), (x+w, y+h+30), (0, 0, 0), -1)

        cv2.putText(image, conf_text, (x, y-10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 1)
        cv2.putText(image, license_text, (x, y+h+27),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 1)

#     return image, license_text
    return image, acc


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


# predictions
def yolo_predictions(img):

    image = cv2.imread(img)
    # step-1: detections
    input_image, detections = get_detections(image)
    # step-2: NMS
    boxes_np, confidences_np, index = non_maximum_supression(
        input_image, detections)
    
    plate = extract_plate(image, boxes_np[0])
    # step-3: drawings
    rect_image, acc = drawings(image, boxes_np, confidences_np, index)
    
    return rect_image, plate, acc
