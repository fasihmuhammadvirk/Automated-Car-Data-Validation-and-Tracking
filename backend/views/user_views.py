from fastapi import APIRouter, Depends, status
from controllers import user_controller
from typing import List
from pydantic import BaseModel

router = APIRouter()

class SignupInfo(BaseModel):
    name: str
    cnic: str
    password: str
    number_plate: str

class LoginInfo(BaseModel):
    cnic: str
    password: str

@router.get('/', status_code=status.HTTP_200_OK, tags=['Greetings'])
def greet():
    return user_controller.greet()

@router.post('/signupuser', status_code=status.HTTP_201_CREATED, tags=['User Signup - Login'])
def signup(user: SignupInfo):
    return user_controller.create_user(user.dict())

@router.post('/loginuser', status_code=status.HTTP_200_OK, tags=['User Signup - Login'])
def login(user: LoginInfo):
    # Only 'cnic' and 'password' are required for login
    return user_controller.login_user(user.dict())
