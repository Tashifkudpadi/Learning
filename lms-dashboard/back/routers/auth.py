from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from models.user import User, Role
from schemas.user import UserCreate, Token
from utils.auth import get_password_hash, verify_password, create_access_token
from database import get_db
from pydantic import BaseModel, EmailStr
from datetime import datetime


router = APIRouter()

class LoginRequest(BaseModel):
    email: EmailStr
    password: str
    role: Role

@router.post("/register", response_model=Token)
async def register(user: UserCreate, db: Session = Depends(get_db)):
    if user.password != user.confirm_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")
    
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_password_hash(user.password)
    db_user = User(
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        hashed_password=hashed_password,
        role=user.role,
        last_active=datetime.utcnow() 
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    access_token = create_access_token(data={"sub": user.email, "role": user.role.value})
    return {"access_token": access_token, "token_type": "bearer", "first_name": db_user.first_name,
    "email": db_user.email,
    "role": db_user.role.value}

@router.post("/login", response_model=Token)
async def login(request: LoginRequest, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == request.email, User.role == request.role).first()
    if not db_user or not verify_password(request.password, db_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email, password, or role",
            headers={"WWW-Authenticate": "Bearer"},
        )
     # Update last_active timestamp
    db_user.last_active = datetime.utcnow()
    db.add(db_user)
    db.commit()
    access_token = create_access_token(data={"sub": db_user.email, "role": db_user.role.value})
    return {"access_token": access_token, "token_type": "bearer",  "first_name": db_user.first_name,
    "email": db_user.email,
    "role": db_user.role.value}