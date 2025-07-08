from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.faculty import Faculty
from models.subject import Subject
from database import get_db
from schemas.faculty import FacultyCreate, FacultyUpdate, FacultyOut
from typing import List

router = APIRouter()

@router.post("/", response_model=FacultyOut)
def create_faculty(faculty: FacultyCreate, db: Session = Depends(get_db)):
    db_faculty = Faculty(**faculty.dict())
    db.add(db_faculty)
    db.commit()
    db.refresh(db_faculty)

    subject_name = db.query(Subject.name).filter(Subject.id == db_faculty.subject_id).scalar()
    return FacultyOut(**faculty.dict(), id=db_faculty.id, subject_name=subject_name)

@router.get("/", response_model=List[FacultyOut])
def get_all(db: Session = Depends(get_db)):
    faculties = db.query(Faculty).all()
    return [
        FacultyOut(
            id=f.id,
            first_name=f.first_name,
            last_name=f.last_name,
            email=f.email,
            subject_id=f.subject_id,
            subject_name=f.subject.name if f.subject else None
        )
        for f in faculties
    ]

@router.put("/{faculty_id}", response_model=FacultyOut)
def update(faculty_id: int, update: FacultyUpdate, db: Session = Depends(get_db)):
    faculty = db.query(Faculty).filter(Faculty.id == faculty_id).first()
    if not faculty:
        raise HTTPException(status_code=404, detail="Faculty not found")
    
    for key, value in update.dict().items():
        setattr(faculty, key, value)
    
    db.commit()
    db.refresh(faculty)
    return FacultyOut(
        id=faculty.id,
        first_name=faculty.first_name,
        last_name=faculty.last_name,
        email=faculty.email,
        subject_id=faculty.subject_id,
        subject_name=faculty.subject.name if faculty.subject else None
    )

@router.delete("/{faculty_id}")
def delete(faculty_id: int, db: Session = Depends(get_db)):
    faculty = db.query(Faculty).filter(Faculty.id == faculty_id).first()
    if not faculty:
        raise HTTPException(status_code=404, detail="Faculty not found")
    db.delete(faculty)
    db.commit()
    return {"message": "Faculty deleted successfully"}
