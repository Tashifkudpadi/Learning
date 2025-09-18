from .. import models, schemas, utils, oauth2
from ..database import get_db
from fastapi import Depends, HTTPException, Response, status, APIRouter
from sqlalchemy.orm import Session
from typing import Optional, List

router = APIRouter(
    prefix="/users",
    tags=["Users"],
)


@router.post('/', status_code=status.HTTP_201_CREATED, response_model=schemas.UserResponse)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):

    existing_user = db.query(models.Users).filter(
        models.Users.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="User with this email already exists")
    # hash the password which can be retrieved from user.password
    hashed_password = utils.hash(user.password)
    user.password = hashed_password

    new_user = models.Users(**user.model_dump())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@router.get('/{id}', response_model=schemas.UserResponse)
def get_user(id: int, db: Session = Depends(get_db)):
    user = db.query(models.Users).filter(models.Users.id == id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"user with id: {id} was not found")
    return user


@router.get('/', response_model=List[schemas.UserResponse])
def get_users(db: Session = Depends(get_db)):
    users = db.query(models.Users).all()
    return users


@router.put("/{id}", response_model=schemas.UserResponse)
def update_user(
    id: int,
    user: schemas.UserUpdate,   # <-- use the partial schema
    db: Session = Depends(get_db)
):
    # 1️⃣ Find existing user
    existing_user = db.query(models.Users).filter(
        models.Users.id == id).first()
    if not existing_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id {id} was not found",
        )

    # 2️⃣ Handle email (check uniqueness only if it's provided & different)
    if user.email and user.email != existing_user.email:
        email_taken = (
            db.query(models.Users)
            .filter(models.Users.email == user.email, models.Users.id != id)
            .first()
        )
        if email_taken:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User with this email already exists",
            )
        existing_user.email = user.email

    # 3️⃣ Handle password
    if user.password:
        existing_user.password = utils.hash(user.password)

    # 4️⃣ Handle other optional fields (e.g., phone_number)
    if user.phone_number is not None:
        existing_user.phone_number = user.phone_number

    db.commit()
    db.refresh(existing_user)
    return existing_user


@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
def delete_user(id: int, db: Session = Depends(get_db)):
    user = db.query(models.Users).filter(models.Users.id == id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"user with id: {id} was not found")
    db.delete(user)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
