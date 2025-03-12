import pytest
from fastapi import HTTPException

from app.core.permissions import (
    Permission, 
    ROLE_PERMISSIONS, 
    check_permission, 
    check_permissions,
    is_super_admin,
    is_admin_or_super_admin
)
from app.models.user import UserRole


def test_role_permissions_structure():
    """测试角色权限结构"""
    # 超级管理员应该拥有所有权限
    assert len(ROLE_PERMISSIONS[UserRole.SUPER_ADMIN]) == len(list(Permission))
    
    # 管理员应该拥有部分权限
    admin_permissions = ROLE_PERMISSIONS[UserRole.ADMIN]
    assert Permission.READ_USER in admin_permissions
    assert Permission.CREATE_BOOK in admin_permissions
    assert Permission.READ_BOOK in admin_permissions
    assert Permission.UPDATE_BOOK in admin_permissions
    assert Permission.DELETE_BOOK in admin_permissions
    assert Permission.CREATE_BORROW in admin_permissions
    assert Permission.READ_BORROW in admin_permissions
    assert Permission.UPDATE_BORROW in admin_permissions
    assert Permission.DELETE_BORROW in admin_permissions
    
    # 管理员不应该拥有某些权限
    assert Permission.CREATE_USER not in admin_permissions
    assert Permission.UPDATE_USER not in admin_permissions
    assert Permission.DELETE_USER not in admin_permissions
    assert Permission.MANAGE_SYSTEM not in admin_permissions
    
    # 读者应该拥有有限的权限
    reader_permissions = ROLE_PERMISSIONS[UserRole.READER]
    assert Permission.READ_BOOK in reader_permissions
    assert Permission.READ_BORROW in reader_permissions
    assert Permission.CREATE_BORROW in reader_permissions
    
    # 读者不应该拥有某些权限
    assert Permission.CREATE_USER not in reader_permissions
    assert Permission.READ_USER not in reader_permissions
    assert Permission.UPDATE_USER not in reader_permissions
    assert Permission.DELETE_USER not in reader_permissions
    assert Permission.CREATE_BOOK not in reader_permissions
    assert Permission.UPDATE_BOOK not in reader_permissions
    assert Permission.DELETE_BOOK not in reader_permissions
    assert Permission.UPDATE_BORROW not in reader_permissions
    assert Permission.DELETE_BORROW not in reader_permissions
    assert Permission.MANAGE_SYSTEM not in reader_permissions


def test_check_permission_super_admin(super_admin_user):
    """测试超级管理员的权限检查"""
    # 超级管理员应该通过所有权限检查
    for permission in Permission:
        permission_checker = check_permission(permission)
        # 不应该引发异常
        assert permission_checker(super_admin_user) == super_admin_user


def test_check_permission_admin(admin_user):
    """测试管理员的权限检查"""
    # 管理员应该通过其拥有的权限检查
    for permission in ROLE_PERMISSIONS[UserRole.ADMIN]:
        permission_checker = check_permission(permission)
        # 不应该引发异常
        assert permission_checker(admin_user) == admin_user
    
    # 管理员不应该通过其没有的权限检查
    for permission in [p for p in Permission if p not in ROLE_PERMISSIONS[UserRole.ADMIN]]:
        permission_checker = check_permission(permission)
        # 应该引发HTTP 403异常
        with pytest.raises(HTTPException) as excinfo:
            permission_checker(admin_user)
        assert excinfo.value.status_code == 403


def test_check_permission_reader(reader_user):
    """测试读者的权限检查"""
    # 读者应该通过其拥有的权限检查
    for permission in ROLE_PERMISSIONS[UserRole.READER]:
        permission_checker = check_permission(permission)
        # 不应该引发异常
        assert permission_checker(reader_user) == reader_user
    
    # 读者不应该通过其没有的权限检查
    for permission in [p for p in Permission if p not in ROLE_PERMISSIONS[UserRole.READER]]:
        permission_checker = check_permission(permission)
        # 应该引发HTTP 403异常
        with pytest.raises(HTTPException) as excinfo:
            permission_checker(reader_user)
        assert excinfo.value.status_code == 403


def test_check_permissions_super_admin(super_admin_user):
    """测试超级管理员的多权限检查"""
    # 超级管理员应该通过所有权限组合的检查
    permissions_checker = check_permissions([
        Permission.CREATE_USER,
        Permission.READ_BOOK,
        Permission.MANAGE_SYSTEM
    ])
    # 不应该引发异常
    assert permissions_checker(super_admin_user) == super_admin_user


def test_check_permissions_admin(admin_user):
    """测试管理员的多权限检查"""
    # 管理员应该通过其拥有的权限组合的检查
    permissions_checker = check_permissions([
        Permission.READ_USER,
        Permission.READ_BOOK,
        Permission.UPDATE_BOOK
    ])
    # 不应该引发异常
    assert permissions_checker(admin_user) == admin_user
    
    # 管理员不应该通过包含其没有的权限的组合检查
    permissions_checker = check_permissions([
        Permission.READ_USER,  # 有这个权限
        Permission.CREATE_USER,  # 没有这个权限
        Permission.READ_BOOK  # 有这个权限
    ])
    # 应该引发HTTP 403异常
    with pytest.raises(HTTPException) as excinfo:
        permissions_checker(admin_user)
    assert excinfo.value.status_code == 403


def test_is_super_admin(super_admin_user, admin_user, reader_user):
    """测试超级管理员检查"""
    # 超级管理员应该通过检查
    assert is_super_admin(super_admin_user) == super_admin_user
    
    # 管理员不应该通过检查
    with pytest.raises(HTTPException) as excinfo:
        is_super_admin(admin_user)
    assert excinfo.value.status_code == 403
    
    # 读者不应该通过检查
    with pytest.raises(HTTPException) as excinfo:
        is_super_admin(reader_user)
    assert excinfo.value.status_code == 403


def test_is_admin_or_super_admin(super_admin_user, admin_user, reader_user):
    """测试管理员或超级管理员检查"""
    # 超级管理员应该通过检查
    assert is_admin_or_super_admin(super_admin_user) == super_admin_user
    
    # 管理员应该通过检查
    assert is_admin_or_super_admin(admin_user) == admin_user
    
    # 读者不应该通过检查
    with pytest.raises(HTTPException) as excinfo:
        is_admin_or_super_admin(reader_user)
    assert excinfo.value.status_code == 403 