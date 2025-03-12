from typing import Any, List, Optional

from fastapi import APIRouter, Depends, HTTPException, Path, Query
from sqlalchemy.orm import Session

from app.api.deps import get_current_active_user, get_db
from app.core.permissions import Permission, check_permission, is_admin_or_super_admin
from app.crud.crud_book import book as crud_book
from app.crud.crud_borrow import borrow_record as crud_borrow
from app.crud.crud_user import user as crud_user
from app.models.user import User
from app.schemas.borrow import BorrowRecord, BorrowRecordCreate, BorrowRecordUpdate

router = APIRouter()


@router.get("/", response_model=List[BorrowRecord])
def read_borrow_records(
    db: Session = Depends(get_db),
    skip: int = Query(0, description="跳过的记录数"),
    limit: int = Query(100, description="返回的记录数"),
    user_id: Optional[int] = Query(None, description="按用户ID筛选"),
    book_id: Optional[int] = Query(None, description="按图书ID筛选"),
    active_only: bool = Query(False, description="只显示未归还的记录"),
    overdue_only: bool = Query(False, description="只显示逾期的记录"),
    current_user: User = Depends(check_permission(Permission.READ_BORROW)),
) -> Any:
    """
    获取借阅记录列表，支持筛选
    """
    # 普通读者只能查看自己的借阅记录
    if current_user.role == "reader":
        user_id = current_user.id
    
    if overdue_only:
        records = crud_borrow.get_overdue(db)
    elif user_id and active_only:
        records = crud_borrow.get_active_by_user(db, user_id=user_id)
    elif user_id:
        records = crud_borrow.get_by_user(db, user_id=user_id)
    elif book_id:
        records = crud_borrow.get_by_book(db, book_id=book_id)
    else:
        records = crud_borrow.get_multi(db, skip=skip, limit=limit)
    return records


@router.post("/", response_model=BorrowRecord)
def create_borrow_record(
    *,
    db: Session = Depends(get_db),
    borrow_in: BorrowRecordCreate,
    current_user: User = Depends(check_permission(Permission.CREATE_BORROW)),
) -> Any:
    """
    创建借阅记录（借书）
    """
    # 普通读者只能为自己借书
    if current_user.role == "reader" and borrow_in.user_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="您只能为自己借书",
        )
    
    # 检查用户是否存在
    user = crud_user.get(db, id=borrow_in.user_id)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="用户不存在",
        )
    
    # 检查图书是否存在
    book = crud_book.get(db, id=borrow_in.book_id)
    if not book:
        raise HTTPException(
            status_code=404,
            detail="图书不存在",
        )
    
    # 检查图书是否有可用副本
    if book.available_copies <= 0:
        raise HTTPException(
            status_code=400,
            detail="该图书已无可用副本",
        )
    
    # 创建借阅记录
    borrow_record = crud_borrow.create(db, obj_in=borrow_in)
    return borrow_record


@router.get("/{borrow_id}", response_model=BorrowRecord)
def read_borrow_record(
    *,
    db: Session = Depends(get_db),
    borrow_id: int = Path(..., description="借阅记录ID"),
    current_user: User = Depends(check_permission(Permission.READ_BORROW)),
) -> Any:
    """
    通过ID获取借阅记录详情
    """
    borrow_record = crud_borrow.get(db, id=borrow_id)
    if not borrow_record:
        raise HTTPException(
            status_code=404,
            detail="借阅记录不存在",
        )
    
    # 普通读者只能查看自己的借阅记录
    if current_user.role == "reader" and borrow_record.user_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="您无权查看此借阅记录",
        )
    
    return borrow_record


@router.put("/{borrow_id}", response_model=BorrowRecord)
def update_borrow_record(
    *,
    db: Session = Depends(get_db),
    borrow_id: int = Path(..., description="借阅记录ID"),
    borrow_in: BorrowRecordUpdate,
    current_user: User = Depends(check_permission(Permission.UPDATE_BORROW)),
) -> Any:
    """
    更新借阅记录
    """
    borrow_record = crud_borrow.get(db, id=borrow_id)
    if not borrow_record:
        raise HTTPException(
            status_code=404,
            detail="借阅记录不存在",
        )
    
    borrow_record = crud_borrow.update(db, db_obj=borrow_record, obj_in=borrow_in)
    return borrow_record


@router.post("/{borrow_id}/return", response_model=BorrowRecord)
def return_book(
    *,
    db: Session = Depends(get_db),
    borrow_id: int = Path(..., description="借阅记录ID"),
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    归还图书
    """
    borrow_record = crud_borrow.get(db, id=borrow_id)
    if not borrow_record:
        raise HTTPException(
            status_code=404,
            detail="借阅记录不存在",
        )
    
    # 普通读者只能归还自己借的书
    if current_user.role == "reader" and borrow_record.user_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="您无权归还此图书",
        )
    
    # 检查图书是否已归还
    if borrow_record.is_returned:
        raise HTTPException(
            status_code=400,
            detail="该图书已归还",
        )
    
    # 归还图书
    borrow_record = crud_borrow.return_book(db, borrow_id=borrow_id)
    return borrow_record


@router.delete("/{borrow_id}", response_model=BorrowRecord)
def delete_borrow_record(
    *,
    db: Session = Depends(get_db),
    borrow_id: int = Path(..., description="借阅记录ID"),
    current_user: User = Depends(check_permission(Permission.DELETE_BORROW)),
) -> Any:
    """
    删除借阅记录
    """
    borrow_record = crud_borrow.get(db, id=borrow_id)
    if not borrow_record:
        raise HTTPException(
            status_code=404,
            detail="借阅记录不存在",
        )
    
    # 如果图书未归还，需要更新图书可用副本数量
    if not borrow_record.is_returned:
        crud_book.update_available_copies(db, book_id=borrow_record.book_id, change=1)
    
    borrow_record = crud_borrow.remove(db, id=borrow_id)
    return borrow_record 