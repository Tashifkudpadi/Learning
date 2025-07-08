from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.subject import Subject
from schemas.subject import SubjectCreate, SubjectUpdate, SubjectOut
from typing import List

router = APIRouter()

@router.post("/", response_model=SubjectOut)
def create_subject(subject: SubjectCreate, db: Session = Depends(get_db)):
    db_subject = Subject(**subject.dict())
    db.add(db_subject)
    db.commit()
    db.refresh(db_subject)
    return db_subject

@router.get("/", response_model=List[SubjectOut])
def get_subjects(db: Session = Depends(get_db)):
    return db.query(Subject).all()

@router.put("/{subject_id}", response_model=SubjectOut)
def update_subject(subject_id: int, update: SubjectUpdate, db: Session = Depends(get_db)):
    subject = db.query(Subject).filter(Subject.id == subject_id).first()
    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")
    subject.name = update.name
    db.commit()
    db.refresh(subject)
    return subject

@router.delete("/{subject_id}")
def delete_subject(subject_id: int, db: Session = Depends(get_db)):
    subject = db.query(Subject).filter(Subject.id == subject_id).first()
    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")
    db.delete(subject)
    db.commit()
    return {"message": "Subject deleted successfully"}
