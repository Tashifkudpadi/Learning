from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database import Base

class Subject(Base):
    __tablename__ = "subjects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)

    faculties = relationship("Faculty", back_populates="subject")
