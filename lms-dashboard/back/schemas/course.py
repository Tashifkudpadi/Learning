from pydantic import BaseModel

class CourseBase(BaseModel):
    title: str
    description: str | None = None

class CourseCreate(CourseBase):
    pass

class Course(CourseBase):
    id: int
    instructor_id: int

    class Config:
        from_attributes = True