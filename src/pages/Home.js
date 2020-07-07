import React from 'react';
import Layout from 'antd/es/layout';

import Appbar from '../components/Appbar';
import Sidebar from '../components/Sidebar';
import Content from '../components/Content';

const Home = () => {
  return (
    <Layout className="layout-content">
      <Appbar />
      <Layout className="layout-content">
        <Sidebar />
        <Content />
      </Layout>
    </Layout>
  );
};

export default Home;
