import React from 'react';
import SearchBar from '../components/common/SearchBar';
import AdCarousel from '../components/home/AdCarousel';
import ToolCategory from '../components/home/ToolCategory';
import { categories } from '../data/toolsData';
import ToolCard from '../components/home/ToolCard';

const HomePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <SearchBar />
      <AdCarousel />

      {categories.map(category => (
        <div id={category.id} key={category.id} className="mb-10">
          <h2 className="text-xl font-bold mb-4">{category.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.tools.map(tool => (
              <ToolCard
                key={tool.id}
                tool={tool}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage; 