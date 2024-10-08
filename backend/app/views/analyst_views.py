from fastapi import APIRouter, Depends, WebSocket
from controllers import analyst_controller 
from starlette import status
from fastapi import HTTPException
from typing import List
from models.analyst_model import SignupInfo, LoginInfo, CheckFeed,Notification, AnalystNotification
from fastapi.responses import StreamingResponse
from controllers.camera_feed_controller import generate_video_stream, get_number_plate
import asyncio
import cv2

router = APIRouter()



@router.post('/signup', status_code=status.HTTP_201_CREATED, tags=['analyst Signup - Login'])
def signup(Admin_Info: SignupInfo):
    return analyst_controller.create_analyst(Admin_Info.dict())

@router.post('/login', status_code=status.HTTP_200_OK, tags=['analyst Signup - Login'])
def login(Admin_Info: LoginInfo):
    # Only 'cnic' and 'password' are required for login
    return analyst_controller.login_analyst(Admin_Info.dict())


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
    return {'message': 'Video stream stopped successfully.'}

        

@router.get('/get_car_data', status_code=status.HTTP_200_OK, tags=['Car Detail'])
def get_car_data():
    return get_number_plate(video_stream)

@router.post('/get_notifications', status_code=status.HTTP_200_OK, tags=['Analyst Notifications'])
def get_analyst_notifications(notification:Notification):
    return analyst_controller.get_analyst_notifications(notification.dict())

@router.post('/send_notification', status_code=status.HTTP_200_OK, tags=['Analyst Notifications'])
def send_notification(state: AnalystNotification):
    return analyst_controller.send_notification(state.dict())

@router.post('/retrived_car_notification', status_code=status.HTTP_200_OK, tags=['Car Detail'])
def retrived_car(state: AnalystNotification):
    return analyst_controller.report_recoverd_stolen_car(state.dict())