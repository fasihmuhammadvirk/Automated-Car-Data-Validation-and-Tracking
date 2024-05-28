from pydantic import BaseModel

class User(BaseModel):
    official_id:str
    hash_password: str
    
class SignupInfo(BaseModel):
    official_id: str
    password: str

class LoginInfo(BaseModel):
    official_id: str
    password: str
    
class CheckFeed(BaseModel):
    value : int