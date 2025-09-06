from pydantic import BaseModel
from typing import Optional


class TopicBase(BaseModel):
    name: str
    description: Optional[str] = None


class TopicCreate(TopicBase):
    subject_id: int   # required to associate topic with subject


class TopicUpdate(TopicBase):
    pass


class TopicOut(TopicBase):
    id: int
    subject_id: int

    class Config:
        orm_mode = True
