import React from 'react';
import { Dropdown, Menu, Button } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';

interface LanguageSwitcherProps {
  currentLanguage?: string;
  onLanguageChange?: (lang: string) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ 
  currentLanguage = 'zh', 
  onLanguageChange = () => {} 
}) => {
  const languages = [
    { code: 'zh', name: '中文' },
    { code: 'ug', name: 'ئۇيغۇرچە' }
  ];

  const handleLanguageSelect = (langCode: string) => {
    onLanguageChange(langCode);
  };

  const menu = (
    <Menu>
      {languages.map(lang => (
        <Menu.Item 
          key={lang.code} 
          onClick={() => handleLanguageSelect(lang.code)}
          className={currentLanguage === lang.code ? 'ant-dropdown-menu-item-active' : ''}
        >
          {lang.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="bottomCenter" trigger={['click']}>
      <Button 
        type="text"
        icon={<GlobalOutlined />} 
        className="flex items-center justify-center mr-4 hover:text-blue-500"
        size="middle"
      />
    </Dropdown>
  );
};

export default LanguageSwitcher; 