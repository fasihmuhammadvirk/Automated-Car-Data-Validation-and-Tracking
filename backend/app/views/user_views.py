from fastapi import APIRouter, Depends,status,UploadFile, File, HTTPException
from controllers import user_controller, car_details_controller, user_report_controller, user_notification_controller
from typing import List
from models.user_model import SignupInfo, LoginInfo, Notification, Car_Record, Report
from pydantic import BaseModel

router = APIRouter()

@router.get('/', status_code=status.HTTP_200_OK, tags=['Greetings'])
def greet():
    return user_controller.greet()

@router.post('/signup', status_code=status.HTTP_201_CREATED, tags=['User Signup - Login'])
def signup(user: SignupInfo):
    return user_controller.create_user(user.dict())

@router.post('/login', status_code=status.HTTP_200_OK, tags=['User Signup - Login'])
def login(user: LoginInfo):
    # Only 'cnic' and 'password' are required for login
    return user_controller.login_user(user.dict())

@router.post('/cardetailtext', status_code=status.HTTP_200_OK, tags=['Car Detail'])
def car_txt_detail(car_record: Car_Record):
    return car_details_controller.get_car_detail_text(car_record.dict())


@router.post("/cardetailimage/", status_code=status.HTTP_200_OK, tags=['Car Detail'])
async def car_img_detail(image: UploadFile = File(...)):
    response = car_details_controller.get_car_detail_image(image)
    return response


@router.post('/reportstolen', status_code=status.HTTP_200_OK, tags=['Car Report'])
def report_car(report: Report ):
    return user_report_controller.report_stolen_car(report.dict())


@router.post('/checkstatus', status_code=status.HTTP_200_OK, tags=['Car Report'])
def check_car_status(report: Report):
    return user_report_controller.car_status(report.dict())


@router.post('/reportrecovered', status_code=status.HTTP_200_OK, tags=['Car Report'])
def recover_car(car_record: Car_Record):
    return user_report_controller.recovered_stolen_car(car_record.dict())

@router.post("/notifications", status_code=status.HTTP_200_OK, tags=['User Notifications'])
def read_notifications(noticfation:Notification):
    return user_notification_controller.get_user_notifications(noticfation.dict())
