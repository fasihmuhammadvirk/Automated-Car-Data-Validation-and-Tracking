from fastapi import APIRouter, Depends, status
from controllers import admin_controller 
from typing import List
from models.admin_model import SignupInfo, LoginInfo

router = APIRouter()



@router.post('/signupauthor', status_code=status.HTTP_201_CREATED, tags=['Author Signup - Login'])
def signup(Admin_Info: SignupInfo):
    return admin_controller.create_author(Admin_Info.dict())

@router.post('/loginauthor', status_code=status.HTTP_200_OK, tags=['Author Signup - Login'])
def login(Admin_Info: LoginInfo):
    # Only 'cnic' and 'password' are required for login
    return admin_controller.login_author(Admin_Info.dict())
