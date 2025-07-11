from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from models.user import User, Role
from models.student import Student
from models.faculty import Faculty
from database import get_db
from pydantic import BaseModel

router = APIRouter(tags=["users"])

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    role: str
    last_active: Optional[str]

    class Config:
        from_attributes = True

class UserUpdate(BaseModel):
    first_name: Optional[str]
    last_name: Optional[str]
    email: Optional[str]
    role: Optional[str]

@router.get("/", response_model=List[UserResponse])
async def get_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return [
        UserResponse(
            id=user.id,
            name=f"{user.first_name} {user.last_name}",
            email=user.email,
            role=user.role.value,
            last_active=user.last_active.isoformat() if user.last_active else None
        )
        for user in users
    ]

@router.delete("/{user_id}", response_model=dict)
async def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    if user.role == Role.STUDENT:
        student = db.query(Student).filter(Student.user_id == user_id).first()
        if student:
            db.delete(student)
    elif user.role == Role.FACULTY:
        faculty = db.query(Faculty).filter(Faculty.user_id == user_id).first()
        if faculty:
            db.delete(faculty)
    
    db.delete(user)
    db.commit()
    return {"message": f"User {user_id} deleted successfully"}

@router.put("/{user_id}", response_model=UserResponse)
async def update_user(user_id: int, user_update: UserUpdate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    if user_update.first_name:
        user.first_name = user_update.first_name
    if user_update.last_name:
        user.last_name = user_update.last_name
    if user_update.email:
        existing_user = db.query(User).filter(User.email == user_update.email, User.id != user_id).first()
        if existing_user:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already in use")
        user.email = user_update.email
    if user_update.role:
        if user_update.role not in [role.value for role in Role]:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid role")
        if user_update.role != user.role.value:
            if user_update.role == "student":
                if not db.query(Student).filter(Student.user_id == user_id).first():
                    batch = db.query(Batch).first()
                    if not batch:
                        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No batches available")
                    db.add(Student(user_id=user_id, batch_id=batch.id))
            elif user_update.role == "faculty":
                if not db.query(Faculty).filter(Faculty.user_id == user_id).first():
                    db.add(Faculty(user_id=user_id))
            if user.role == Role.STUDENT:
                student = db.query(Student).filter(Student.user_id == user_id).first()
                if student:
                    db.delete(student)
            elif user.role == Role.FACULTY:
                faculty = db.query(Faculty).filter(Faculty.user_id == user_id).first()
                if faculty:
                    db.delete(faculty)
        user.role = Role(user_update.role)
    
    db.commit()
    db.refresh(user)
    return UserResponse(
        id=user.id,
        name=f"{user.first_name} {user.last_name}",
        email=user.email,
        role=user.role.value,
        last_active=user.last_active.isoformat() if user.last_active else None
    )