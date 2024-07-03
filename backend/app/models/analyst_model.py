from pydantic import BaseModel

class User(BaseModel):
    official_id:str
    hash_password: str
    
class SignupInfo(BaseModel):
    name: str
    official_id: str
    location : str
    contact : str
    password: str

class LoginInfo(BaseModel):
    official_id: str
    password: str
    
class CheckFeed(BaseModel):
    value : int

class Notification(BaseModel):
    token : str
    
class AnalystNotification(BaseModel):
    token : str
    number_plate : str