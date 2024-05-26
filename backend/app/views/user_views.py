from fastapi import APIRouter, Depends,status,UploadFile, File, HTTPException
from controllers import user_controller, car_details_controller
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
    
class Car_Record(BaseModel):
    number_plate: str

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

@router.post('/user/cardetailtext', status_code=status.HTTP_200_OK, tags=['Car Detail Text'])
def greet(car_record: Car_Record):
    return car_details_controller.get_car_detail_text(car_record.dict())


@router.post("/user/cardetailimage/")
async def extract_number_plate(image: UploadFile = File(...)):
    response = car_details_controller.get_car_detail_image(image)
    return response