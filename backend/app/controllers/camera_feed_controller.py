from fastapi import FastAPI, WebSocket,HTTPException, status
from fastapi.responses import HTMLResponse
from objectdetection.PredictionV import yolo_predictions, get_number_plate
from objectdetection.ocr2 import perform_ocr
import cv2
import base64
import json 
from database.connection import Session
from database.models import Record as Car_Record
from database.models import User_Info as User
from fastapi import HTTPException, status, UploadFile
from typing import Optional
from middleware.utils import decode_access_token
from datetime import datetime
db = Session()


def get_car_data(number_plate : str):
    db_car = db.query(Car_Record).filter(Car_Record.number_plate == number_plate ).first()
    if not db_car:
        return {'number_plate': number_plate,
                'message': "No Car Detail to Fetch"}
    return db_car

def get_number_plate(video_stream):
    while video_stream is not None:
        ret, frame = video_stream.read()
        if not ret:
            break
        result_image, plate_image, acc = yolo_predictions(frame)

        if isinstance(result_image, str):
            pass
        else:
            if acc >= 60:
                text = perform_ocr(frame)
                car_data = get_car_data(text)
                if car_data:
                    return car_data


def generate_video_stream(video_stream):   
    while video_stream is not None:
        ret, frame = video_stream.read()
        if not ret:
            break

        result_image, plate_image, acc = yolo_predictions(frame)

        if isinstance(result_image, str):
            ret, buffer = cv2.imencode('.jpg', frame)
        else:
            ret, buffer = cv2.imencode('.jpg', result_image)

        frame = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
