import logging
from sqlalchemy.orm import Session

from app.crud.crud_user import user as crud_user
from app.schemas.user import UserCreate
from app.db.base import Base
from app.db.session import engine
from app.core.config import settings
from app.models.user import UserRole

logger = logging.getLogger(__name__)


def init_db(db: Session) -> None:
    """
    初始化数据库
    """
    # 创建所有表
    Base.metadata.create_all(bind=engine)
    
    # 创建超级管理员用户
    super_admin = crud_user.get_by_username(db, username="superadmin")
    if not super_admin:
        user_in = UserCreate(
            email="superadmin@example.com",
            username="superadmin",
            password="password",
            full_name="Super Admin",
            role=UserRole.SUPER_ADMIN,
        )
        super_admin = crud_user.create(db, obj_in=user_in)
        logger.info("超级管理员用户已创建")
    
    # 创建管理员用户
    admin = crud_user.get_by_username(db, username="admin")
    if not admin:
        user_in = UserCreate(
            email="admin@example.com",
            username="admin",
            password="password",
            full_name="Admin User",
            role=UserRole.ADMIN,
        )
        admin = crud_user.create(db, obj_in=user_in)
        logger.info("管理员用户已创建")
    
    # 创建读者用户
    reader = crud_user.get_by_username(db, username="reader")
    if not reader:
        user_in = UserCreate(
            email="reader@example.com",
            username="reader",
            password="password",
            full_name="Reader User",
            role=UserRole.READER,
        )
        reader = crud_user.create(db, obj_in=user_in)
        logger.info("读者用户已创建") 