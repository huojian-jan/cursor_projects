from typing import Any, List

from fastapi import APIRouter, Body, Depends, HTTPException, Path, Query
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app.api.deps import get_current_active_superuser, get_current_active_user, get_db
from app.core.permissions import Permission, check_permission
from app.crud.crud_user import user as crud_user
from app.models.user import User
from app.schemas.user import User as UserSchema
from app.schemas.user import UserCreate, UserUpdate

router = APIRouter()


@router.get("/", response_model=List[UserSchema])
def read_users(
    db: Session = Depends(get_db),
    skip: int = Query(0, description="跳过的记录数"),
    limit: int = Query(100, description="返回的记录数"),
    current_user: User = Depends(check_permission(Permission.READ_USER)),
) -> Any:
    """
    获取所有用户
    """
    users = crud_user.get_multi(db, skip=skip, limit=limit)
    return users


@router.post("/", response_model=UserSchema)
def create_user(
    *,
    db: Session = Depends(get_db),
    user_in: UserCreate,
    current_user: User = Depends(check_permission(Permission.CREATE_USER)),
) -> Any:
    """
    创建新用户
    """
    user = crud_user.get_by_email(db, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="该邮箱已被注册",
        )
    user = crud_user.get_by_username(db, username=user_in.username)
    if user:
        raise HTTPException(
            status_code=400,
            detail="该用户名已被使用",
        )
    user = crud_user.create(db, obj_in=user_in)
    return user


@router.get("/me", response_model=UserSchema)
def read_user_me(
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    获取当前登录用户信息
    """
    return current_user


@router.put("/me", response_model=UserSchema)
def update_user_me(
    *,
    db: Session = Depends(get_db),
    full_name: str = Body(None),
    email: str = Body(None),
    password: str = Body(None),
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    更新当前登录用户信息
    """
    current_user_data = jsonable_encoder(current_user)
    user_in = UserUpdate(**current_user_data)
    if full_name is not None:
        user_in.full_name = full_name
    if email is not None:
        user_in.email = email
    if password is not None:
        user_in.password = password
    user = crud_user.update(db, db_obj=current_user, obj_in=user_in)
    return user


@router.get("/{user_id}", response_model=UserSchema)
def read_user_by_id(
    user_id: int = Path(..., description="用户ID"),
    current_user: User = Depends(check_permission(Permission.READ_USER)),
    db: Session = Depends(get_db),
) -> Any:
    """
    通过ID获取用户信息
    """
    user = crud_user.get(db, id=user_id)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="用户不存在",
        )
    return user


@router.put("/{user_id}", response_model=UserSchema)
def update_user(
    *,
    db: Session = Depends(get_db),
    user_id: int = Path(..., description="用户ID"),
    user_in: UserUpdate,
    current_user: User = Depends(check_permission(Permission.UPDATE_USER)),
) -> Any:
    """
    更新用户信息
    """
    user = crud_user.get(db, id=user_id)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="用户不存在",
        )
    user = crud_user.update(db, db_obj=user, obj_in=user_in)
    return user


@router.delete("/{user_id}", response_model=UserSchema)
def delete_user(
    *,
    db: Session = Depends(get_db),
    user_id: int = Path(..., description="用户ID"),
    current_user: User = Depends(check_permission(Permission.DELETE_USER)),
) -> Any:
    """
    删除用户
    """
    user = crud_user.get(db, id=user_id)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="用户不存在",
        )
    user = crud_user.remove(db, id=user_id)
    return user 