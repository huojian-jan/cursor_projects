import React from 'react';
import SearchBar from '../components/common/SearchBar';
import AdCarousel from '../components/home/AdCarousel';
import ToolCategory from '../components/home/ToolCategory';
import { categories } from '../data/toolsData';

const HomePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <SearchBar />
      <AdCarousel />

      {categories.map(category => (
        <ToolCategory key={category.id} category={category} />
      ))}
    </div>
  );
};

export default HomePage; 