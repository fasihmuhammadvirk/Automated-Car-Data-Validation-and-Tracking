import cv2
import easyocr
import re 
from PIL import Image 
import Prediction as p 

def remove_special_characters(input_string):
    # Define a regex pattern to match non-alphanumeric characters
    pattern = re.compile(r'[^a-zA-Z0-9\s]')
    
    # Use the pattern to substitute non-alphanumeric characters with an empty string
    result_string = re.sub(pattern, '', input_string)
    
    return result_string

# Define a list of city names in Pakistan
pakistan_cities = ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta', 'Sialkot']

# Define a function to replace the entire string if it contains a city name or has more than 3 alphabetic characters
def replace_city_name(text):
    for city in pakistan_cities:
        if city in text or sum(c.isalpha() for c in text) > 3:
            return ''
    return text

def perform_ocr(img):    
    image = Image.fromarray(img)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    # Perform OCR
    reader = easyocr.Reader(['en'],gpu=False)
    results = reader.readtext(gray)

    # Find the Two Largest Bounding Boxes
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
    
    text = remove_special_characters(plate)
    return str(text)
