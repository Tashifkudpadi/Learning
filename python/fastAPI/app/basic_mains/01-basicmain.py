from random import randrange
from typing import Optional
from fastapi import Body, FastAPI, HTTPException, Response, status
from pydantic import BaseModel

app = FastAPI()


class Post(BaseModel):
    title: str
    content: str
    published: bool = True  # optional field
    rating: Optional[int] = None


my_posts = [{"id": 1, "title": "title of post 1", "content": "content of post 1"}, {
    "id": 2, "title": "title of post 2", "content": "content of post 2"}]


@app.get("/")
def root():
    return {"message": "Hello World"}


@app.get("/posts")
def get_posts():
    return {"data": my_posts}


@app.post('/posts', status_code=status.HTTP_201_CREATED)
# remove response in the function parameter if using HTTPException or status.HTTP_201_CREATED in decorator
def create_posts(new_post: Post, response: Response):

    post_dict = new_post.dict()
    post_dict["id"] = randrange(0, 10000)
    my_posts.append(post_dict)
    # response.status_code = status.HTTP_201_CREATED
    return {"data": post_dict}


@app.get('/posts/latest')
def get_latest_post():
    return {"post_detail": my_posts[-1]}


def find_post(id: int):
    for post in my_posts:
        if post['id'] == id:
            return post


@app.get('/posts/{id}')  # {id} field represent a path parameter
def get_post(id: int, response: Response):  # remove response if using HTTPException
    post = find_post(id)
    if not post:
        # response.status_code = status.HTTP_404_NOT_FOUND
        # return {"message": f"post not {id} found"}
        # or
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
    index = find_index_post(id)
    if index == None:
        raise HTTPException(
            status_code=404, detail=f"post with id: {id} was not found")
    my_posts.pop(index)
    # fastapi doesnt accept any data in the response when the status code is 204 so we use Response. if we sent it willthrow an error called too much data for content length
    # optional line below
    return Response(status_code=status.HTTP_204_NO_CONTENT)

# or


# @app.delete('/posts/{id}', status_code=status.HTTP_204_NO_CONTENT)
# def delete_post(id: int, response: Response):
#     post = find_post(id)
#     if not post:
#         response.status_code = status.HTTP_404_NOT_FOUND
#         return {"message": f"post not {id} found"}
#     my_posts.remove(post)
#     # fastapi doesnt accept any data in the response when the status code is 204 so we use Response. if we sent it willthrow an error called too much data for content length
#     return Response(status_code=status.HTTP_204_NO_CONTENT)

# update

@app.put('/posts/{id}')
def update_post(id: int):
    for post in my_posts:
        if post['id'] == id:
            post['title'] = 'new title updated'
            post['content'] = 'new content updated'
            return {"message": "post updated successfully", "post": post}
    raise HTTPException(
        status_code=404, detail=f"post with id: {id} was not found")
