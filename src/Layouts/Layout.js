import {
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RouteData } from '../Helpers/NavMenuData';
import MainRoute from '../Routes/MainRoute';
import {TbLayoutSidebarLeftCollapse,TbLayoutSidebarRightCollapse} from 'react-icons/tb'
const { Header, Sider, Content } = Layout;



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
            RouteData.map(e => (
              <Menu.Item>
                <NavLink to={e.pathName}>
                  <e.icon style={{
                    fontSize: '20px'
                  }} />
                  {
                    collapsed ?
                      null :
                      <span style={{
                        marginLeft: "8px"
                      }}>{e.name}</span>

                  }

                </NavLink>

              </Menu.Item>
            ))
          }
            <Menu.Item 
         style={{
          backgroundColor:'#7EC8E3',
          fontSize:'28px',
          // paddingRight:'20px',
          textAlign:'center',
          // position: 'absolute',
          bottom: 0
        }}
         onClick={() => setCollapsed(!collapsed)}>
          {collapsed?<TbLayoutSidebarRightCollapse/>:<TbLayoutSidebarLeftCollapse />}
          
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: '90vh',
            overflowY: 'scroll',
            overflowX:'hidden'


          }}
        >
          <MainRoute />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;