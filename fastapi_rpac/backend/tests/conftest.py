import os
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from fastapi.testclient import TestClient
from typing import Generator, Dict, Any

from app.main import app
from app.db.base import Base
from app.db.session import get_db
from app.core.config import settings
from app.core.security import get_password_hash
from app.models.user import User, UserRole


# 设置测试数据库
@pytest.fixture(scope="session")
def db_engine():
    # 确保我们使用测试数据库
    settings.TESTING = True
    
    # 创建测试数据库引擎
    engine = create_engine(settings.TEST_SQLALCHEMY_DATABASE_URI)
    
    # 创建所有表
    Base.metadata.create_all(bind=engine)
    
    yield engine
    
    # 测试结束后删除所有表
    Base.metadata.drop_all(bind=engine)


@pytest.fixture(scope="function")
def db_session(db_engine):
    # 创建新的会话
    connection = db_engine.connect()
    transaction = connection.begin()
    
    # 绑定会话到事务
    TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=connection)
    session = TestingSessionLocal()
    
    yield session
    
    # 测试结束后回滚事务
    session.close()
    transaction.rollback()
    connection.close()


@pytest.fixture(scope="function")
def client(db_session) -> Generator:
    # 覆盖依赖项
    def override_get_db():
        try:
            yield db_session
        finally:
            pass
    
    app.dependency_overrides[get_db] = override_get_db
    
    with TestClient(app) as test_client:
        yield test_client
    
    # 清除依赖项覆盖
    app.dependency_overrides.clear()


@pytest.fixture(scope="function")
def super_admin_user(db_session) -> User:
    # 创建超级管理员用户
    user = User(
        email="superadmin@example.com",
        username="superadmin",
        hashed_password=get_password_hash("password"),
        full_name="Super Admin",
        role=UserRole.SUPER_ADMIN,
        is_active=True
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    return user


@pytest.fixture(scope="function")
def admin_user(db_session) -> User:
    # 创建管理员用户
    user = User(
        email="admin@example.com",
        username="admin",
        hashed_password=get_password_hash("password"),
        full_name="Admin User",
        role=UserRole.ADMIN,
        is_active=True
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    return user


@pytest.fixture(scope="function")
def reader_user(db_session) -> User:
    # 创建读者用户
    user = User(
        email="reader@example.com",
        username="reader",
        hashed_password=get_password_hash("password"),
        full_name="Reader User",
        role=UserRole.READER,
        is_active=True
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    return user 