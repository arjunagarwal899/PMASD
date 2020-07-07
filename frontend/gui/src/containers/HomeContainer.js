import React from 'react';
import Home from '../components/Home';
import './HomeContainer.css';

import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;

const HomeContainer = (props) => {
  return (
    <React.Fragment>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">Logout</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-content">
            <Home className="site-layout-content"/>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Copyright ©2020, PMASD
        </Footer>
      </Layout>
    </React.Fragment>
  );
};

export default HomeContainer;