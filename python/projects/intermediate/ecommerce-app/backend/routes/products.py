from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Product
from schemas import ProductResponse
from auth import get_current_user

router = APIRouter()

@router.get("/", response_model=list[ProductResponse])
async def get_products(db: Session = Depends(get_db)):
    products = db.query(Product).all()
    return products

@router.get("/{product_id}", response_model=ProductResponse)
async def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product