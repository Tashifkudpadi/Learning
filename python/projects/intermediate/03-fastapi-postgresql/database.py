from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# This is your database connection string:
# postgresql:// → dialect
# postgres → username
# Your Password → password
# localhost:5432 → host and port
# QuizApplication → database name

URL_DATABASE="postgresql://postgres:yourpassword@localhost:5432/QuizApplication"

engine=create_engine(URL_DATABASE) #Creates a database engine. Think of this as the connection to the actual database.
SessionLocal=sessionmaker(autocommit=False, autoflush=False,bind=engine )
Base=declarative_base()
# It creates a base class for all your database models.
# Every model class (like Question, Choices) must inherit from this to be recognized by SQLAlchemy as a database table.

# 🔸 sessionmaker (from SQLAlchemy)
# It’s a factory for creating new Session objects.
# Think of it as a template or configuration for your sessions.

# 🔸 autocommit=False
# You want explicit control over when data is saved to the database.
# If autocommit=True, the session will automatically commit every change, which is dangerous in many use cases.
# With False, you write db.commit() yourself when you're ready to persist changes.

# 🔸 autoflush=False
# Normally, SQLAlchemy will flush changes (send them to the database) before every query, to keep the session in sync.
# Setting this to False gives you manual control, improving performance in some situations.
# You can still manually flush using db.flush().

# 💡 Even with autoflush=False, db.commit() will still flush pending changes.

# 🔸 bind=engine
# This tells the session to use the engine (your actual connection to the PostgreSQL database) created earlier with:
# engine = create_engine(URL_DATABASE)

    