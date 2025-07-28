from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database import Base


class Subject(Base):
    __tablename__ = "subjects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    code = Column(String)

    faculties = relationship(
        "Faculty", secondary="faculty_subject", back_populates="subjects")
