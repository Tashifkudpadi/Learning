from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Cart, Product
from schemas import CartItem, CartUpdate, CartResponse
from auth import get_current_user

router = APIRouter()

@router.post("/", response_model=CartResponse)
async def add_to_cart(cart_item: CartItem, user=Depends(get_current_user), db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == cart_item.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Check if the product is already in the cart
    existing_cart_item = db.query(Cart).filter(
        Cart.user_id == user.id,
        Cart.product_id == cart_item.product_id
    ).first()
    
    if existing_cart_item:
        # Update quantity if product exists in cart
        existing_cart_item.quantity += cart_item.quantity
        db.commit()
        db.refresh(existing_cart_item)
        return existing_cart_item
    else:
        # Add new cart item
        cart = Cart(user_id=user.id, product_id=cart_item.product_id, quantity=cart_item.quantity)
        db.add(cart)
        db.commit()
        db.refresh(cart)
        return cart

@router.get("/", response_model=list[CartResponse])
async def get_cart(user=Depends(get_current_user), db: Session = Depends(get_db)):
    cart_items = db.query(Cart).filter(Cart.user_id == user.id).all()
    return cart_items

@router.put("/{cart_id}", response_model=CartResponse)
async def update_cart_item(cart_id: int, cart_update: CartUpdate, user=Depends(get_current_user), db: Session = Depends(get_db)):
    cart_item = db.query(Cart).filter(Cart.id == cart_id, Cart.user_id == user.id).first()
    if not cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found")
    if cart_update.quantity < 1:
        raise HTTPException(status_code=400, detail="Quantity must be at least 1")
    cart_item.quantity = cart_update.quantity
    db.commit()
    db.refresh(cart_item)
    return cart_item

@router.delete("/{cart_id}")
async def remove_from_cart(cart_id: int, user=Depends(get_current_user), db: Session = Depends(get_db)):
    cart_item = db.query(Cart).filter(Cart.id == cart_id, Cart.user_id == user.id).first()
    if not cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found")
    db.delete(cart_item)
    db.commit()
    return {"message": "Item removed from cart"}