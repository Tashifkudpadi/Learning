from pydantic import BaseModel, EmailStr
from datetime import date
from typing import List, Optional

class StudentBase(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    enrollment_date: date
    batch_ids: Optional[List[int]] = []

class StudentCreate(StudentBase):
    pass

class StudentUpdate(StudentBase):
    pass

class StudentOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: EmailStr
    enrollment_date: date
    batches: List[str] = []

    class Config:
        orm_mode = True
