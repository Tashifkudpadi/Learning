from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import users, products, cart, orders
from database import engine
import models

app = FastAPI()

# CORS setup to allow frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create database tables
models.Base.metadata.create_all(bind=engine)

# Include API routes
app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(products.router, prefix="/api/products", tags=["products"])
app.include_router(cart.router, prefix="/api/cart", tags=["cart"])
app.include_router(orders.router, prefix="/api/orders", tags=["orders"])

@app.get("/")
async def root():
    return {"message": "Welcome to the E-commerce API"}