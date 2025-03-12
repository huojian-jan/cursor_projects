from datetime import datetime

from sqlalchemy import Column, DateTime, ForeignKey, Integer, Boolean
from sqlalchemy.orm import Mapped, relationship

from app.db.base_class import Base


class BorrowRecord(Base):
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    book_id = Column(Integer, ForeignKey("book.id"), nullable=False)
    borrow_date = Column(DateTime, default=datetime.utcnow, nullable=False)
    due_date = Column(DateTime, nullable=False)
    return_date = Column(DateTime, nullable=True)
    is_returned = Column(Boolean, default=False)
    
    # Relationships
    user: Mapped["User"] = relationship("User", back_populates="borrowed_books")
    book: Mapped["Book"] = relationship("Book", back_populates="borrow_records") 