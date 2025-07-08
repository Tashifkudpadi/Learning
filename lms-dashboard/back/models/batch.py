# models/batch.py
from .student import Student
from sqlalchemy import Column, Integer, String, Date
from sqlalchemy.orm import relationship

from .batch_student import batch_students
from database import Base

class Batch(Base):
    __tablename__ = "batches"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    start_date = Column(Date)
    end_date = Column(Date)

    # ✅ Use this
    students = relationship("Student", secondary=batch_students, back_populates="batches")
