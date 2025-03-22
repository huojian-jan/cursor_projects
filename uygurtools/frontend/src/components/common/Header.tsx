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
        
        {/* 用户菜单 */}
        <UserMenu username="张三" />
      </div>
    </AntHeader>
  );
};

export default Header; 