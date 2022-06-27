import {
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import MainRoute from '../Routes/MainRoute';
const { Header, Sider, Content } = Layout;

const routeData = [
  {
    id: 1,
    name: 'DashBoard',
    pathName: '/',
  },
  {
    id: 2,
    name: 'Product Entry',
    pathName: '/ProductionEntry',
  }
]

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  // const history = use
  return (
    <Layout style={{
      height: '100Vh'
    }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme='dark'
          mode="inline"
          defaultSelectedKeys={['1']}
        >
          {
            routeData.map(e => (
              <Menu.Item>
                <NavLink to={e.pathName}>
                  <UserOutlined />
                  <span>{e.name}</span>
                </NavLink>

              </Menu.Item>
            ))
          }



        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <MainRoute />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;