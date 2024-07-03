import hashlib
import os            
import base64
from datetime import datetime, timedelta
from typing import Union, Any
import json 

ALGORITHM = "HS256"
JWT_SECRET_KEY = str(os.environ.get('JWT_SECRET_KEY'))  # should be kept secret

class CryptContext:
    def hash(self, password: str) -> str:
        return hashlib.sha256(password.encode()).hexdigest()

    def verify(self, password: str, hashed_pass: str) -> bool:
        return hashed_pass == self.hash(password)

password_context = CryptContext()

def get_hashed_password(password: str) -> str:
    return password_context.hash(password)

def verify_password(password: str, hashed_pass: str) -> bool:
    return password_context.verify(password, hashed_pass)

def create_access_token_user(subject: Union[str, Any]) -> str:
    
    to_encode = {"cnic": str(subject[0]),"number_plate": str(subject[1])}
    encoded_jwt = jwt_encode(to_encode, JWT_SECRET_KEY, ALGORITHM)
    return encoded_jwt

def create_access_token(subject: Union[str, Any]) -> str:
    to_encode = {"official_id": str(subject)}
    encoded_jwt = jwt_encode(to_encode, JWT_SECRET_KEY, ALGORITHM)
    return encoded_jwt

def jwt_encode(payload: dict, secret_key: str, algorithm: str) -> str:
    encoded_payload = json.dumps(payload).encode()
    encoded_jwt = base64.urlsafe_b64encode(encoded_payload).decode()
    signature = hashlib.sha256((encoded_jwt + secret_key).encode()).hexdigest()
    return f"{encoded_jwt}.{signature}"


def decode_access_token(token: str):
    # is_user = False

    # try:
    # Decode the JWT token
    encoded_jwt, signature = token.split('.')
    decoded_payload = base64.urlsafe_b64decode(encoded_jwt + "==").decode()
    user_id = decoded_payload 
    # # No expiration time check needed
    # if user_name == user_id:
    #     is_user = True
    user_id = json.loads(user_id)
    # except Exception as e:
    #     # Handle exceptions``
    #     print(f"Error decoding token: {e}")
    #     is_user = False

    return user_id
