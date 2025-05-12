from fastapi import FastAPI, Depends, HTTPException 
from pydantic import BaseModel
from typing import List, Annotated
import models
from database import SessionLocal, engine
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse


# FastAPI: initializes the web app.
# Depends: used for dependency injection (like DB sessions).
# HTTPException: for returning error responses.
# Pydantic models help validate and structure request data.


app=FastAPI() #initializes the web app.

# CORS Configurations
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # or ["*"] for all origins (not recommended for production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Creates the tables defined in models.py inside the actual PostgreSQL database.
# It looks at all subclasses of Base, reads their structure, and creates the tables in your PostgreSQL database if they don’t already exist.
models.Base.metadata.create_all(bind=engine) 

#📦 Pydantic Schemas (Request Validation)
# These define how your incoming JSON should look for creating questions and choices. 
class ChoiceBase(BaseModel):
    choice_text: str
    is_correct:bool

class QuestionBase(BaseModel):
    question_text: str
    choices:List[ChoiceBase]
    
    
#🧪 Database Dependency    
def get_db():
    db=SessionLocal()    
    try:
        yield db
    finally:
        db.close()
        
db_dependency=Annotated[Session,Depends(get_db)]

@app.post('/questions')
async def create_question(question:QuestionBase,db:db_dependency):
    db_question=models.Question(question_text=question.question_text)
    db.add(db_question)
    db.commit()
    db.refresh(db_question)
    for choice in question.choices:
        db_choice=models.Choices(choice_text=choice.choice_text, is_correct=choice.is_correct, question_id=db_question.id)
        db.add(db_choice)
    db.commit()
    

@app.get('/questions/{question.id}')
async def get_question(question_id:int,db:db_dependency):
    question=db.query(models.Question).filter(models.Question.id==question_id).first()  
    if not question:
        raise HTTPException(status_code=404,detail="Question not found")
    return question


@app.get('/all-questions')
async def get_all_questions(db: db_dependency):
    questions = db.query(models.Question).all()
    results = []
    for question in questions:
        choices = db.query(models.Choices).filter(models.Choices.question_id == question.id).all()
        results.append({
            "id": question.id,
            "question_text": question.question_text,
            "choices": [
                {
                    "choice_text": choice.choice_text,
                    "is_correct": choice.is_correct
                } for choice in choices
            ]
        })
    return JSONResponse(content=results)

@app.get('/choices/{question_id}')
async def get_choices(question_id:int,db:db_dependency):
    choices=db.query(models.Choices).filter(models.Choices.question_id==question_id).all()  
    if not choices:
        raise HTTPException(status_code=404,detail="Choices not found")
    return choices    