from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Order, Cart, OrderItem
from schemas import OrderCreate, OrderResponse
from auth import get_current_user

router = APIRouter()

@router.post("/", response_model=OrderResponse)
async def create_order(order: OrderCreate, user=Depends(get_current_user), db: Session = Depends(get_db)):
    # Get cart items
    cart_items = db.query(Cart).filter(Cart.user_id == user.id).all()
    if not cart_items:
        raise HTTPException(status_code=400, detail="Cart is empty")
    
    # Create order
    db_order = Order(user_id=user.id, total_amount=order.total_amount)
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    
    # Save cart items as order items
    for cart_item in cart_items:
        order_item = OrderItem(
            order_id=db_order.id,
            product_id=cart_item.product_id,
            quantity=cart_item.quantity
        )
        db.add(order_item)
    
    # Clear cart
    db.query(Cart).filter(Cart.user_id == user.id).delete()
    db.commit()
    
    # Refresh order to include order items
    db.refresh(db_order)
    return db_order

@router.get("/", response_model=list[OrderResponse])
async def get_orders(user=Depends(get_current_user), db: Session = Depends(get_db)):
    orders = db.query(Order).filter(Order.user_id == user.id).all()
    return orders