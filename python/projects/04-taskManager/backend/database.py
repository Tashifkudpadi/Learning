from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker 
from sqlalchemy.ext.declarative import declarative_base

# Replace with your PostgreSQL credentials
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:Theta$999@localhost:5432/task_manager"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()