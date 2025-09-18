from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.course import Course
from app.models.batch import Batch
from app.models.student import Student
from app.models.faculty import Faculty
from app.models.subject import Subject
from app.schemas.course import CourseCreate, CourseUpdate, CourseOut

router = APIRouter()


@router.post("/", response_model=CourseOut)
def create_course(course: CourseCreate, db: Session = Depends(get_db)):
    db_course = Course(
        course_name=course.course_name,
        course_desc=course.course_desc,
        course_img=course.course_img,
        is_active=course.is_active,
        is_public=course.is_public,
    )

    # mappings
    if course.batch_ids:
        db_course.batches = db.query(Batch).filter(
            Batch.id.in_(course.batch_ids)).all()
    if course.student_ids:
        db_course.students = db.query(Student).filter(
            Student.id.in_(course.student_ids)).all()
    if course.faculty_ids:
        db_course.faculties = db.query(Faculty).filter(
            Faculty.id.in_(course.faculty_ids)).all()
    if course.subject_ids:
        db_course.subjects = db.query(Subject).filter(
            Subject.id.in_(course.subject_ids)).all()

    db.add(db_course)
    db.commit()
    db.refresh(db_course)

    return CourseOut(
        id=db_course.id,
        course_name=db_course.course_name,
        course_desc=db_course.course_desc,
        course_img=db_course.course_img,
        is_active=db_course.is_active,
        is_public=db_course.is_public,
        created_at=db_course.created_at,
        batch_ids=[b.id for b in db_course.batches],
        student_ids=[s.id for s in db_course.students],
        faculty_ids=[f.id for f in db_course.faculties],
        subject_ids=[s.id for s in db_course.subjects],
    )


@router.get("/", response_model=List[CourseOut])
def get_courses(db: Session = Depends(get_db)):
    courses = db.query(Course).all()
    return [
        CourseOut(
            id=c.id,
            course_name=c.course_name,
            course_desc=c.course_desc,
            course_img=c.course_img,
            is_active=c.is_active,
            is_public=c.is_public,
            created_at=c.created_at,
            batch_ids=[b.id for b in c.batches],
            student_ids=[s.id for s in c.students],
            faculty_ids=[f.id for f in c.faculties],
            subject_ids=[s.id for s in c.subjects],
        )
        for c in courses
    ]


@router.get("/{course_id}", response_model=CourseOut)
def get_course(course_id: int, db: Session = Depends(get_db)):
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return CourseOut(
        id=course.id,
        course_name=course.course_name,
        course_desc=course.course_desc,
        course_img=course.course_img,
        is_active=course.is_active,
        is_public=course.is_public,
        created_at=course.created_at,
        batch_ids=[b.id for b in course.batches],
        student_ids=[s.id for s in course.students],
        faculty_ids=[f.id for f in course.faculties],
        subject_ids=[s.id for s in course.subjects],
    )


@router.put("/{course_id}", response_model=CourseOut)
def update_course(course_id: int, update: CourseUpdate, db: Session = Depends(get_db)):
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    course.course_name = update.course_name
    course.course_desc = update.course_desc
    course.course_img = update.course_img
    course.is_active = update.is_active
    course.is_public = update.is_public

    if update.batch_ids is not None:
        course.batches = db.query(Batch).filter(
            Batch.id.in_(update.batch_ids)).all()
    if update.student_ids is not None:
        course.students = db.query(Student).filter(
            Student.id.in_(update.student_ids)).all()
    if update.faculty_ids is not None:
        course.faculties = db.query(Faculty).filter(
            Faculty.id.in_(update.faculty_ids)).all()
    if update.subject_ids is not None:
        course.subjects = db.query(Subject).filter(
            Subject.id.in_(update.subject_ids)).all()

    db.commit()
    db.refresh(course)

    return CourseOut(
        id=course.id,
        course_name=course.course_name,
        course_desc=course.course_desc,
        course_img=course.course_img,
        is_active=course.is_active,
        is_public=course.is_public,
        created_at=course.created_at,
        batch_ids=[b.id for b in course.batches],
        student_ids=[s.id for s in course.students],
        faculty_ids=[f.id for f in course.faculties],
        subject_ids=[s.id for s in course.subjects],
    )


@router.delete("/{course_id}")
def delete_course(course_id: int, db: Session = Depends(get_db)):
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    db.delete(course)
    db.commit()
    return {"message": "Course deleted successfully"}
