from sqlalchemy import create_engine, Column, Integer, String, Date, Boolean
from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy import inspect

database_url = 'postgresql://postgres:1213@localhost:5432/ANPR'
#creating the engine first argument is the database url or connection string
engine = create_engine(database_url,echo = True)
 
Session = sessionmaker()