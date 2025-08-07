from fastapi import APIRouter, status, HTTPException, Depends, Response
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models, schemas, utils, oauth2

router = APIRouter(tags=["auth"])


@router.post('/login', status_code=status.HTTP_200_OK)
async def login(user_cred: schemas.UserLogin, db: Session = Depends(get_db)):
    user_db = db.query(models.Users).filter(
        models.Users.email == user_cred.email).first()
    if not user_db or not utils.verify(user_cred.password, user_db.password):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Invalid credentials")

    create_token = oauth2.create_access_token(data={"user_id": user_db.id})
    return {"access_token": create_token, "token_type": "bearer"}
