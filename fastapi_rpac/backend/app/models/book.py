from typing import List, Optional
from datetime import datetime

from sqlalchemy import Column, DateTime, Integer, String, Text, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, relationship

from app.db.base_class import Base


class Book(Base):
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    author = Column(String, index=True, nullable=False)
    isbn = Column(String, unique=True, index=True, nullable=False)
    publication_year = Column(Integer)
    publisher = Column(String)
    description = Column(Text)
    category = Column(String, index=True)
    available_copies = Column(Integer, default=1)
    total_copies = Column(Integer, default=1)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    borrow_records: Mapped[List["BorrowRecord"]] = relationship(
        "BorrowRecord", back_populates="book", cascade="all, delete-orphan"
    ) 