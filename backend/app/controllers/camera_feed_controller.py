from fastapi import FastAPI, WebSocket
from fastapi.responses import HTMLResponse
from objectdetection.PredictionV import yolo_predictions, get_number_plate
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
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No Car Detail to Fetch")
    return db_car


class VideoStreamDataController:
    def __init__(self):
        self.cap = None

    async def start_stream(self, websocket: WebSocket):
        self.cap = cv2.VideoCapture(0)
        while self.cap.isOpened():
            ret, frame = self.cap.read()
            
            if ret:
                frame_counter += 1
                result_image, plate_image, acc = yolo_predictions(frame)
                if isinstance(result_image, str):
                    await websocket.send_text(result_image)
                else:
                    if acc >= 60 and frame_counter % 10 == 0:
                        result_text = get_number_plate(plate_image)
                        car_data = get_car_data(result_text)
                        await websocket.send_text(json.dumps(car_data))
            else:
                await websocket.send_text("Camera error")
                break

    def stop_stream(self):
        if self.cap:
            self.cap.release()
            self.cap = None


def generate_video_stream():
    cap = cv2.VideoCapture(0)
    while cap.isOpened():
        ret, frame = cap.read()
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

    cap.release()
            
video_stream_data_controller = VideoStreamDataController()