from pydantic import BaseModel
from datetime import date
from typing import List, Optional

class BatchBase(BaseModel):
    name: str
    start_date: date
    end_date: date
    students: int

class BatchCreate(BatchBase):
    pass

class BatchUpdate(BatchBase):
    pass

class BatchOut(BatchBase):
    id: int
    class Config:
        orm_mode = True
