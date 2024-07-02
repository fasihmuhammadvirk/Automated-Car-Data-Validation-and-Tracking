import cv2
import easyocr
import re
from PIL import Image
import numpy as np

import certifi
import ssl
import urllib

# Define a list of city names in Pakistan
pakistan_cities = ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta', 'Sialkot']

def remove_special_characters(input_string):
    """Remove non-alphanumeric characters from the string."""
    text = re.sub(r'[^a-zA-Z0-9\s]', '', input_string)
    if " " in text:
        return text.replace(" ", "") 
    else :
        return text

def replace_city_name(text):
    """Replace the entire string if it contains a city name or has more than 3 alphabetic characters."""
    for city in pakistan_cities:
        if city in text or sum(c.isalpha() for c in text) > 3:
            return ''
    return text

def perform_ocr(image):
    """Perform OCR on the image to extract the number plate text."""
    # Convert image to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    # Configure SSL context to use certifi certificates
    ssl_context = ssl.create_default_context(cafile=certifi.where())
    opener = urllib.request.build_opener(urllib.request.HTTPSHandler(context=ssl_context))
    urllib.request.install_opener(opener)
    # Initialize EasyOCR reader with GPU support
    reader = easyocr.Reader(['en'],download_enabled=True,model_storage_directory= '/Users/fasihmuhammadvirk/Desktop/Github/Automated-Car-Data-Validation-and-Tracking/backend/objectdetection/', gpu=True) 
        # Configure SSL context to use certifi certificates

    # Perform OCR
    results = reader.readtext(gray,batch_size=100)
    # largest_boxes = sorted(results, key=lambda x: (x[0][2][0] - x[0][0][0]) * (x[0][2][1] - x[0][0][1]), reverse=True)[:2]
    
    largest_boxes = [(0, '')] * 2

    for detection in results:
        box = detection[0]
        x1, y1 = box[0]
        x2, y2 = box[2]
        area = (x2 - x1) * (y2 - y1)

        if area > largest_boxes[0][0]:
            largest_boxes[1] = largest_boxes[0]
            largest_boxes[0] = (area, detection[1])
        elif area > largest_boxes[1][0]:
            largest_boxes[1] = (area, detection[1])
    # Replace city names in the largest bounding boxes
    largest_boxes[0] = (largest_boxes[0][0], replace_city_name(largest_boxes[0][1]))
    largest_boxes[1] = (largest_boxes[1][0], replace_city_name(largest_boxes[1][1]))

    plate = str(largest_boxes[1][1])+ ' ' + str(largest_boxes[0][1])
    # Process and clean the text from the largest bounding boxes
    # plate = ''.join(replace_city_name(box[1]) for box in largest_boxes)
    cleaned_text = remove_special_characters(plate)
    
    return cleaned_text.upper()


# image = '/Users/fasihmuhammadvirk/Desktop/Github/Automated-Car-Data-Validation-and-Tracking/backend/objectdetection/test_images/image3.jpeg'
# import time 
# start_time = time.time()
# image = cv2.imread(image)
# print(perform_ocr(image))
# end_time = time.time()

# elapsed_time = end_time - start_time

# print(f"Elapsed time: {elapsed_time:.2f} seconds")