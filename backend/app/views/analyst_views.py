from fastapi import APIRouter, Depends, status, WebSocket
from controllers import analyst_controller 
from typing import List
from models.analyst_model import SignupInfo, LoginInfo, CheckFeed,Notification
from fastapi.responses import StreamingResponse
from controllers.camera_feed_controller import generate_video_stream, get_number_plate
import asyncio

router = APIRouter()



@router.post('/signup', status_code=status.HTTP_201_CREATED, tags=['analyst Signup - Login'])
def signup(Admin_Info: SignupInfo):
    return analyst_controller.create_analyst(Admin_Info.dict())

@router.post('/login', status_code=status.HTTP_200_OK, tags=['analyst Signup - Login'])
def login(Admin_Info: LoginInfo):
    # Only 'cnic' and 'password' are required for login
    return analyst_controller.login_analyst(Admin_Info.dict())

import cv2
video_stream = None

@router.get('/video_feed')
async def video_feed():
    global video_stream
    if video_stream is None:
        video_stream = cv2.VideoCapture(0)
    return StreamingResponse(generate_video_stream(video_stream), media_type='multipart/x-mixed-replace; boundary=frame')

@router.get('/stop_feed')
async def stop_video_feed():
    global video_stream
    if video_stream is not None:
        video_stream.release()
        video_stream = None
    return 'Video stream stopped successfully.'
        

@router.get('/get_car_data', status_code=status.HTTP_200_OK, tags=['Car Detail'])
def get_car_data():
    return get_number_plate(video_stream)

@router.post('/get_analyst_notifications', status_code=status.HTTP_200_OK, tags=['Analyst Notifications'])
def get_analyst_notifications(notification:Notification):
    return analyst_controller.get_analyst_notifications(notification.dict())