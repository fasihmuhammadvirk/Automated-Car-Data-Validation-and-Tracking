import json
from database.connection import Session
from database.models import User_Info as User
from fastapi import HTTPException, status, UploadFile
from typing import Optional
from middleware.utils import decode_access_token

db = Session()
def get_user_notifications(notification: dict):
    user_info = decode_access_token(notification['token'])
    user = db.query( User).filter( User.cnic == user_info['cnic']).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    notifications = user.notifications.split('\n') if user.notifications else []
    notifications.reverse()
    return {'notifications': notifications}