from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
from .batch_student import batch_students  # ✅ import the table

class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))

    batch = Column(String)
    roll_number = Column(String)

    user = relationship("User", back_populates="student")
    batches = relationship("Batch", secondary=batch_students, back_populates="students")
