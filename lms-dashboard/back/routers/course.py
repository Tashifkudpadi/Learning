from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from models.user import User, Role
from models.course import Course
from schemas.course import CourseCreate, Course
from database import get_db
from utils.auth import get_current_user

router = APIRouter(tags=["courses"])

@router.post("/courses", response_model=Course)
async def create_course(
    course: CourseCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role not in [Role.ADMIN, Role.FACULTY]:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized")
    
    db_course = Course(
        title=course.title,
        description=course.description,
        instructor_id=current_user.id
    )
    db.add(db_course)
    db.commit()
    db.refresh(db_course)
    return db_course

@router.get("/courses", response_model=list[Course])
async def list_courses(db: Session = Depends(get_db)):
    return db.query(Course).all()