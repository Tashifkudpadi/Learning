from sqlalchemy import Column, Integer, String, DateTime
from app.database import Base


class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String)
    roll_number = Column(String)
    mobile_number = Column(String)  # <-- ✅ change from Integer to String
    enrollment_date = Column(DateTime, nullable=True)
