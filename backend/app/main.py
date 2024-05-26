from fastapi import FastAPI
from views import user_views , admin_views
from database.connection import engine
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(user_views.router)
app.include_router(admin_views.router)




# # Create tables in the database
# from models import Base
# Base.metadata.create_all(bind=engine)
