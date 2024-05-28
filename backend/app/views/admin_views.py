from fastapi import APIRouter, Depends, status, WebSocket
from controllers import admin_controller 
from typing import List
from models.admin_model import SignupInfo, LoginInfo, CheckFeed
from fastapi.responses import StreamingResponse
from controllers.camera_feed_controller import generate_video_stream
import asyncio

router = APIRouter()



@router.post('/signup', status_code=status.HTTP_201_CREATED, tags=['Author Signup - Login'])
def signup(Admin_Info: SignupInfo):
    return admin_controller.create_author(Admin_Info.dict())

@router.post('/login', status_code=status.HTTP_200_OK, tags=['Author Signup - Login'])
def login(Admin_Info: LoginInfo):
    # Only 'cnic' and 'password' are required for login
    return admin_controller.login_author(Admin_Info.dict())

# @router.get('/video_feed', status_code=status.HTTP_200_OK, tags=['Video Feed'])
# def video_feed():
#     return StreamingResponse(generate_video_stream(0), media_type='multipart/x-mixed-replace; boundary=frame')

# @router.get('/stop_feed', status_code=status.HTTP_200_OK, tags=['Video Feed'])
# def stop():
#     generate_video_stream(1)
#     return  {"message": "Video stream stopped"}
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
        
# @router.get("/datafeed")
# async def websocket_data_endpoint(websocket:WebSocket):
#     await websocket.accept()
#     try:
#         while True:
#             data = await websocket.receive_text()
#             if data == 'start':
#                 await video_stream_data_controller.start_stream(websocket)
#             elif data == 'stop':
#                 video_stream_data_controller.stop_stream()
#     except:
#         video_stream_data_controller.stop_stream()
#         await websocket.close()