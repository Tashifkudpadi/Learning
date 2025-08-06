from random import randrange
import time
from typing import List, Optional
from fastapi import Body, Depends, FastAPI, HTTPException, Response, status
from pydantic import BaseModel
import psycopg2
from psycopg2.extras import RealDictCursor
from sqlalchemy.orm import Session
from .database import engine, get_db
from . import models, schemas

app = FastAPI()

models.Base.metadata.create_all(bind=engine)


while True:
    try:
        connection = psycopg2.connect(host="localhost", database="fastapi",
                                      user="postgres", password="Theta$999", cursor_factory=RealDictCursor)
        cursor = connection.cursor()
        print("Database connection successful")
        break
    except Exception as error:
        print("Failed to connect to database")
        print("Error: ", error)
        time.sleep(2)


my_posts = [{"id": 1, "title": "title of post 1", "content": "content of post 1"}, {
    "id": 2, "title": "title of post 2", "content": "content of post 2"}]


@app.get("/")
def root():
    return {"message": "Hello World"}


@app.get("/posts", response_model=List[schemas.Post])
def get_posts(db: Session = Depends(get_db)):
    posts = db.query(models.Post).all()
    return posts


@app.post('/posts', status_code=status.HTTP_201_CREATED, response_model=schemas.Post)
def create_posts(new_post: schemas.PostCreate, db: Session = Depends(get_db)):
    # handle by sql
    # cursor.execute(
    #     """INSERT INTO posts (title, content, published) VALUES (%s, %s, %s) RETURNING *""",
    #     (new_post.title, new_post.content, new_post.published)
    # )
    # post_created = cursor.fetchone()  # This will be a dict (from RealDictCursor)
    # connection.commit()

    # handle by orm or sqlalchemy both are same
    # post_created = models.Post(
    #     title=new_post.title, content=new_post.content, published=new_post.published)
    # or
    # this is the best way to do it. unpacking the dict if there are many fields
    post_created = models.Post(**new_post.dict())
    db.add(post_created)
    db.commit()
    db.refresh(post_created)

    return post_created
# %s is a placeholder for string and it will be replaced by the values in the tuple also it will not allow sql injection or commands if users inputs the values


@app.get('/posts/latest', response_model=schemas.Post)
def get_latest_post(db: Session = Depends(get_db)):
    # cursor.execute("""SELECT * FROM posts ORDER BY created_at DESC LIMIT 1""")
    # post = cursor.fetchone()
    # connection.commit()
    post = db.query(models.Post).order_by(
        models.Post.created_at.desc()).first()
    return post


# {id} field represent a path parameter # this is a string
@app.get('/posts/{id}', response_model=schemas.Post)
def get_post(id: int, db: Session = Depends(get_db)):
    # cursor.execute("""SELECT * FROM posts WHERE id = %s""",
    #                (str(id)))  # convert id to string again
    # post = cursor.fetchone()
    post = db.query(models.Post).filter(models.Post.id == id).first()
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"post with id: {id} was not found")
    return post


# this can behave "latest" as an id and will throw the error bcz "latest" is not an integer. so the solution can be move it before id function
# @app.get('/posts/latest')
# def get_latest_post():
#     return {"post_detail": my_posts[-1]}

def find_index_post(id: int):
    for i, p in enumerate(my_posts):
        if p['id'] == id:
            return i


@app.delete('/posts/{id}', status_code=status.HTTP_204_NO_CONTENT)
def delete_post(id: int, db: Session = Depends(get_db)):
    post = db.query(models.Post).filter(models.Post.id == id)
    if post.first() is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"post with id: {id} was not found")
    post.delete(synchronize_session=False)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@app.put('/posts/{id}', response_model=schemas.Post)
def update_post(id: int, updated_post: schemas.PostCreate, db: Session = Depends(get_db)):
    post_query = db.query(models.Post).filter(models.Post.id == id)
    post = post_query.first()
    if post == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"post with id: {id} was not found")
    post_query.update(updated_post.dict(), synchronize_session=False)
    db.commit()
    return post_query.first()


@app.post('/users', status_code=status.HTTP_201_CREATED)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    new_user = models.Users(**user.model_dump())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@app.get('/users/{id}', response_model=schemas.UserResponse)
def get_user(id: int, db: Session = Depends(get_db)):
    user = db.query(models.Users).filter(models.Users.id == id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"user with id: {id} was not found")
    return user


@app.get('/users', response_model=List[schemas.UserResponse])
def get_users(db: Session = Depends(get_db)):
    users = db.query(models.Users).all()
    return users
