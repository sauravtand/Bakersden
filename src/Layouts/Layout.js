import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { RouteData } from "../Helpers/NavMenuData";
import MainRoute from "../Routes/MainRoute";
import Logo from "../Assets/images/logo.png";
import { FaUserAlt } from "react-icons/fa";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  // const history = use
  return (
    <MenuContainer>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            minHeight: "100vh",
          }}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <SideBarTop>
              <img src={Logo} />
            </SideBarTop>

            {RouteData.map((e) => (
              <Menu.Item key={e.id}>
                <NavLink
                  to={e.pathName}
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <e.icon
                    style={{
                      fontSize: "20px",
                    }}
                  />
                  {collapsed ? null : (
                    <span
                      style={{
                        marginLeft: "8px",
                      }}
                    >
                      {e.name}
                    </span>
                  )}
                </NavLink>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
              backgroundColor: "#fefefe",
              boxShadow: "1px 4px 16px #d6d2d2",
            }}
          >
            <HeaderComponent>
              <div>
                {React.createElement(
                  collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                  {
                    className: "trigger",
                    onClick: () => setCollapsed(!collapsed),
                  }
                )}
                <span className="title">Luniva Bakery Product Entry</span>
              </div>

              <div
                style={{
                  cursor: "pointer",
                }}
              >
                <FaUserAlt
                  style={{
                    color: "#3869c4fd",
                  }}
                />
                <span className="user">admin</span>
              </div>
            </HeaderComponent>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              // margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <MainRoute />
          </Content>
        </Layout>
      </Layout>
    </MenuContainer>
  );
};

export default MainLayout;

const MenuContainer = styled.div`
  .trigger {
    padding: 0 24px;
    font-size: 18px;
    line-height: 64px;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: #1890ff;
    }
    /* cursor: pointer; */
  }
`;

const SideBarTop = styled.div`
  /* height: 100px; */
  height: auto;
  width: 100%;
  padding: 8px;
  position: relative;
  margin-bottom: 8px;
  img {
    width: 100%;
  }
`;

const HeaderComponent = styled.div`
  display: flex;
  justify-content: space-between;
  .title {
    font-size: 24px;
    font-weight: 600;
    /* letter-spacing: 0.2rem; */
  }

  .user {
    font-size: 16px;
    font-weight: 600;
    margin: 0 24px 0px 8px;
    color: #3869c4fd;
  }
`;
