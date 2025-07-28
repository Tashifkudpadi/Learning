from sqlalchemy import Column, Integer, String, Enum, DateTime
# from sqlalchemy.orm import relationship
from database import Base
import enum

class Role(enum.Enum):
    ADMIN = "admin"
    FACULTY = "faculty"
    STUDENT = "student"

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, index=True)
    last_name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    role = Column(Enum(Role), nullable=False)
    hashed_password = Column(String)
    last_active = Column(DateTime, nullable=True)
    
    # student = relationship("Student", back_populates="user", uselist=False)
    # faculty = relationship("Faculty", back_populates="user", uselist=False)
    
def __repr__(self):
    return f"<Student id={self.id} user_id={self.user_id}>"
    
