from sqlalchemy import create_engine
from sqlalchemy.orm import  sessionmaker


database_url = 'postgresql://postgres:1213@localhost:5433/ANPR'
#creating the engine first argument is the database url or connection string
engine = create_engine(database_url,echo = True)
Session = sessionmaker(bind=engine)