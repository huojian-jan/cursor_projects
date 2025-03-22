import React from 'react';
import { Layout } from 'antd';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

const MainLayout: React.FC = () => {
  return (
    <Layout>
      <Header />
      <Layout>
        <Sidebar />
        <Content className="min-h-screen bg-gray-50 p-6">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout; 