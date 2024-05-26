from database.connection import Session
from database.models import User_Info as User 
from database.models import Record as Car_Record
from middleware.utils import get_hashed_password, verify_password, create_access_token, decode_access_token
from fastapi import HTTPException, status

db = Session()

def greet():
    return {'message': 'write /docs in url to test apis'}


def create_user(user_info: dict):
    db_user = db.query(User).filter(User.cnic == user_info['cnic']).first()
    if db_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User Does Not Exist")

    
    db_car_record = db.query(Car_Record).filter(Car_Record.number_plate == user_info['number_plate'] and  Car_Record.owner_cnic == user_info['cnic']).first()
    if not db_car_record:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User Does Not Exist")

    hashed_password = get_hashed_password(user_info['password'])
    jwt_access = create_access_token([user_info['cnic'],user_info['number_plate']])
    new_user = User(name = user_info['name'], cnic=user_info['cnic'], hash_password=hashed_password)
    db.add(new_user)
    db.commit()
    return {'usertoken': jwt_access}

def login_user(user_info: dict):
    db_user = db.query(User).filter(User.cnic == user_info['cnic']).first()
    if not db_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User Does Not Exist")
    db_car = db.query(Car_Record).filter(Car_Record.owner_cnic == user_info['cnic']).first()
    password_verify = verify_password(user_info['password'], db_user.hash_password)
    if not password_verify:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect Password")

    jwt_access = create_access_token([user_info['cnic'],db_car.number_plate])
    db.commit()
    return {'usertoken': jwt_access}

