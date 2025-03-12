from fastapi import APIRouter

from app.api.v1.endpoints import auth, users, books, borrow

api_router = APIRouter()

# 添加各个端点路由
api_router.include_router(auth.router, prefix="/auth", tags=["认证"])
api_router.include_router(users.router, prefix="/users", tags=["用户"])
api_router.include_router(books.router, prefix="/books", tags=["图书"])
api_router.include_router(borrow.router, prefix="/borrow", tags=["借阅"]) 