from pydantic import BaseModel, EmailStr
from typing import Optional

class FacultyBase(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    subject_id: Optional[int] = None

class FacultyCreate(FacultyBase):
    pass

class FacultyUpdate(FacultyBase):
    pass

class FacultyOut(FacultyBase):
    id: int
    subject_name: Optional[str] = None

    class Config:
        orm_mode = True
