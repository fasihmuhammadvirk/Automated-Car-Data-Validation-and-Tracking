from sqlalchemy import create_engine, Column, Integer, String, Date, Boolean, inspect
from sqlalchemy.orm import declarative_base
from sqlalchemy import Column,String,Integer,DateTime,Boolean,UniqueConstraint
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
    
    def __repr__(self):
        return f"<Record Id { self.id } Record Cnic {self.owner_cnic}>"

# orm of user_info table
class User_Info(Base):
    
    __tablename__ = "user_info"
    
    id = Column(Integer(),primary_key=True) 
    name = Column(String(100),nullable = False)
    cnic = Column(String(100),nullable = False,unique = True) 
    hash_password = Column(String(400),nullable=False) 
    
    def to_dict(self):
        
        return {
            'cnic': self.id,
            'hash_password': self.name,
            'jwt_token': self.price,
        }
    
    def __repr__(self):
        return f"<User Id { self.id } User Cnic {self.cnic}>"


class Admin_Info(Base):
    
    __tablename__ = "admin_info"
    
    id = Column(Integer(),primary_key=True) 
    official_id = Column(String(100),nullable = False)
    hash_password = Column(String(400),nullable=False) 
    
    
    def to_dict(self):
        
        return {
            'official_id': self.official_id,
            'hash_password': self.hash_password}