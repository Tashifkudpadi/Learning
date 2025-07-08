from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, users, students, subjects, batches, faculty
from database import Base, engine
from models.user import User, Role
from models.student import Student
from models.batch import Batch
from models.faculty import Faculty
from models.subject import Subject

app = FastAPI(title="EduPlatform LMS API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create database tables
Base.metadata.create_all(bind=engine)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(students.router, prefix="/students", tags=["students"])
app.include_router(batches.router, prefix="/batches", tags=["batches"])
app.include_router(faculty.router, prefix="/faculty", tags=["faculty"])
app.include_router(subjects.router, prefix="/subjects", tags=["subjects"])

@app.get("/")
async def root():
    return {"message": "EduPlatform LMS API"}