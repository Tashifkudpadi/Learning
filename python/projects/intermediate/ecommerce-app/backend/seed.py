from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import Product

def seed_products():
    db: Session = SessionLocal()
    try:
        # Define products with real image URLs
        products = [
            Product(
                name="Laptop",
                description="High-performance laptop with 16GB RAM and 512GB SSD",
                price=999.99,
                image_url="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ),
            Product(
                name="Smartphone",
                description="Latest model smartphone with 128GB storage and 5G",
                price=699.99,
                image_url="https://images.unsplash.com/photo-1605236453806-6b97669e7016?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ),
            Product(
                name="Headphones",
                description="Noise-cancelling over-ear headphones with 20-hour battery",
                price=199.99,
                image_url="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ),
            Product(
                name="Smartwatch",
                description="Fitness-tracking smartwatch with heart rate monitor",
                price=249.99,
                image_url="https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ),
            Product(
                name="Tablet",
                description="10-inch tablet with 64GB storage and stylus support",
                price=399.99,
                image_url="https://images.unsplash.com/photo-1512941937669-5ae8d7c98e23?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ),
            Product(
                name="Camera",
                description="Mirrorless digital camera with 4K video recording",
                price=799.99,
                image_url="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ),
            Product(
                name="Speaker",
                description="Portable Bluetooth speaker with 360-degree sound",
                price=129.99,
                image_url="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ),
            Product(
                name="Gaming Console",
                description="Next-gen gaming console with 1TB storage",
                price=499.99,
                image_url="https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ),
        ]

        # Check for existing products to avoid duplicates
        for product in products:
            existing = db.query(Product).filter(Product.name == product.name).first()
            if not existing:
                db.add(product)
            else:
                # Update existing product details if needed
                existing.description = product.description
                existing.price = product.price
                existing.image_url = product.image_url

        db.commit()
        print("Products seeded successfully!")
    except Exception as e:
        db.rollback()
        print(f"Error seeding products: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_products()