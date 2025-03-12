from enum import Enum
from typing import List, Optional

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.core.config import settings
from app.db.session import get_db
from app.models.user import User, UserRole

oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_STR}/auth/login")


class Permission(str, Enum):
    # 用户管理权限
    CREATE_USER = "create_user"
    READ_USER = "read_user"
    UPDATE_USER = "update_user"
    DELETE_USER = "delete_user"
    
    # 图书管理权限
    CREATE_BOOK = "create_book"
    READ_BOOK = "read_book"
    UPDATE_BOOK = "update_book"
    DELETE_BOOK = "delete_book"
    
    # 借阅管理权限
    CREATE_BORROW = "create_borrow"
    READ_BORROW = "read_borrow"
    UPDATE_BORROW = "update_borrow"
    DELETE_BORROW = "delete_borrow"
    
    # 系统管理权限
    MANAGE_SYSTEM = "manage_system"


# 定义每个角色拥有的权限
ROLE_PERMISSIONS = {
    UserRole.SUPER_ADMIN: [p for p in Permission],  # 超级管理员拥有所有权限
    UserRole.ADMIN: [
        # 用户管理权限（有限）
        Permission.READ_USER,
        
        # 图书管理权限（全部）
        Permission.CREATE_BOOK,
        Permission.READ_BOOK,
        Permission.UPDATE_BOOK,
        Permission.DELETE_BOOK,
        
        # 借阅管理权限（全部）
        Permission.CREATE_BORROW,
        Permission.READ_BORROW,
        Permission.UPDATE_BORROW,
        Permission.DELETE_BORROW,
    ],
    UserRole.READER: [
        # 只能读取图书信息
        Permission.READ_BOOK,
        
        # 只能读取自己的借阅记录
        Permission.READ_BORROW,
        
        # 可以创建借阅（借书）
        Permission.CREATE_BORROW,
    ]
}


class TokenData(BaseModel):
    username: Optional[str] = None


def get_current_user(
    db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)
) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=["HS256"]
        )
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    
    user = db.query(User).filter(User.username == token_data.username).first()
    if user is None:
        raise credentials_exception
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Inactive user"
        )
    return user


def get_current_active_user(current_user: User = Depends(get_current_user)) -> User:
    if not current_user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Inactive user"
        )
    return current_user


def check_permission(required_permission: Permission):
    """检查用户是否拥有特定权限的依赖项"""
    
    def permission_checker(current_user: User = Depends(get_current_user)) -> User:
        user_permissions = ROLE_PERMISSIONS.get(current_user.role, [])
        if required_permission not in user_permissions:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Permission denied: {required_permission} is required",
            )
        return current_user
    
    return permission_checker


def check_permissions(required_permissions: List[Permission]):
    """检查用户是否拥有多个权限的依赖项"""
    
    def permissions_checker(current_user: User = Depends(get_current_user)) -> User:
        user_permissions = ROLE_PERMISSIONS.get(current_user.role, [])
        missing_permissions = [
            p for p in required_permissions if p not in user_permissions
        ]
        if missing_permissions:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Permissions denied: {', '.join(missing_permissions)} are required",
            )
        return current_user
    
    return permissions_checker


def is_super_admin(current_user: User = Depends(get_current_user)) -> User:
    """检查用户是否为超级管理员的依赖项"""
    if current_user.role != UserRole.SUPER_ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Super admin privileges required",
        )
    return current_user


def is_admin_or_super_admin(current_user: User = Depends(get_current_user)) -> User:
    """检查用户是否为管理员或超级管理员的依赖项"""
    if current_user.role not in [UserRole.ADMIN, UserRole.SUPER_ADMIN]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin privileges required",
        )
    return current_user 