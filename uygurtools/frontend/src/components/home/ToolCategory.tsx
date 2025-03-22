import React from 'react';
import { Row, Col, Typography } from 'antd';
import ToolCard from './ToolCard';
import { Category } from '../../types';

const { Title } = Typography;

interface ToolCategoryProps {
  category: Category;
}

const ToolCategory: React.FC<ToolCategoryProps> = ({ category }) => {
  return (
    <div id={category.id} className="mb-12 scroll-mt-16">
      <div className="flex items-center justify-between mb-4 pb-2 border-b">
        <Title level={2} className="m-0 text-xl font-bold">
          {category.title}
        </Title>
      </div>
      <Row gutter={[16, 16]}>
        {category.tools.map(tool => (
          <Col xs={24} sm={12} md={8} key={tool.id}>
            <ToolCard tool={tool} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ToolCategory; 