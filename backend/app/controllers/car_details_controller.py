from database.connection import Session
from database.models import Record as Car_Record
from fastapi import HTTPException, status, UploadFile
from objectdetection import PredictionV as p
from typing import Optional
import shutil
import tempfile
import os

db = Session()


def get_car_detail_text(Car_Info: dict):
    db_car = db.query(Car_Record).filter(Car_Record.number_plate == Car_Info['number_plate']).first()
    if not db_car:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No Car Detail to Fetch")

    return db_car

# def get_car_detail_image(image: UploadFile):
#     text = p.get_number_plate(image.filename)
#     db_car = db.query(Car_Record).filter(Car_Record.number_plate == text).first()
#     if not db_car:
#         raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No Car Detail to Fetch")

#     return db_car    
def get_car_detail_image(image: UploadFile):
    # Create a temporary file and copy the uploaded file content to it
    with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(image.filename)[1]) as temp_file:
        shutil.copyfileobj(image.file, temp_file)
        temp_file_path = temp_file.name
    
    try:
        # Use the temporary file path in your existing logic
        text = p.get_number_plate(temp_file_path)
        db_car = db.query(Car_Record).filter(Car_Record.number_plate == text).first()
        if not db_car:
            # return text
            raise HTTPException(status_code=400, detail="No Car Detail to Fetch")
        
        return db_car
    finally:
        # Delete the temporary file
        os.unlink(temp_file_path)
        