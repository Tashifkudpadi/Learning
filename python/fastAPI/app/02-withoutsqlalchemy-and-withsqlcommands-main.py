from random import randrange
import time
from typing import Optional
from fastapi import Body, FastAPI, HTTPException, Response, status
from pydantic import BaseModel
import psycopg2
from psycopg2.extras import RealDictCursor

app = FastAPI()


class Post(BaseModel):
    title: str
    content: str
    published: bool = True  # optional field
    rating: Optional[int] = None


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


@app.get("/posts")
def get_posts():
    cursor.execute("""SELECT * FROM posts""")
    posts = cursor.fetchall()
    return {"data": posts}


@app.post('/posts', status_code=status.HTTP_201_CREATED)
def create_posts(new_post: Post, response: Response):
    cursor.execute(
        """INSERT INTO posts (title, content, published) VALUES (%s, %s, %s) RETURNING *""",
        (new_post.title, new_post.content, new_post.published)
    )
    post_created = cursor.fetchone()  # This will be a dict (from RealDictCursor)
    connection.commit()
    return {"data": post_created}
# %s is a placeholder for string and it will be replaced by the values in the tuple also it will not allow sql injection or commands if users inputs the values


@app.get('/posts/latest')
def get_latest_post():
    cursor.execute("""SELECT * FROM posts ORDER BY created_at DESC LIMIT 1""")
    post = cursor.fetchone()
    return {"post_detail": post}


# {id} field represent a path parameter # this is a string
@app.get('/posts/{id}')
def get_post(id: int):
    cursor.execute("""SELECT * FROM posts WHERE id = %s""",
                   (str(id)))  # convert id to string again
    post = cursor.fetchone()
    if not post:
        raise HTTPException(
            status_code=404, detail=f"post with id: {id} was not found")
    return {"post_detail": post}


# this can behave "latest" as an id and will throw the error bcz "latest" is not an integer. so the solution can be move it before id function
# @app.get('/posts/latest')
# def get_latest_post():
#     return {"post_detail": my_posts[-1]}

def find_index_post(id: int):
    for i, p in enumerate(my_posts):
        if p['id'] == id:
            return i


@app.delete('/posts/{id}', status_code=status.HTTP_204_NO_CONTENT)
def delete_post(id: int):
    cursor.execute(
        """DELETE from posts WHERE id = %s RETURNING *""", (str(id),))
    post = cursor.fetchone()
    connection.commit()
    if not post:
        raise HTTPException(
            status_code=404, detail=f"post with id: {id} was not found")
    # fastapi doesnt accept any data in the response when the status code is 204 so we use Response. if we sent it willthrow an error called too much data for content length
    # optional line below
    return Response(status_code=status.HTTP_204_NO_CONTENT)

# update


@app.put('/posts/{id}')
def update_post(id: int, new_post: Post):
    cursor.execute("""UPDATE posts SET title = %s, content =%s, published=%s WHERE id = %s RETURNING *""",
                   (new_post.title, new_post.content, new_post.published, str(id),))
    post = cursor.fetchone()
    connection.commit()
    if not post:
        raise HTTPException(
            status_code=404, detail=f"post with id: {id} was not found")
    return {"post_detail": post}
