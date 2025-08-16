from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr
from pydantic.types import conint

#  ------------------------------------version 1-----------------------
# class Post(BaseModel):
#     title: str
#     content: str
#     published: bool = True  # optional field


# class CreatePost(BaseModel):
#     title: str
#     content: str
#     published: bool = True  # optional field


# # if user is allowed to update all fields
# class UpdatePost(BaseModel):
#     title: str
#     content: str
#     published: bool

# if user is allowed to update only title and published fields (not sure this is correct or not)
# class UpdatePost(BaseModel):
#     title: str
#     published: bool

#  ------------------------------------version 2 -----------------------

# this is for create post
class PostBase(BaseModel):
    title: str
    content: str
    published: bool = True  # optional field


class PostCreate(PostBase):     # (post req)
    pass


class UserResponse(BaseModel):  # this is for response user (get req)
    id: int
    email: EmailStr
    created_at: datetime

    class Config:
        orm_mode = True


class Post(PostBase):  # this is the response
    id: int
    created_at: datetime
    owner_id: int
    owner: UserResponse

    class Config:
        orm_mode = True  # this will allow pydantic to read the data from the database. without this we can't get the data from the database.if not added, then this is just sqlalchemy thing without class Config.


class PostOut(BaseModel):
    Post: Post  # Capital P matches the alias used in query tuple
    votes: int

    class Config:
        orm_mode = True


# ------------------------- Users Schema ----------------------
class UserCreate(BaseModel):  # this is for creating user, to verify users inputs
    email: EmailStr
    password: str


class UserLogin(BaseModel):  # this is for login user, to verify users inputs
    email: EmailStr
    password: str


class Token(BaseModel):  # once user is logged in, this is the response
    access_token: str
    token_type: str


class TokenData(BaseModel):  # to verify the access token in oauth2 files
    id: Optional[str] = None


class Vote(BaseModel):
    post_id: int
    # dir is either 1 or -1. ge=1 means greater than or equal to 1. le=1 means less than or equal to 1.
    dir: conint(le=1)
