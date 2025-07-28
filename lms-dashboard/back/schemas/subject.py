from pydantic import BaseModel
from typing import List, Optional


class SubjectBase(BaseModel):
    name: str
    code: str


class SubjectCreate(SubjectBase):
    faculty_ids: List[int] = []


class SubjectUpdate(SubjectBase):
    faculty_ids: List[int] = []


class SubjectOut(SubjectBase):
    id: int
    faculty_ids: List[int] = []

    class Config:
        orm_mode = True
