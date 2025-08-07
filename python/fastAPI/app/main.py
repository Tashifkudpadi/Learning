import time
from fastapi import FastAPI
import psycopg2
from psycopg2.extras import RealDictCursor
from .database import engine
from . import models
from .routers import post, user, auth


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

app.include_router(post.router)
app.include_router(user.router)
app.include_router(auth.router)
