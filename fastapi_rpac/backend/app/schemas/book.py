from typing import Optional
from datetime import datetime

from pydantic import BaseModel, Field


# 共享属性
class BookBase(BaseModel):
    title: Optional[str] = None
    author: Optional[str] = None
    isbn: Optional[str] = None
    publication_year: Optional[int] = None
    publisher: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    available_copies: Optional[int] = None
    total_copies: Optional[int] = None


# 创建图书时需要的属性
class BookCreate(BookBase):
    title: str
    author: str
    isbn: str
    total_copies: int = 1
    available_copies: int = Field(default=None)  # 将自动设置为total_copies

    class Config:
        validate_assignment = True

    def __init__(self, **data):
        super().__init__(**data)
        if self.available_copies is None:
            self.available_copies = self.total_copies


# 更新图书时可以更新的属性
class BookUpdate(BookBase):
    pass


# 数据库中存储的图书属性
class BookInDBBase(BookBase):
    id: int
    title: str
    author: str
    isbn: str
    available_copies: int
    total_copies: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
        from_attributes = True


# 返回给API的图书信息
class Book(BookInDBBase):
    pass


# 数据库中存储的图书信息
class BookInDB(BookInDBBase):
    pass 