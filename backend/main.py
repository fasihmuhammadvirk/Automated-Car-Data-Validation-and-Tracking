from fastapi import FastAPI
from views import user_views
from database.connection import engine

app = FastAPI()

# Include routers
app.include_router(user_views.router)





# # Create tables in the database
# from models import Base
# Base.metadata.create_all(bind=engine)
