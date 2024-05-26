from database.connection import Session
from database.models import Admin_Info as Admin 
from database.models import Record as Car_Record
from middleware.utils import get_hashed_password, verify_password, create_access_token
from fastapi import HTTPException, status

db = Session()


def create_author(Admin_info: dict):
    db_Admin = db.query(Admin).filter(Admin.official_id == Admin_info['official_id']).first()
    if db_Admin:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Admin Already Exist")

    hashed_password = get_hashed_password(Admin_info['password'])
    jwt_access = create_access_token(Admin_info['official_id'])
    new_Admin = Admin( official_id = Admin_info['official_id'], hash_password=hashed_password)
    db.add(new_Admin)
    db.commit()
    return {'authortoken': jwt_access}

def login_author(Admin_info: dict):
    db_Admin = db.query(Admin).filter(Admin.official_id == Admin_info['official_id']).first()
    if not db_Admin:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Admin Does Not Exist")

    password_verify = verify_password(Admin_info['password'], db_Admin.hash_password)
    if not password_verify:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect Password")

    jwt_access = create_access_token(Admin_info['official_id'])
    db.commit()
    return {'authortoken': jwt_access}
