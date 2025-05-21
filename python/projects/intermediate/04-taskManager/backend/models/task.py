from sqlalchemy import Column, Integer, String, Text, Date, DateTime, ForeignKey
from sqlalchemy.sql import func
from database import Base

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    title = Column(String(100), nullable=False)
    description = Column(Text)
    status = Column(String(20), default="To Do")
    due_date = Column(Date)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

# This matches the tasks table schema from schema.sql.    