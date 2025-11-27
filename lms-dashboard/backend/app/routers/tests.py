from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.test import Test
from app.models.student import Student
from app.models.faculty import Faculty
from app.schemas.test import TestCreate, TestUpdate, TestOut

router = APIRouter()


@router.post("/", response_model=TestOut)
def create_test(test: TestCreate, db: Session = Depends(get_db)):
    db_test = Test(test_name=test.test_name)

    if test.student_ids:
        db_test.students = db.query(Student).filter(
            Student.id.in_(test.student_ids)).all()
    if test.faculty_ids:
        db_test.faculties = db.query(Faculty).filter(
            Faculty.id.in_(test.faculty_ids)).all()

    db.add(db_test)
    db.commit()
    db.refresh(db_test)

    return TestOut(
        id=db_test.id,
        test_name=db_test.test_name,
        student_ids=[s.id for s in db_test.students],
        faculty_ids=[f.id for f in db_test.faculties],
    )


@router.get("/", response_model=List[TestOut])
def get_tests(db: Session = Depends(get_db)):
    tests = db.query(Test).all()
    return [
        TestOut(
            id=t.id,
            test_name=t.test_name,
            student_ids=[s.id for s in t.students],
            faculty_ids=[f.id for f in t.faculties],
        )
        for t in tests
    ]


@router.get("/{test_id}", response_model=TestOut)
def get_test(test_id: int, db: Session = Depends(get_db)):
    test = db.query(Test).filter(Test.id == test_id).first()
    if not test:
        raise HTTPException(status_code=404, detail="Test not found")
    return TestOut(
        id=test.id,
        test_name=test.test_name,
        student_ids=[s.id for s in test.students],
        faculty_ids=[f.id for f in test.faculties],
    )


@router.put("/{test_id}", response_model=TestOut)
def update_test(test_id: int, update: TestUpdate, db: Session = Depends(get_db)):
    test = db.query(Test).filter(Test.id == test_id).first()
    if not test:
        raise HTTPException(status_code=404, detail="Test not found")

    test.test_name = update.test_name
    if update.student_ids is not None:
        test.students = db.query(Student).filter(
            Student.id.in_(update.student_ids)).all()
    if update.faculty_ids is not None:
        test.faculties = db.query(Faculty).filter(
            Faculty.id.in_(update.faculty_ids)).all()

    db.commit()
    db.refresh(test)

    return TestOut(
        id=test.id,
        test_name=test.test_name,
        student_ids=[s.id for s in test.students],
        faculty_ids=[f.id for f in test.faculties],
    )


@router.delete("/{test_id}")
def delete_test(test_id: int, db: Session = Depends(get_db)):
    test = db.query(Test).filter(Test.id == test_id).first()
    if not test:
        raise HTTPException(status_code=404, detail="Test not found")
    db.delete(test)
    db.commit()
    return {"message": "Test deleted successfully"}
