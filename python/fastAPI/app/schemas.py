from datetime import datetime
from pydantic import BaseModel, EmailStr

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


class PostCreate(PostBase):
    pass

# this is for response post


class Post(PostBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True  # this will allow pydantic to read the data from the database. without this we can't get the data from the database.if not added, then this is just sqlalchemy thing without class Config.


# ------------------------- Users Schema ----------------------
class UserCreate(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    email: EmailStr
    created_at: datetime
