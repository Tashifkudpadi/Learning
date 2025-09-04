from fastapi import FastAPI
from .database import engine
from . import models
from .routers import post, user, auth, vote
from fastapi.middleware.cors import CORSMiddleware

origins = ['*']

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# no need now bcz of alembic
models.Base.metadata.create_all(bind=engine)

app.include_router(post.router)
app.include_router(user.router)
app.include_router(auth.router)
app.include_router(vote.router)


@app.get('/', tags=['testing'])
def root():
    return {"message": "Hello World from the docker"}
