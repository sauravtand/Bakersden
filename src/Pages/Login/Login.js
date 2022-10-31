import React from "react";
import { Button, Input, Form, message } from "antd";
import styled from "styled-components";
import Cover from "../../Assets/images/cover2.jpg";
import logo from "../../Assets/images/logo.png";
import useToken from "../../Helpers/useToken";
import { useNavigate } from "react-router-dom";
import { getLoginApi } from "../../Services/appServices/loginService";
import { useDispatch } from "react-redux";
import { storeUserData } from "../../Services/store/slices/profileSlice";
// import {useToken} from '../../Helpers/usetoken';

const Login = () => {
  const dispatch = useDispatch();

  const { token, setToken } = useToken();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    let data = {
      username: e?.username,
      password: e?.password,
    };

    dispatch(
      getLoginApi(data, (res) => {
        if (res.length !== 0) {
          let UserDetails = res?.UserDetails;
          if (UserDetails[0]?.Id > 0) {
            // console.log("hello", res, UserDetails[0]?.Id);

            let temp = {
              id: UserDetails[0]?.Id,
              userName: UserDetails[0]?.UserName,
              userrole: UserDetails[0]?.Id,
            };
            setToken(temp);
            localStorage.setItem("userData", JSON.stringify(temp));
            navigate("/ChalaniTable");
            dispatch(storeUserData(temp));
          } else {
            message.error("Incorrect Username or Password");
          }
        } else {
          message.error("Incorrect Username or Password");
        }
      })
    );
  };
  return (
    <LoginContainer>
      <div className="left">
        <Logo>
          <img src={logo} alt="logo" />
        </Logo>
        <img src={Cover} alt="cake" />
      </div>
      <div className="right">
        <div className="logIincontainer">
          <h1
            style={{
              color: "#163153",
              fontSize: "36px",
              letterSpacing: "2px",
            }}
          >
            Welcome to Baker's Den
          </h1>
          <Form onFinish={handleSubmit} layout="vertical">
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
              // labelAlign='right'
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="bot">
        <h4>
          Powered By{" "}
          <a
            href="https://www.lunivatech.com/"
            target={"_blank"}
            style={{
              color: "#f57f20",
              fontSize: "16px",
            }}
          >
            LunivaTech Pvt.Ltd.
          </a>
        </h4>
        {/* <span>Pwered By LunivaTech Pvt.Ltd.</span> */}
      </div>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #fefefefe;

  .left {
    flex: 0.4;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: grayscale(0.4);
    }
  }
  .right {
    flex: 0.6;
    .logIincontainer {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      min-height: 300px;
      padding: 16px 32px;
      background: #fefefe;
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 4px;
    }
  }
  .bot {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
`;

const Logo = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  top: 10px;
  left: 10px;
  z-index: 100;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
