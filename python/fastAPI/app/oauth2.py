from datetime import datetime, timedelta
from jose import JWTError, jwt

from . import models

from .schemas import TokenData
from fastapi import HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from .database import get_db

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


# command to generate the secret key
# openssl rand - hex 32
SECRET_KEY = "e7c90f2ceb97fd95c8cd84ece59521fa46f8c954bf10236d2bc45a6ef75f83cf"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_IN_MINUTES = 60 * 24 * 7


# def create_access_token(data: dict):
#     to_encode = data.copy()
#     to_encode.update(
#         {"exp": datetime.now() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_IN_MINUTES)})
#     return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# above code not running and this code is from Instructor.
# below code is working and this is from AI generated.

def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_IN_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_access_token(token: str, credentials_exception):

    try:

        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        # passed user_id in the token when creating the token during login and here we are getting it back
        id: str = payload.get("user_id")
        if id is None:
            raise credentials_exception
        # just for the sake of type hinting and validating
        token_data = TokenData(id=id)
    except JWTError:
        raise credentials_exception

    return token_data


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail=f"Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    token_data = verify_access_token(token, credentials_exception)
    user = db.query(models.Users).filter(
        models.Users.id == token_data.id).first()
    return user
