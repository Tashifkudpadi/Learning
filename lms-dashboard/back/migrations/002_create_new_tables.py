from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String, Date, ForeignKey, Enum
from database import Base
import enum

class Role(enum.Enum):
    ADMIN = "admin"
    FACULTY = "faculty"
    STUDENT = "student"

def upgrade():
    metadata = MetaData()
    engine = create_engine("postgresql://postgres@localhost/lms_db")
    metadata.drop_all(engine, tables=[
        Table("batch_students", metadata),
        Table("subjects", metadata),
        Table("faculty", metadata),
        Table("students", metadata),
        Table("batches", metadata),
        Table("users", metadata)
    ])
    print("Dropped existing tables: users, batches, students, faculty, subjects, batch_students")

    Table(
        "users",
        metadata,
        Column("id", Integer, primary_key=True, index=True),
        Column("first_name", String, index=True),
        Column("last_name", String, index=True),
        Column("email", String, unique=True, index=True),
        Column("role", Enum(Role), nullable=False),
        Column("hashed_password", String, nullable=False),
        Column("last_active", Date)
    )

    Table(
        "batches",
        metadata,
        Column("id", Integer, primary_key=True, index=True),
        Column("name", String, index=True),
        Column("start_date", Date),
        Column("end_date", Date),
        Column("students", Integer)
    )

    Table(
        "students",
        metadata,
        Column("id", Integer, primary_key=True, index=True),
        Column("first_name", String, index=True),
        Column("last_name", String, index=True),
        Column("email", String, unique=True, index=True),
        Column("enrollment_date", Date)
    )

    Table(
        "subjects",
        metadata,
        Column("id", Integer, primary_key=True, index=True),
        Column("name", String, unique=True, index=True)
    )

    Table(
        "faculty",
        metadata,
        Column("id", Integer, primary_key=True, index=True),
        Column("first_name", String, index=True),
        Column("last_name", String, index=True),
        Column("email", String, unique=True, index=True),
        Column("subject_id", Integer, ForeignKey("subjects.id"))
    )

    Table(
        "batch_students",
        metadata,
        Column("batch_id", Integer, ForeignKey("batches.id"), primary_key=True),
        Column("student_id", Integer, ForeignKey("students.id"), primary_key=True)
    )

    metadata.create_all(engine)
    print("Tables created successfully: users, batches, students, faculty, subjects, batch_students")

def downgrade():
    metadata = MetaData()
    metadata.drop_all(
        create_engine("postgresql://postgres@localhost/lms_db"),
        tables=["batch_students", "subjects", "faculty", "students", "batches", "users"]
    )
    print("Tables dropped successfully: users, batches, students, faculty, subjects, batch_students")