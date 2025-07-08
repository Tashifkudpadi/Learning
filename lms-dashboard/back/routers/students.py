from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.student import Student
from models.batch import Batch
from models.batch_student import batch_students
from database import get_db
from schemas.student import StudentCreate, StudentUpdate, StudentOut
from typing import List

router = APIRouter()

@router.post("/", response_model=StudentOut)
def create_student(student: StudentCreate, db: Session = Depends(get_db)):
    db_student = Student(
        first_name=student.first_name,
        last_name=student.last_name,
        email=student.email,
        enrollment_date=student.enrollment_date
    )
    db.add(db_student)
    db.commit()
    db.refresh(db_student)

    if student.batch_ids:
        for batch_id in student.batch_ids:
            batch = db.query(Batch).filter(Batch.id == batch_id).first()
            if batch:
                db_student.batches.append(batch)
        db.commit()
    
    return StudentOut(
        id=db_student.id,
        first_name=db_student.first_name,
        last_name=db_student.last_name,
        email=db_student.email,
        enrollment_date=db_student.enrollment_date,
        batches=[b.name for b in db_student.batches]
    )

@router.get("/", response_model=List[StudentOut])
def get_students(db: Session = Depends(get_db)):
    students = db.query(Student).all()
    return [
        StudentOut(
            id=s.id,
            first_name=s.first_name,
            last_name=s.last_name,
            email=s.email,
            enrollment_date=s.enrollment_date,
            batches=[b.name for b in s.batches]
        ) for s in students
    ]

@router.get("/{student_id}", response_model=StudentOut)
def get_student(student_id: int, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return StudentOut(
        id=student.id,
        first_name=student.first_name,
        last_name=student.last_name,
        email=student.email,
        enrollment_date=student.enrollment_date,
        batches=[b.name for b in student.batches]
    )

@router.put("/{student_id}", response_model=StudentOut)
def update_student(student_id: int, update: StudentUpdate, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    student.first_name = update.first_name
    student.last_name = update.last_name
    student.email = update.email
    student.enrollment_date = update.enrollment_date

    student.batches.clear()
    if update.batch_ids:
        for batch_id in update.batch_ids:
            batch = db.query(Batch).filter(Batch.id == batch_id).first()
            if batch:
                student.batches.append(batch)

    db.commit()
    db.refresh(student)
    return StudentOut(
        id=student.id,
        first_name=student.first_name,
        last_name=student.last_name,
        email=student.email,
        enrollment_date=student.enrollment_date,
        batches=[b.name for b in student.batches]
    )

@router.delete("/{student_id}")
def delete_student(student_id: int, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    db.delete(student)
    db.commit()
    return {"message": "Student deleted successfully"}
