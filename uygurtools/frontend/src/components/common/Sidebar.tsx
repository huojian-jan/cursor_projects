import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { categories } from '../../data/toolsData';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Function to get icon based on category id
  const getCategoryIcon = (categoryId: string) => {
    // Simple solution with inline icons until you set up the iconfont
    const iconMap: Record<string, React.ReactNode> = {
      'audio-tools': <span style={{ marginRight: '8px', fontSize: '19px' }}>🎵</span>,
      'resume-tools': <span style={{ marginRight: '8px', fontSize: '19px' }}>📄</span>,
      'photo-tools': <span style={{ marginRight: '8px', fontSize: '19px' }}>🖼️</span>,
      'doc-convert-tools': <span style={{ marginRight: '8px', fontSize: '19px' }}>📑</span>,
      // Add more mappings as needed
      default: <span style={{ marginRight: '8px', fontSize: '19px' }}>🔧</span>
    };
    
    return iconMap[categoryId] || iconMap.default;
  };
  
  // 检查是否有需要滚动到的元素ID (从会话存储中获取)
  useEffect(() => {
    const scrollToElement = sessionStorage.getItem('scrollToElement');
    if (scrollToElement && location.pathname === '/') {
      // 清除存储
      sessionStorage.removeItem('scrollToElement');
      
      // 添加一点延迟确保DOM已完全加载
      setTimeout(() => {
        const element = document.getElementById(scrollToElement);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  }, [location.pathname]);

  const handleCategoryClick = (categoryId: string, e: React.MouseEvent) => {
    e.preventDefault();
    
    if (location.pathname === '/') {
      // 在首页直接滚动
      const element = document.getElementById(categoryId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // 不在首页时，导航到首页并设置会话存储
      sessionStorage.setItem('scrollToElement', categoryId);
      navigate('/'); // 使用React Router的导航
    }
  };

  return (
    <Sider
      width={200}
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      className="bg-white shadow-sm overflow-auto h-screen sticky top-0 transition-all duration-300 flex flex-col"
      breakpoint="lg"
      collapsedWidth={80}
      trigger={null}
    >
      <div className="flex flex-col h-full">
        
        <div className="flex-grow overflow-auto">
          <Menu mode="inline" className="border-r-0" defaultSelectedKeys={['audio-tools']}>
            {categories.map(category => (
              <Menu.Item key={category.id} icon={getCategoryIcon(category.id)}>
                <a href={`#${category.id}`} onClick={(e) => handleCategoryClick(category.id, e)}>
                  {category.title}
                </a>
              </Menu.Item>
            ))}
          </Menu>
        </div>
        
        {/* 底部折叠按钮 - 移除边框和背景色 */}
        <div className="py-4 flex justify-center">
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-500 hover:text-blue-500 transition-colors"
            title={collapsed ? "展开菜单" : "收起菜单"}
          >
            {collapsed ? 
              <MenuUnfoldOutlined style={{ fontSize: '20px' }} /> : 
              <MenuFoldOutlined style={{ fontSize: '20px' }} />
            }
          </button>
        </div>
      </div>
    </Sider>
  );
};

export default Sidebar; 