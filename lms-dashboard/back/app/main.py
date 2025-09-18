from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, users, students, faculties, subjects, topics, batches, courses, course_content, tests
from app.database import Base, engine
from fastapi.staticfiles import StaticFiles


app = FastAPI(title="EduPlatform LMS API")

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
# app.mount("/uploads", StaticFiles(directory=settings.UPLOAD_DIR), name="uploads")


# load_dotenv()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create database tables
# Base.metadata.create_all(bind=engine)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(students.router, prefix="/students", tags=["students"])
app.include_router(faculties.router, prefix="/faculties", tags=["faculties"])
app.include_router(subjects.router, prefix="/subjects",
                   tags=["subjects"])
app.include_router(topics.router, prefix="/topics", tags=["topics"])
app.include_router(batches.router, prefix="/batches", tags=["batches"])
app.include_router(courses.router, prefix="/courses", tags=["Courses"])
app.include_router(course_content.router,
                   prefix="/course-contents", tags=["CourseContents"])
app.include_router(tests.router, prefix="/tests", tags=["Tests"])


@app.get("/")
async def root():
    return {"message": "EduPlatform LMS API"}
