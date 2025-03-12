from typing import Optional

from pydantic import BaseModel, EmailStr, Field

from app.models.user import UserRole


# 共享属性
class UserBase(BaseModel):
    email: Optional[EmailStr] = None
    username: Optional[str] = None
    full_name: Optional[str] = None
    is_active: Optional[bool] = True
    role: Optional[UserRole] = None


# 创建用户时需要的属性
class UserCreate(UserBase):
    email: EmailStr
    username: str
    password: str
    role: UserRole = UserRole.READER


# 更新用户时可以更新的属性
class UserUpdate(UserBase):
    password: Optional[str] = None


# 数据库中存储的用户属性
class UserInDBBase(UserBase):
    id: int
    email: EmailStr
    username: str
    is_active: bool
    role: UserRole

    class Config:
        orm_mode = True
        from_attributes = True


# 返回给API的用户信息
class User(UserInDBBase):
    pass


# 数据库中存储的用户信息，包含哈希密码
class UserInDB(UserInDBBase):
    hashed_password: str 