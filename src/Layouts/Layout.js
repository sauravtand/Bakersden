import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Popover } from "antd";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { RouteDataAdmin } from "../Helpers/NavMenuData";
import MainRoute from "../Routes/MainRoute";
import Logo from "../Assets/images/logo.png";
import { FaUserAlt } from "react-icons/fa";
import useToken from "../Helpers/useToken";
import { useEffect } from "react";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [sideBarDataNew, setSideBarDataNew] = useState();
  // const history = use
  const { removeToken } = useToken();
  const localStorageUserData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    // console.log(localStorageUserData, "hello fromlocal storage");
    let sideBarData =
      localStorageUserData.userrole === 2
        ? RouteDataAdmin.slice(4, 5)
        : RouteDataAdmin;
    setSideBarDataNew(sideBarData);
  }, []);

  const content = (
    <div>
      <a
        onClick={() => {
          removeToken();
          localStorage.clear();
        }}
      >
        logout
      </a>
    </div>
  );

  return (
    <MenuContainer>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            minHeight: "100vh",
            position: "fixed",
            left: "0",
            top: "0",
          }}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["5"]}>
            <SideBarTop>
              <img src={Logo} />
            </SideBarTop>
            {sideBarDataNew?.map((e) => (
              <Menu.Item key={e.id} item={e.label}>
                <NavLink
                  to={e.pathName}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "8px",
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
                      {e.label}
                    </span>
                  )}
                </NavLink>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout className={collapsed ? "hundred" : "two-hundred"}>
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
                <span className="title">Baker's Den Pvt.Ltd</span>
              </div>

              <Popover
                // Content={}
                content={content}
                placement="bottom"
              >
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
                  <span className="user">{localStorageUserData?.userName}</span>
                </div>
              </Popover>
              {/* <div
                style={{
                  cursor: "pointer",
                }}
              >
                <FaUserAlt
                  style={{
                    color: "#3869c4fd",
                  }}
                />
                <span className="user" onClick={() => removeToken()}>admin</span>
              </div> */}
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
    transition: color 0.4s;

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
  /* padding: 8px; */
  position: relative;
  /* margin-bottom: 8px; */
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
