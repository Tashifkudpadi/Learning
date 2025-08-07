from .. import models, schemas, utils
from ..database import get_db
from fastapi import Depends, HTTPException, Response, status, APIRouter
from sqlalchemy.orm import Session
from typing import Optional, List

router = APIRouter(
    prefix="/posts",
    tags=["Posts"],
)


@router.get("/", response_model=List[schemas.Post])
def get_posts(db: Session = Depends(get_db)):
    posts = db.query(models.Post).all()
    return posts


@router.post('/', status_code=status.HTTP_201_CREATED, response_model=schemas.Post)
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


@router.get('/latest', response_model=schemas.Post)
def get_latest_post(db: Session = Depends(get_db)):
    # cursor.execute("""SELECT * FROM posts ORDER BY created_at DESC LIMIT 1""")
    # post = cursor.fetchone()
    # connection.commit()
    post = db.query(models.Post).order_by(
        models.Post.created_at.desc()).first()
    return post


# {id} field represent a path parameter # this is a string
@router.get('/{id}', response_model=schemas.Post)
def get_post(id: int, db: Session = Depends(get_db)):
    # cursor.execute("""SELECT * FROM posts WHERE id = %s""",
    #                (str(id)))  # convert id to string again
    # post = cursor.fetchone()
    post = db.query(models.Post).filter(models.Post.id == id).first()
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"post with id: {id} was not found")
    return post


@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
def delete_post(id: int, db: Session = Depends(get_db)):
    post = db.query(models.Post).filter(models.Post.id == id)
    if post.first() is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"post with id: {id} was not found")
    post.delete(synchronize_session=False)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.put('/{id}', response_model=schemas.Post)
def update_post(id: int, updated_post: schemas.PostCreate, db: Session = Depends(get_db)):
    post_query = db.query(models.Post).filter(models.Post.id == id)
    post = post_query.first()
    if post == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"post with id: {id} was not found")
    post_query.update(updated_post.model_dump(), synchronize_session=False)
    db.commit()
    return post_query.first()
