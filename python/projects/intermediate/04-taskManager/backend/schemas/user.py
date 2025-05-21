from pydantic import BaseModel, EmailStr
from typing import Optional

class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase): #For registering a new user.
    password: str

class UserResponse(UserBase): #For returning user data (excluding password).
    id: int
    created_at: str

    class Config:
        orm_mode = True

class UserLogin(BaseModel): #For login requests.
    email: EmailStr
    password: str  

class Token(BaseModel): #For returning JWT tokens.
    access_token: str
    token_type: str
    username: Optional[str] = None # Add optional username field