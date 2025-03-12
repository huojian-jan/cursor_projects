from enum import Enum
from typing import List, Optional

from sqlalchemy import Boolean, Column, Enum as SQLAlchemyEnum, Integer, String
from sqlalchemy.orm import Mapped, relationship

from app.db.base_class import Base


class UserRole(str, Enum):
    SUPER_ADMIN = "super_admin"
    ADMIN = "admin"
    READER = "reader"


class User(Base):
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, index=True)
    role = Column(SQLAlchemyEnum(UserRole), default=UserRole.READER, nullable=False)
    is_active = Column(Boolean, default=True)
    
    # Relationships
    borrowed_books: Mapped[List["BorrowRecord"]] = relationship(
        "BorrowRecord", back_populates="user", cascade="all, delete-orphan"
    ) 