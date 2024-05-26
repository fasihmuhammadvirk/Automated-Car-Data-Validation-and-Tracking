from pydantic import BaseModel

class User(BaseModel):
    official_id:str
    hash_password: str
    
