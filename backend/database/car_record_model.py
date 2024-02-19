from sqlalchemy import create_engine, Column, Integer, String, Date, Boolean, inspect
from sqlalchemy.orm import declarative_base
from connection import engine
Base = declarative_base() #this will be inherited by our schema

class Record(Base):
    
    __tablename__ = 'car_record'

    id = Column(Integer, primary_key=True)
    
    # Owner details
    owner_name = Column(String, nullable=False)
    owner_father_name = Column(String, nullable=False)
    owner_city = Column(String, nullable=False)
    owner_cnic = Column(String, unique=False, nullable=False)
    owner_tax_paid = Column(Boolean, default=False)

    # Vehicle information
    number_plate = Column(String, unique=True, nullable=False)
    engine_number = Column(String, unique=True, nullable=False)
    make_name = Column(String, nullable=False)
    register_date = Column(Date, nullable=False)
    year_of_manufacture = Column(Integer, nullable=False)
    vehicle_price = Column(Integer, nullable=False)
    color = Column(String, nullable=False)
    token = Column(String, unique=True, nullable=False)
    is_stolen = Column(Boolean, default=False)
    
    
# Check if the table already exists
inspector = inspect(engine)
if 'car_record' not in inspector.get_table_names():
    # Create the table only if it doesn't exist
    Base.metadata.create_all(engine)
    print("Table 'car_record' created.")
else:
    print("Table 'car_record' already exists.")