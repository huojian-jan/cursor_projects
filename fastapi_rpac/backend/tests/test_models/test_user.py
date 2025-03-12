import pytest
from sqlalchemy.exc import IntegrityError

from app.models.user import User, UserRole


def test_create_user(db_session):
    """测试创建用户"""
    user = User(
        email="test@example.com",
        username="testuser",
        hashed_password="hashed_password",
        full_name="Test User",
        role=UserRole.READER,
        is_active=True
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    
    assert user.id is not None
    assert user.email == "test@example.com"
    assert user.username == "testuser"
    assert user.hashed_password == "hashed_password"
    assert user.full_name == "Test User"
    assert user.role == UserRole.READER
    assert user.is_active is True


def test_user_unique_email(db_session):
    """测试用户邮箱唯一性约束"""
    # 创建第一个用户
    user1 = User(
        email="duplicate@example.com",
        username="user1",
        hashed_password="hashed_password",
        full_name="User One",
        role=UserRole.READER
    )
    db_session.add(user1)
    db_session.commit()
    
    # 创建具有相同邮箱的第二个用户
    user2 = User(
        email="duplicate@example.com",
        username="user2",
        hashed_password="hashed_password",
        full_name="User Two",
        role=UserRole.READER
    )
    db_session.add(user2)
    
    # 应该引发完整性错误
    with pytest.raises(IntegrityError):
        db_session.commit()


def test_user_unique_username(db_session):
    """测试用户名唯一性约束"""
    # 创建第一个用户
    user1 = User(
        email="user1@example.com",
        username="duplicate",
        hashed_password="hashed_password",
        full_name="User One",
        role=UserRole.READER
    )
    db_session.add(user1)
    db_session.commit()
    
    # 创建具有相同用户名的第二个用户
    user2 = User(
        email="user2@example.com",
        username="duplicate",
        hashed_password="hashed_password",
        full_name="User Two",
        role=UserRole.READER
    )
    db_session.add(user2)
    
    # 应该引发完整性错误
    with pytest.raises(IntegrityError):
        db_session.commit()


def test_user_role_default(db_session):
    """测试用户角色默认值"""
    user = User(
        email="default@example.com",
        username="defaultuser",
        hashed_password="hashed_password",
        full_name="Default User"
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    
    assert user.role == UserRole.READER 