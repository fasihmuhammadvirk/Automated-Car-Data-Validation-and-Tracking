from database.connection import Session
from backend.models import user_model as model
from backend.middleware.utils import decode_access_token
from fastapi import status, HTTPException, Header


db = Session()

#helper function to authnticate the user and jwt token
def authenticate(jwt_token:str = Header(...),user_email:str = Header(...)):
    
    #checking if the user that user exits or not
    is_user_exists = db.query(model.User_Info).filter(model.User_Info.email == user_email).first()
    
    if is_user_exists is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail='User Does not Exits, Signup First')
    
    #checking it the token given is correct according to the user or not 
    is_user  = decode_access_token(jwt_token,user_email)
    
    if is_user == False :
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail='Invalid Token')
    
    return is_user