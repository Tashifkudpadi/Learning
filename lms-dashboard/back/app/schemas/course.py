from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class CourseBase(BaseModel):
    course_name: str
    course_desc: Optional[str] = None
    course_img: Optional[str] = None
    is_active: bool = True
    is_public: bool = False


class CourseCreate(CourseBase):
    batch_ids: Optional[List[int]] = []
    student_ids: Optional[List[int]] = []
    faculty_ids: Optional[List[int]] = []
    subject_ids: Optional[List[int]] = []


class CourseUpdate(CourseBase):
    batch_ids: Optional[List[int]] = []
    student_ids: Optional[List[int]] = []
    faculty_ids: Optional[List[int]] = []
    subject_ids: Optional[List[int]] = []


class CourseOut(CourseBase):
    id: int
    batch_ids: List[int] = []
    student_ids: List[int] = []
    faculty_ids: List[int] = []
    subject_ids: List[int] = []
    created_at: datetime

    class Config:
        orm_mode = True
