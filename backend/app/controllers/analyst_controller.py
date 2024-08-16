from database.connection import Session
from database.models import Admin_Info as Admin 
from database.models import User_Info as User
from database.models import Record as Car_Record
from middleware.utils import get_hashed_password, verify_password, create_access_token,decode_access_token
from fastapi import HTTPException, status
import json
from datetime import datetime

db = Session()


def create_analyst(Admin_info: dict):
    db_Admin = db.query(Admin).filter(Admin.official_id == Admin_info['official_id']).first()
    if db_Admin:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Admin Already Exist")

    hashed_password = get_hashed_password(Admin_info['password'])
    new_Admin = Admin( official_id = Admin_info['official_id'], hash_password=hashed_password, name = Admin_info['name'], location = Admin_info['location'], contact = Admin_info['contact'])
    db.add(new_Admin)
    db.commit()
    return {'success': True}

def login_analyst(Admin_info: dict):
    db_Admin = db.query(Admin).filter(Admin.official_id == Admin_info['official_id']).first()
    if not db_Admin:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Admin Does Not Exist")

    password_verify = verify_password(Admin_info['password'], db_Admin.hash_password)
    if not password_verify:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect Password")

    jwt_access = create_access_token(Admin_info['official_id'])
    db.commit()
    return {'analysttoken': jwt_access}


def get_analyst_notifications(notification: dict):
    admin_info = decode_access_token(notification['token'])
    user = db.query(Admin).filter( Admin.official_id == admin_info['official_id']).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    notifications = user.notifications.split('\n') if user.notifications else ["No Notifications"]
    notifications.reverse()
    return {'notifications': notifications}
    

def send_notification(state: dict):
    admin_info = decode_access_token(state['token'])
    number_plate = state['number_plate']
    
    admin = db.query(Admin).filter( Admin.official_id ==     admin_info['official_id']).first()
    if not admin:
        raise HTTPException(status_code=404, detail="User not found")
    

    
    db_car = db.query(Car_Record).filter(Car_Record.number_plate == number_plate).first()
    if not db_car:
        # raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No Car Detail to Fetch")
        return None
    
    user = db.query(User).filter(User.cnic == db_car.owner_cnic).first()
    

    if db_car.is_stolen:
        admin_notification_message = f"{admin.name} a Stolen Car {db_car.number_plate} is Passed at {datetime.now()} from {admin.location}"
    else:
        admin_notification_message = f"{admin.name} a Stolen Car {db_car.number_plate} is Passed at {datetime.now()} from {admin.location}"

    if admin.notifications:
        admin.notifications += f"\n{admin_notification_message}"
    else:
        admin.notifications = admin_notification_message

    
    if db_car.is_stolen:
        user_notification_message = f"Your Car {db_car.number_plate} Stolen is Passed at {datetime.now()} from {admin.location}: Call {admin.contact} for more details"
    else:
        user_notification_message = f"Your Car {db_car.number_plate} is Passed at {datetime.now()} from {admin.location}: Call {admin.contact} for more details" 
    
    if user.notifications:
        user.notifications += f"\n{user_notification_message}"
    else:
        user.notifications = user_notification_message

    db.commit()
    return True

def report_recoverd_stolen_car(state: dict):
    admin_info = decode_access_token(state['token'])
    number_plate = state['number_plate']
        
    admin = db.query(Admin).filter( Admin.official_id ==     admin_info['official_id']).first()
    if not admin:
        raise HTTPException(status_code=404, detail="User not found")
    
    db_car = db.query(Car_Record).filter(Car_Record.number_plate == number_plate).first()
    if not db_car:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No Car Detail to Fetch")
    user = db.query(User).filter(User.cnic == db_car.owner_cnic).first()
    notification_message = f"Your Stolen Car {db_car.number_plate} is Recovered at {datetime.now()} on {admin.location} by {admin.name}: Call {admin.contact}"
    if user.notifications:
        user.notifications += f"\n{notification_message}"
    else:
        user.notifications = notification_message
        
    admin_notification_message = f"{admin.name} a Stolen Car {db_car.number_plate} is Retrieved at {datetime.now()} from {admin.location}"
    if admin.notifications:
        admin.notifications += f"\n{admin_notification_message}"
    else:
        admin.notifications = admin_notification_message

    db_car.is_stolen = False
    db.commit()
    return True