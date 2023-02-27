import React from "react";
import Header from "../../Components/Common/Header";
import { useState } from "react";
import { useEffect } from "react";
import useToken from "../../Helpers/useToken";
import { Checkbox } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import {
  InsertUpdateUserDetail,
  GetListOfUser,
} from "../../Services/appServices/ProductionService";
import { Button, Form, Row, Select, Col, message } from "antd";
import { Input } from "antd";
import UserEntryTab from "./UserEntryTab";

const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 20,
  },
};

const InsertUsers = () => {
  const [form] = Form.useForm();
  const validateConfirmPassword = (_, value) => {
    const userPassword = form.getFieldValue("UserPassword");
    if (value && value !== userPassword) {
      return Promise.reject("The two passwords that you entered do not match!");
    }
    return Promise.resolve();
  };

  const [isbutdis, setisbutdis] = useState(false);
  const [reloadTable, setreloadTable] = useState(false);
  const [userList, setUserList] = useState();
  const [isActive, setIsActive] = useState(false);

  const { token } = useToken();

  const onFinish = (values) => {
    setisbutdis(true);

    let data = {
      Id: 0,
      UserName: values.UserName,
      UserPassword: values.UserPassword,
      IsActive: isActive,
      UserRole: values.UserRole,
    };

    InsertUpdateUserDetail(data, (res) => {
      if (res?.SuccessMsg === true) {
        message.success("Users Added");
        setisbutdis(false);
        setreloadTable(true);
        onReset();
      } else {
        message.error("Error!");
        setisbutdis(false);
        setreloadTable(false);
      }
    });
  };

  const onReset = () => {
    form.resetFields();
  };

  const tableAfterReloaded = (e) => {
    setreloadTable(false);
  };

  useEffect(() => {
    GetListOfUser((res) => {
      setUserList(res.UserList);
    });
  }, []);
  return (
    <>
      <Header title={"Users Entry"}></Header>
      <div className="mainContainer">
        <Row>
          <Col span={8}>
            <div>
              <Form
                {...layout}
                form={form}
                name="control-hooks"
                onFinish={onFinish}
                style={{ marginTop: "20px" }}
                id="itemEntry"
              >
                <h2
                  style={{
                    fontSize: "1.5rem",
                    marginBottom: "30px",
                  }}
                >
                  Add User:
                </h2>
                <Form.Item
                  name="UserName"
                  label="UserName"
                  id="UserName"
                  rules={[
                    {
                      required: true,
                      message: " Username  required!",
                    },
                  ]}
                >
                  <Input placeholder="Username e.g:Ram"></Input>
                </Form.Item>
                <Form.Item
                  name="UserPassword"
                  label="UserPassword"
                  id="UserPassword"
                  rules={[
                    {
                      required: true,
                      message: "Enter Password!",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Enter password"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  ></Input.Password>
                </Form.Item>

                <Form.Item
                  name="Confirm password"
                  label="ConfirmPassword"
                  id="ConfirmPassword"
                  rules={[
                    {
                      required: true,
                      message: "This field is required!",
                    },
                    {
                      validator: validateConfirmPassword,
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Confirm password"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  ></Input.Password>
                </Form.Item>

                <Form.Item
                  name="UserRole"
                  label="UserRole"
                  id="UserRole"
                  rules={[
                    {
                      required: true,
                      message: "User Role is required!",
                    },
                  ]}
                >
                  <Select>
                    <Option value="Admin"></Option>
                    <Option value="Normal"></Option>
                    <Option value="Production"></Option>
                  </Select>
                </Form.Item>

                <Form.Item style={{ marginLeft: "120px" }}>
                  <Checkbox
                    name="IsActive"
                    id="IsActive"
                    label="IsActive"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                  >
                    IsActive
                  </Checkbox>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{
                      marginLeft: "100px",
                      padding: "2px 30px",
                      fontSize: "15px",
                    }}
                    id="saveBtn"
                    disabled={isbutdis}
                    loading={isbutdis}
                  >
                    Add Item
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
          <Col span={14} offset={2}>
            <div
              style={{
                borderLeft: "2px solid #d9dadb",
                paddingLeft: "5px",
              }}
            >
              <UserEntryTab
                reloadTable={reloadTable}
                tableAfterReloaded={tableAfterReloaded}
              />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default InsertUsers;
