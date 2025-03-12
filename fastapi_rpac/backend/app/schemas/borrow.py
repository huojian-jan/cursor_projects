from typing import Optional
from datetime import datetime, timedelta

from pydantic import BaseModel, Field


# 共享属性
class BorrowRecordBase(BaseModel):
    user_id: Optional[int] = None
    book_id: Optional[int] = None
    due_date: Optional[datetime] = None
    is_returned: Optional[bool] = False


# 创建借阅记录时需要的属性
class BorrowRecordCreate(BorrowRecordBase):
    user_id: int
    book_id: int
    due_date: datetime = Field(default_factory=lambda: datetime.utcnow() + timedelta(days=14))


# 更新借阅记录时可以更新的属性
class BorrowRecordUpdate(BorrowRecordBase):
    return_date: Optional[datetime] = None
    is_returned: Optional[bool] = None


# 数据库中存储的借阅记录属性
class BorrowRecordInDBBase(BorrowRecordBase):
    id: int
    user_id: int
    book_id: int
    borrow_date: datetime
    due_date: datetime
    return_date: Optional[datetime] = None
    is_returned: bool

    class Config:
        orm_mode = True
        from_attributes = True


# 返回给API的借阅记录信息
class BorrowRecord(BorrowRecordInDBBase):
    pass


# 数据库中存储的借阅记录信息
class BorrowRecordInDB(BorrowRecordInDBBase):
    pass


# 借阅记录详细信息，包含用户和图书信息
class BorrowRecordDetail(BorrowRecord):
    user_name: str
    book_title: str 