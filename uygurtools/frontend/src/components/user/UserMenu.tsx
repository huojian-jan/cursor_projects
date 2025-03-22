import React from 'react';
import { Popover, Avatar, Button, Space, Divider } from 'antd';
import { 
  UserOutlined, 
  CreditCardOutlined, 
  LogoutOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

interface UserMenuProps {
  username?: string;
  avatarUrl?: string;
  email?: string;
}

const UserMenu: React.FC<UserMenuProps> = ({ 
  username = '用户名', 
  avatarUrl, 
  email = 'user@example.com' 
}) => {
  
  const content = (
    <div className="w-64">
      {/* 用户信息头部 */}
      <div className="flex items-center p-3 pb-4">
        <Avatar 
          size={48} 
          icon={<UserOutlined />} 
          src={avatarUrl}
          className="bg-blue-500"
        />
        <div className="ml-3">
          <div className="font-medium text-base">{username}</div>
          <div className="text-gray-500 text-sm">{email}</div>
        </div>
      </div>
      
      <Divider className="my-1" />
      
      {/* 菜单选项 */}
      <div className="py-1">
        <Link to="/profile">
          <Button 
            type="text" 
            icon={<UserOutlined />} 
            className="w-full text-left justify-start h-10 font-normal"
          >
            个人信息
          </Button>
        </Link>
        
        <Link to="/billing">
          <Button 
            type="text" 
            icon={<CreditCardOutlined />} 
            className="w-full text-left justify-start h-10 font-normal"
          >
            账单
          </Button>
        </Link>
        
        <Link to="/settings">
          <Button 
            type="text" 
            icon={<SettingOutlined />} 
            className="w-full text-left justify-start h-10 font-normal"
          >
            设置
          </Button>
        </Link>
      </div>
      
      <Divider className="my-1" />
      
      {/* 退出按钮 */}
      <div className="py-1">
        <Button 
          type="text" 
          danger
          icon={<LogoutOutlined />} 
          className="w-full text-left justify-start h-10 font-normal"
          onClick={() => console.log('logout')}
        >
          退出登录
        </Button>
      </div>
    </div>
  );

  return (
    <Popover 
      content={content} 
      trigger="hover" 
      placement="bottomRight"
      overlayClassName="user-popover"
      overlayInnerStyle={{ padding: 0, borderRadius: '8px' }}
    >
      <div className="user-menu-trigger flex items-center cursor-pointer">
        <Avatar 
          size="default" 
          icon={<UserOutlined />} 
          src={avatarUrl}
          className="bg-blue-500"
        />
        <span className="ml-2 text-gray-700">{username}</span>
      </div>
    </Popover>
  );
};

export default UserMenu; 