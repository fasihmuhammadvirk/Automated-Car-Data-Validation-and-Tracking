from fastapi import APIRouter, Depends, status, WebSocket
from controllers import administration_controller as a
from typing import List
from models.admin_model import  LoginInfo
from fastapi.responses import StreamingResponse
from controllers.camera_feed_controller import generate_video_stream, get_number_plate
import asyncio

router = APIRouter()

@router.post('/login', status_code=status.HTTP_200_OK, tags=['Admin - Login'])
def login(Admin_Info: LoginInfo):
    # Only 'id' and 'password' are required for login
    return a.login_admin(Admin_Info.dict())

@router.post('/signup', status_code=status.HTTP_201_CREATED, tags=['Admin - Signup'])
def signup(Admin_Info: LoginInfo):
    return a.create_admin(Admin_Info.dict())

@router.get('/getuserslist', status_code=status.HTTP_200_OK, tags=['Admin - Get Users List'])
def getuserslist():
    return a.get_user_list()