import React from 'react';
import { Typography } from 'antd';
import SearchBar from '../components/common/SearchBar';
import AdCarousel from '../components/home/AdCarousel';
import ToolCategory from '../components/home/ToolCategory';
import { categories } from '../data/toolsData';

const { Title, Paragraph } = Typography;

const HomePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center py-8">
        <Title level={1} className="text-3xl font-bold">
          一站式AI工具集合平台
        </Title>
        <Paragraph className="text-gray-600 mt-2 mb-6 text-lg">
          1000+ AI工具合集，国内外AI工具导航大全
        </Paragraph>
      </div>

      <SearchBar />
      <AdCarousel />

      {categories.map(category => (
        <ToolCategory key={category.id} category={category} />
      ))}
    </div>
  );
};

export default HomePage; 