import React, { CSSProperties } from 'react';
import { Avatar, Popover, Button, Divider } from 'antd';
import { UserOutlined, LogoutOutlined, WalletOutlined, SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { User, logout } from '../../utils/auth';

interface UserAvatarProps {
  user: User;
  onLogout: () => void;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user, onLogout }) => {
  const handleLogout = () => {
    logout();
    onLogout();
  };

  // 定义自定义按钮样式 - 使用正确的类型
  const buttonStyle: CSSProperties = {
    textAlign: 'left',
    paddingLeft: 0,
    justifyContent: 'flex-start'
  };

  // 用户信息卡片内容 - 简化版本
  const userCardContent = (
    <div className="user-card" style={{ width: 160 }}>
      {/* 用户基本信息 */}
      <div className="flex items-center p-2">
        <Avatar 
          size={36} 
          src={user.avatar} 
          icon={!user.avatar && <UserOutlined />}
        />
        <div className="ml-2">
          <div className="font-medium text-sm">{user.username}</div>
        </div>
      </div>
      
      <Divider style={{ margin: '4px 0' }} />
      
      {/* 链接列表 - 强制左对齐 */}
      <div className="p-1 pl-2">
        <Link to="/profile" className="block">
          <Button type="text" size="small" icon={<UserOutlined />} className="w-full" style={buttonStyle}>
            个人中心
          </Button>
        </Link>
        <Link to="/wallet" className="block">
          <Button type="text" size="small" icon={<WalletOutlined />} className="w-full" style={buttonStyle}>
            我的账单
          </Button>
        </Link>
        <Link to="/settings" className="block">
          <Button type="text" size="small" icon={<SettingOutlined />} className="w-full" style={buttonStyle}>
            账户设置
          </Button>
        </Link>
        
        {/* 添加分隔线 */}
        <Divider style={{ margin: '4px 0', borderTop: '1px solid rgba(0, 0, 0, 0.06)' }} />
        
        <Button 
          danger 
          type="text" 
          size="small"
          icon={<LogoutOutlined />} 
          onClick={handleLogout} 
          className="w-full"
          style={buttonStyle}
        >
          退出登录
        </Button>
      </div>
    </div>
  );

  return (
    <Popover 
      content={userCardContent} 
      trigger="hover" 
      placement="bottomRight"
      overlayClassName="user-popover-compact"
      arrow={false}
    >
      <div className="cursor-pointer flex items-center">
        <Avatar 
          src={user.avatar} 
          icon={!user.avatar && <UserOutlined />}
          alt={user.username} 
          className="cursor-pointer"
        />
        <span className="ml-2 text-sm hidden sm:inline">{user.username}</span>
      </div>
    </Popover>
  );
};

export default UserAvatar; 