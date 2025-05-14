from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import SessionLocal, Base, engine
from routes import auth, task
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

app.include_router(auth.router)
app.include_router(task.router)

@app.get("/")
async def root():
    return {"message": "Welcome to the Task Manager API"}

@app.get("/test-db")
async def test_db(db: Session = Depends(get_db)):
    return {"message": "Database connection successful"}