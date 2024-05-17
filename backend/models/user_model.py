from pydantic import BaseModel

class User(BaseModel):
    name:str
    cnic: str
    hash_password: str
    jwt_token: str = None
