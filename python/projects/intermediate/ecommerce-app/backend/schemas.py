from pydantic import BaseModel
from typing import List
from datetime import datetime

class UserCreate(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    email: str
    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class ProductBase(BaseModel):
    name: str
    description: str
    price: float
    image_url: str

class ProductResponse(ProductBase):
    id: int
    class Config:
        orm_mode = True

class CartItem(BaseModel):
    product_id: int
    quantity: int
    class Config:
        orm_mode = True

class CartUpdate(BaseModel):
    quantity: int

class CartResponse(BaseModel):
    id: int
    user_id: int
    product: ProductResponse
    quantity: int
    class Config:
        orm_mode = True

class OrderItemResponse(BaseModel):
    id: int
    product: ProductResponse
    quantity: int
    class Config:
        orm_mode = True

class OrderCreate(BaseModel):
    total_amount: float

class OrderResponse(BaseModel):
    id: int
    user_id: int
    total_amount: float
    status: str
    created_at: datetime
    order_items: List[OrderItemResponse]
    class Config:
        orm_mode = True