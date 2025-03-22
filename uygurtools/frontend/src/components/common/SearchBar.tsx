import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;

const SearchBar: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto my-6 px-4">
      <Search
        placeholder="搜索AI工具、功能、教程..."
        enterButton={
          <div className="flex items-center">
            <SearchOutlined />
            <span className="ml-1">搜索</span>
          </div>
        }
        size="large"
        className="rounded-full shadow-md"
        onSearch={value => console.log(value)}
      />
    </div>
  );
};

export default SearchBar; 