from fastapi import APIRouter, status, HTTPException, Depends, Response
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from sqlalchemy import util
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models, schemas, utils, oauth2


router = APIRouter(tags=["auth"])


@router.post('/login', response_model=schemas.Token)
def login(user_cred: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    # fastapi security has username and password only not email and in postman we can't send email and password we have to send username and password in the form data
    user = db.query(models.Users).filter(
        models.Users.email == user_cred.username).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Invalid Credentials")

    check_verify = utils.verify(user_cred.password, user.password)
    if not check_verify:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail=f"Invalid Credentials")

    access_token = oauth2.create_access_token(data={"user_id": str(user.id)})
    return {"access_token": access_token, "token_type": "bearer"}
