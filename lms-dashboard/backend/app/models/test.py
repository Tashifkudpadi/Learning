from sqlalchemy import Column, Integer, String, Table, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

test_student = Table(
    "test_student",
    Base.metadata,
    Column("test_id", Integer, ForeignKey("tests.id", ondelete="CASCADE")),
    Column("student_id", Integer, ForeignKey(
        "students.id", ondelete="CASCADE")),
)

test_faculty = Table(
    "test_faculty",
    Base.metadata,
    Column("test_id", Integer, ForeignKey("tests.id", ondelete="CASCADE")),
    Column("faculty_id", Integer, ForeignKey(
        "faculties.id", ondelete="CASCADE")),
)


class Test(Base):
    __tablename__ = "tests"

    id = Column(Integer, primary_key=True, index=True)
    test_name = Column(String, index=True)

    students = relationship(
        "Student", secondary=test_student, back_populates="tests")
    faculties = relationship(
        "Faculty", secondary=test_faculty, back_populates="tests")
