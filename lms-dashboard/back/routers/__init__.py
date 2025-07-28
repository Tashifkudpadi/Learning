from .auth import router as auth_router
from .users import router as users_router
from .students import router as students_router
from .faculties import router as faculties_router
from .subjects import router as subjects_router  # Add this line

__all__ = [
    "auth_router",
    "users_router",
    "students_router",
    "faculties_router",
    "subjects_router",  # Add this line
]
