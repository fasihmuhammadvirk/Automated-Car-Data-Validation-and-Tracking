from pydantic import BaseModel

class LoginInfo(BaseModel):
    id: str
    password: str