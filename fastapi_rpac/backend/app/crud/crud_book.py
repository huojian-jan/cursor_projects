from typing import List, Optional

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.book import Book
from app.schemas.book import BookCreate, BookUpdate


class CRUDBook(CRUDBase[Book, BookCreate, BookUpdate]):
    def get_by_isbn(self, db: Session, *, isbn: str) -> Optional[Book]:
        """
        通过ISBN获取图书
        """
        return db.query(Book).filter(Book.isbn == isbn).first()

    def get_by_title(self, db: Session, *, title: str) -> List[Book]:
        """
        通过标题搜索图书
        """
        return db.query(Book).filter(Book.title.ilike(f"%{title}%")).all()

    def get_by_author(self, db: Session, *, author: str) -> List[Book]:
        """
        通过作者搜索图书
        """
        return db.query(Book).filter(Book.author.ilike(f"%{author}%")).all()

    def get_by_category(self, db: Session, *, category: str) -> List[Book]:
        """
        通过分类获取图书
        """
        return db.query(Book).filter(Book.category == category).all()

    def get_available_books(self, db: Session, *, skip: int = 0, limit: int = 100) -> List[Book]:
        """
        获取有可用副本的图书
        """
        return db.query(Book).filter(Book.available_copies > 0).offset(skip).limit(limit).all()

    def update_available_copies(self, db: Session, *, book_id: int, change: int) -> Optional[Book]:
        """
        更新图书可用副本数量
        """
        book = self.get(db, id=book_id)
        if not book:
            return None
        
        # 确保可用副本数量不会小于0或大于总副本数量
        new_available = max(0, min(book.total_copies, book.available_copies + change))
        book.available_copies = new_available
        
        db.add(book)
        db.commit()
        db.refresh(book)
        return book


book = CRUDBook(Book) 