from typing import List, Optional
from datetime import datetime

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.crud.crud_book import book as crud_book
from app.models.borrow_record import BorrowRecord
from app.schemas.borrow import BorrowRecordCreate, BorrowRecordUpdate


class CRUDBorrowRecord(CRUDBase[BorrowRecord, BorrowRecordCreate, BorrowRecordUpdate]):
    def create(self, db: Session, *, obj_in: BorrowRecordCreate) -> BorrowRecord:
        """
        创建借阅记录并更新图书可用副本数量
        """
        # 减少图书可用副本数量
        crud_book.update_available_copies(db, book_id=obj_in.book_id, change=-1)
        
        # 创建借阅记录
        db_obj = BorrowRecord(
            user_id=obj_in.user_id,
            book_id=obj_in.book_id,
            borrow_date=datetime.utcnow(),
            due_date=obj_in.due_date,
            is_returned=False
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_by_user(self, db: Session, *, user_id: int) -> List[BorrowRecord]:
        """
        获取用户的所有借阅记录
        """
        return db.query(BorrowRecord).filter(BorrowRecord.user_id == user_id).all()

    def get_by_book(self, db: Session, *, book_id: int) -> List[BorrowRecord]:
        """
        获取图书的所有借阅记录
        """
        return db.query(BorrowRecord).filter(BorrowRecord.book_id == book_id).all()

    def get_active_by_user(self, db: Session, *, user_id: int) -> List[BorrowRecord]:
        """
        获取用户的未归还借阅记录
        """
        return db.query(BorrowRecord).filter(
            BorrowRecord.user_id == user_id,
            BorrowRecord.is_returned == False
        ).all()

    def get_overdue(self, db: Session) -> List[BorrowRecord]:
        """
        获取所有逾期未归还的借阅记录
        """
        now = datetime.utcnow()
        return db.query(BorrowRecord).filter(
            BorrowRecord.is_returned == False,
            BorrowRecord.due_date < now
        ).all()

    def return_book(self, db: Session, *, borrow_id: int) -> Optional[BorrowRecord]:
        """
        归还图书并更新借阅记录
        """
        borrow_record = self.get(db, id=borrow_id)
        if not borrow_record or borrow_record.is_returned:
            return None
        
        # 更新借阅记录
        borrow_record.is_returned = True
        borrow_record.return_date = datetime.utcnow()
        
        # 增加图书可用副本数量
        crud_book.update_available_copies(db, book_id=borrow_record.book_id, change=1)
        
        db.add(borrow_record)
        db.commit()
        db.refresh(borrow_record)
        return borrow_record


borrow_record = CRUDBorrowRecord(BorrowRecord) 