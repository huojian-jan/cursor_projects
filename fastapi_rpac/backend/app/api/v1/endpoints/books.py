from typing import Any, List, Optional

from fastapi import APIRouter, Depends, HTTPException, Path, Query
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.core.permissions import Permission, check_permission
from app.crud.crud_book import book as crud_book
from app.models.user import User
from app.schemas.book import Book, BookCreate, BookUpdate

router = APIRouter()


@router.get("/", response_model=List[Book])
def read_books(
    db: Session = Depends(get_db),
    skip: int = Query(0, description="跳过的记录数"),
    limit: int = Query(100, description="返回的记录数"),
    title: Optional[str] = Query(None, description="按标题搜索"),
    author: Optional[str] = Query(None, description="按作者搜索"),
    category: Optional[str] = Query(None, description="按分类筛选"),
    available_only: bool = Query(False, description="只显示有可用副本的图书"),
    current_user: User = Depends(check_permission(Permission.READ_BOOK)),
) -> Any:
    """
    获取图书列表，支持搜索和筛选
    """
    if title:
        books = crud_book.get_by_title(db, title=title)
    elif author:
        books = crud_book.get_by_author(db, author=author)
    elif category:
        books = crud_book.get_by_category(db, category=category)
    elif available_only:
        books = crud_book.get_available_books(db, skip=skip, limit=limit)
    else:
        books = crud_book.get_multi(db, skip=skip, limit=limit)
    return books


@router.post("/", response_model=Book)
def create_book(
    *,
    db: Session = Depends(get_db),
    book_in: BookCreate,
    current_user: User = Depends(check_permission(Permission.CREATE_BOOK)),
) -> Any:
    """
    创建新图书
    """
    book = crud_book.get_by_isbn(db, isbn=book_in.isbn)
    if book:
        raise HTTPException(
            status_code=400,
            detail="该ISBN已存在",
        )
    book = crud_book.create(db, obj_in=book_in)
    return book


@router.get("/{book_id}", response_model=Book)
def read_book(
    *,
    db: Session = Depends(get_db),
    book_id: int = Path(..., description="图书ID"),
    current_user: User = Depends(check_permission(Permission.READ_BOOK)),
) -> Any:
    """
    通过ID获取图书详情
    """
    book = crud_book.get(db, id=book_id)
    if not book:
        raise HTTPException(
            status_code=404,
            detail="图书不存在",
        )
    return book


@router.put("/{book_id}", response_model=Book)
def update_book(
    *,
    db: Session = Depends(get_db),
    book_id: int = Path(..., description="图书ID"),
    book_in: BookUpdate,
    current_user: User = Depends(check_permission(Permission.UPDATE_BOOK)),
) -> Any:
    """
    更新图书信息
    """
    book = crud_book.get(db, id=book_id)
    if not book:
        raise HTTPException(
            status_code=404,
            detail="图书不存在",
        )
    book = crud_book.update(db, db_obj=book, obj_in=book_in)
    return book


@router.delete("/{book_id}", response_model=Book)
def delete_book(
    *,
    db: Session = Depends(get_db),
    book_id: int = Path(..., description="图书ID"),
    current_user: User = Depends(check_permission(Permission.DELETE_BOOK)),
) -> Any:
    """
    删除图书
    """
    book = crud_book.get(db, id=book_id)
    if not book:
        raise HTTPException(
            status_code=404,
            detail="图书不存在",
        )
    book = crud_book.remove(db, id=book_id)
    return book 