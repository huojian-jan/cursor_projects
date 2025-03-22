import React from 'react';
import { Layout } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import UserMenu from '../user/UserMenu';
import LanguageSwitcher from './LanguageSwitcher';

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
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

  return (
    <AntHeader className="bg-gray-50 px-6 flex items-center justify-between shadow-sm">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <img src="/resource/images/logo.svg" alt="AI工具集" className="h-10" />
          <span className="text-xl font-bold ml-2 text-gray-800">AI工具集</span>
        </Link>
      </div>

      <div className="flex items-center">
        {/* 语言切换按钮 */}
        <LanguageSwitcher 
          currentLanguage="zh"
          onLanguageChange={handleLanguageChange}
        />
        
        {/* 用户菜单 */}
        <UserMenu username="张三" />
      </div>
    </AntHeader>
  );
};

export default Header; 