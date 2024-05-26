from database.connection import Session
from database.models import Record as Car_Record
from database.models import User_Info as User
from fastapi import HTTPException, status, UploadFile
from typing import Optional
from middleware.utils import decode_access_token
from datetime import datetime

db = Session()


# def report_stolen_car(report : dict):
#     data = decode_access_token(report['token'])
#     db_car = db.query(Car_Record).filter(Car_Record.number_plate == data['number_plate']).first()
#     user = db.query(User).filter(User.cnic == db_car.owner_cnic).first()
#     if not db_car:
#         raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No Car Detail to Fetch")
#     if user.notifications:
#         message = f"Your Car {db_car.number_plate} is Reported Stolen at {datetime.now()}"
#         user.notifications.append(message)
#     else:
#         user.notifications = [f"Your Car {db_car.number_plate} is Reported Stolen at {datetime.now()}"]
#     db_car.is_stolen = True
#     db.commit()
    
#     return True

def car_status(report : dict):
    data = decode_access_token(report['token'])
    db_car = db.query(Car_Record).filter(Car_Record.number_plate == data['number_plate'] and Car_Record.owner_cnic == data['cnic']).first()
    if not db_car:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No Car Detail to Fetch")

    return db_car


def report_stolen_car(report: dict):
    data = decode_access_token(report['token'])
    db_car = db.query(Car_Record).filter(Car_Record.number_plate == data['number_plate']).first()
    if not db_car:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No Car Detail to Fetch")
    user = db.query(User).filter(User.cnic == db_car.owner_cnic).first()
    notification_message = f"Your Car {db_car.number_plate} is Reported Stolen at {datetime.now()}"
    if user.notifications:
        user.notifications += f"\n{notification_message}"
    else:
        user.notifications = notification_message
    db_car.is_stolen = True
    db.commit()
    return True

def recovered_stolen_car(car_record: dict):
    db_car = db.query(Car_Record).filter(Car_Record.number_plate == car_record['number_plate']).first()
    if not db_car:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No Car Detail to Fetch")
    user = db.query(User).filter(User.cnic == db_car.owner_cnic).first()
    notification_message = f"Your Stolen Car {db_car.number_plate} is Recovered at {datetime.now()}"
    if user.notifications:
        user.notifications += f"\n{notification_message}"
    else:
        user.notifications = notification_message
    db_car.is_stolen = False
    db.commit()
    return True