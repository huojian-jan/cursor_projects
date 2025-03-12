-- 创建测试数据库
CREATE DATABASE IF NOT EXISTS test_library;

-- 授予权限
GRANT ALL PRIVILEGES ON library.* TO 'library_user'@'%';
GRANT ALL PRIVILEGES ON test_library.* TO 'library_user'@'%';
FLUSH PRIVILEGES;

-- 使用库
USE library;

-- 创建初始超级管理员用户（密码为 'admin'，实际应用中应使用哈希值）
-- 注意：这里只是示例，实际应用中应该通过应用程序创建用户，以确保密码正确哈希
-- INSERT INTO user (email, username, hashed_password, full_name, role, is_active)
-- VALUES ('admin@example.com', 'admin', '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'Admin User', 'super_admin', 1); 