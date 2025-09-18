from pydantic import BaseModel
from typing import List


class TestBase(BaseModel):
    test_name: str


class TestCreate(TestBase):
    student_ids: List[int] = []
    faculty_ids: List[int] = []


class TestUpdate(TestBase):
    student_ids: List[int] = []
    faculty_ids: List[int] = []


class TestOut(TestBase):
    id: int
    student_ids: List[int] = []
    faculty_ids: List[int] = []

    class Config:
        orm_mode = True
