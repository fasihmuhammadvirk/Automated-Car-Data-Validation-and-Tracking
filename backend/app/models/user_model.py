from pydantic import BaseModel

class User(BaseModel):
    name:str
    cnic: str
    hash_password: str
    jwt_token: str = None

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
    
class Report(BaseModel):
    token : str

class Notification(BaseModel):
    token : str
