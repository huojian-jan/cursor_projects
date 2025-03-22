import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Typography, Breadcrumb, Card, Rate, Button } from 'antd';
import { ArrowLeftOutlined, UserOutlined } from '@ant-design/icons';
import { categories } from '../data/toolsData';

const { Title, Paragraph } = Typography;

const ToolDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // 特殊处理文字转语音工具 - 重定向到专门的页面
  if (id === 'text-to-speech') {
    return <Navigate to="/text-to-speech" replace />;
  }
  
  // 查找工具数据
  let tool;
  let category;
  
  for (const cat of categories) {
    const foundTool = cat.tools.find(t => t.id === id);
    if (foundTool) {
      tool = foundTool;
      category = cat;
      break;
    }
  }
  
  if (!tool) {
    return (
      <div className="text-center py-12">
        <Title level={3}>工具未找到</Title>
        <Link to="/">
          <Button type="primary" icon={<ArrowLeftOutlined />}>
            返回首页
          </Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <Breadcrumb className="mb-6">
        <Breadcrumb.Item>
          <Link to="/">首页</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/#${category?.id}`}>{category?.title}</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{tool.name}</Breadcrumb.Item>
      </Breadcrumb>
      
      <Card className="shadow-md">
        <div className="flex items-center mb-6">
          <img src={tool.icon} alt={tool.name} className="w-12 h-12 mr-4" />
          <div>
            <Title level={2} className="mb-0">{tool.name}</Title>
            <div className="flex items-center mt-2">
              <Rate disabled defaultValue={tool.rating} className="text-sm" />
              <span className="ml-2 text-gray-500">{tool.rating}</span>
              <span className="mx-4 text-gray-300">|</span>
              <span className="text-gray-500 flex items-center">
                <UserOutlined className="mr-1" />
                {tool.usageCount}
              </span>
            </div>
          </div>
        </div>
        
        <Paragraph className="text-lg mb-6">{tool.description}</Paragraph>
        
        <div className="flex justify-center">
          <Button type="primary" size="large" className="px-8">
            开始使用
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ToolDetailPage; 