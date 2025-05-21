from sqlalchemy import Boolean, Column, Integer, String, ForeignKey   
from database import Base

class Question(Base):
    __tablename__ = 'questions' # actual name of the table in PostgreSQL.
    
    id=Column(Integer,primary_key=True,index=True) #primary key (auto-incremented).
    question_text=Column(String,index=True) #stores the actual question.
    
class Choices(Base):
    __tablename__ = 'choices'
    
    id=Column(Integer,primary_key=True,index=True)
    choice_text=Column(String,index=True)
    is_correct=Column(Boolean,default=False)
    question_id=Column(Integer,ForeignKey("questions.id"))