from pydantic import BaseModel, EmailStr
from models.user import Role

class UserBase(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    role: Role

class UserCreate(UserBase):
    password: str
    confirm_password: str

class Token(BaseModel):
    access_token: str
    token_type: str