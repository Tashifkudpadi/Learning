from pydantic import BaseModel, EmailStr
from typing import Literal

class UserBase(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    role: Literal["admin", "faculty", "student"]

class UserCreate(UserBase):
    password: str
    confirm_password: str

class User(UserBase):
    id: int

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str