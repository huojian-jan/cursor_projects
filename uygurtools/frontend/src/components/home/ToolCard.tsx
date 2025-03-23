import React from 'react';
import { Card } from 'antd';
import { StarFilled, UserOutlined } from '@ant-design/icons';
import { Tool } from '../../types';
import { Link } from 'react-router-dom';

interface ToolCardProps {
  tool: Tool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  // 使用工具中定义的path属性，如果存在的话
  const toolLink = tool.path ? tool.path : 
    tool.id === 'text-to-speech' 
      ? '/text-to-speech' 
      : tool.id === 'speech-to-text'
        ? '/speech-to-text'
        : tool.id === 'resume-templates'
          ? '/resume-templates'
          : tool.id === 'word-pdf-converter'
            ? '/word-pdf-converter'
            : tool.id === 'id-photo-maker'
              ? '/id-photo-maker'
            : tool.id === 'image-to-word'
              ? '/image-to-word'
              : `/tool/${tool.id}`;

  // 当工具ID为特殊工具时，链接到对应页面
  const getToolLink = (toolId: string): string => {
    if (toolId === "speech-to-text") {
      return "/tools/speech-to-text";
    } else if (toolId === "resume-templates") {
      return "/resume-templates";
    } else if (toolId === "word-pdf-converter") {
      return "/word-pdf-converter";
    } else if (toolId === "id-photo-maker") {
      return "/id-photo-maker";
    }
    // 处理其他工具的链接...
    return `/tool/${toolId}`;
  };

  const handleCardClick = () => {
    window.location.href = toolLink; // 使用原生导航方法
  };

  return (
    <Link to={toolLink}>
      <Card 
        hoverable 
        className="h-full shadow-sm hover:shadow-md transition-shadow duration-300"
        bodyStyle={{ padding: '16px' }}
      >
        <div className="flex items-center mb-2">
          <img src={tool.icon} alt={tool.name} className="w-8 h-8 mr-2" />
          <h3 className="text-base font-medium m-0">{tool.name}</h3>
        </div>
        <p className="text-sm text-gray-600 h-12 overflow-hidden mb-4">{tool.description}</p>
        <div className="flex items-center justify-between text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <div className="flex items-center">
              <span className="text-yellow-500 flex items-center">
                <StarFilled />
                <StarFilled />
                <StarFilled />
                <StarFilled />
                <StarFilled />
              </span>
              <span className="ml-1">{tool.rating}</span>
            </div>
            <div className="flex items-center text-gray-500">
              <UserOutlined className="mr-1" />
              <span>{tool.usageCount}</span>
            </div>
          </div>
          <span className="bg-blue-100 text-primary px-2 py-1 rounded-md">
            {tool.badge}
          </span>
        </div>
      </Card>
    </Link>
  );
};

export default ToolCard; 