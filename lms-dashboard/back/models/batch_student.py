# models/batch_student.py
from sqlalchemy import Table, Column, ForeignKey, Integer
from sqlalchemy.orm import declarative_base
from database import Base

batch_students = Table(
    "batch_students",
    Base.metadata,
    Column("batch_id", ForeignKey("batches.id"), primary_key=True),
    Column("student_id", ForeignKey("students.id"), primary_key=True),
)
