import React, { useState, useEffect } from 'react';
import { Layout, Button, Space } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import LoginDialog from '../auth/LoginDialog';
import RegisterDialog from '../auth/RegisterDialog';
import ForgotPasswordDialog from '../auth/ForgotPasswordDialog';
import UserAvatar from '../user/UserAvatar';
import { getCurrentUser, User } from '../../utils/auth';

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // 控制登录和注册对话框的显示
  const [loginVisible, setLoginVisible] = useState(false);
  const [registerVisible, setRegisterVisible] = useState(false);
  
  // 添加状态保存当前登录用户信息
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // 控制忘记密码对话框显示
  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);
  
  // 组件挂载时检查是否已登录
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);
  
  // 确定当前选中的菜单项
  const getSelectedKey = () => {
    if (currentPath === '/') return '1';
    if (currentPath.includes('/tool/')) return '2';
    if (currentPath === '/about') return '3';
    if (currentPath === '/contact') return '4';
    return '1';
  };

  const handleLanguageChange = (lang: string) => {
    console.log(`Language changed to: ${lang}`);
    // 这里可以添加实际的语言切换逻辑
  };

  // 打开登录对话框
  const handleLogin = () => {
    setLoginVisible(true);
  };

  // 打开注册对话框
  const handleRegister = () => {
    setRegisterVisible(true);
  };
  
  // 从登录切换到注册
  const switchToRegister = () => {
    setLoginVisible(false);
    setRegisterVisible(true);
  };
  
  // 从注册切换到登录
  const switchToLogin = () => {
    setRegisterVisible(false);
    setLoginVisible(true);
  };
  
  // 从登录切换到忘记密码
  const switchToForgotPassword = () => {
    setLoginVisible(false);
    setForgotPasswordVisible(true);
  };
  
  // 处理登录成功
  const handleLoginSuccess = () => {
    // 重新获取用户信息并更新状态
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  };
  
  // 处理注册成功
  const handleRegisterSuccess = () => {
    // 可以直接切换到登录对话框
    switchToLogin();
  };
  
  // 处理登出
  const handleLogout = () => {
    setCurrentUser(null);
  };

  // 自定义按钮样式
  const buttonStyle = {
    transition: 'all 0.3s',
    fontWeight: 'normal'
  };

  return (
    <>
      <AntHeader className="bg-gray-50 px-6 flex items-center shadow-sm">
        {/* 左侧Logo区域 */}
        <div className="flex-none">
          <Link to="/" className="flex items-center">
            <img src="/resource/images/sheep.png" alt="AI工具集" className="h-10" />
            <span className="text-xl font-bold ml-2 text-gray-800">AI工具集</span>
          </Link>
        </div>
        
        {/* 中间标语区域 */}
        <div className="flex-grow flex justify-center">
          <h1 className="text-3xl font-extrabold text-gray-700">发现优质AI工具，提升工作效率</h1>
        </div>
        
        {/* 右侧用户区域 */}
        <div className="flex-none flex items-center">
          {/* 语言切换按钮 */}
          <LanguageSwitcher 
            currentLanguage="zh"
            onLanguageChange={handleLanguageChange}
          />
          
          {/* 根据是否登录显示不同的内容 */}
          {currentUser ? (
            <div className="ml-4">
              <UserAvatar user={currentUser} onLogout={handleLogout} />
            </div>
          ) : (
            <Space className="ml-4" size="small">
              <Button 
                type="text" 
                onClick={handleLogin}
                className="auth-button hover:text-blue-500 hover:bg-blue-50"
                style={buttonStyle}
              >
                登录
              </Button>
              <Button 
                type="text" 
                onClick={handleRegister}
                className="auth-button hover:text-blue-500 hover:bg-blue-50"
                style={buttonStyle}
              >
                注册
              </Button>
            </Space>
          )}
        </div>
      </AntHeader>
      
      {/* 登录对话框 */}
      <LoginDialog 
        visible={loginVisible} 
        onClose={() => setLoginVisible(false)} 
        onLoginSuccess={handleLoginSuccess}
        onSwitchToRegister={switchToRegister}
        onSwitchToForgotPassword={switchToForgotPassword}
      />
      
      {/* 注册对话框 */}
      <RegisterDialog
        visible={registerVisible}
        onClose={() => setRegisterVisible(false)}
        onRegisterSuccess={handleRegisterSuccess}
        onSwitchToLogin={switchToLogin}
      />
      
      {/* 忘记密码对话框 */}
      <ForgotPasswordDialog
        visible={forgotPasswordVisible}
        onClose={() => setForgotPasswordVisible(false)}
        onSwitchToLogin={switchToLogin}
      />
    </>
  );
};

export default Header; 