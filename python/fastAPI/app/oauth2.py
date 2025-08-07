from datetime import datetime, timedelta
from jose import JWTError, jwt

# openssl rand - hex 32
SECRET_KEY = "e7c90f2ceb97fd95c8cd84ece59521fa46f8c954bf10236d2bc45a6ef75f83cf"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_IN_MINUTES = 60 * 24 * 7


def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_IN_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
