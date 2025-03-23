import React, { useEffect } from 'react';

const HomePage = () => {
  useEffect(() => {
    // 检查是否需要滚动到特定元素
    const scrollToElementId = sessionStorage.getItem('scrollToElement');
    if (scrollToElementId) {
      // 给DOM一些时间完成渲染
      setTimeout(() => {
        const element = document.getElementById(scrollToElementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        // 清除存储的ID，防止再次加载页面时重复滚动
        sessionStorage.removeItem('scrollToElement');
      }, 100);
    }
  }, []);

  return (
    // ... 组件JSX ...
  );
};

export default HomePage; 