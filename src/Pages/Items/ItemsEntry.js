import { Button, Form, Row, Select, Col, message } from "antd";
import { Input } from "antd";
import {
  GetItemLists,
  InsertUpdateItemDetail,
} from "../../Services/appServices/ProductionService";
import Header from "../../Components/Common/Header";
import { useState } from "react";
import ItemEntryTab from "./ItemEntryTab";

import styled from "styled-components";
import { useEffect } from "react";
import useToken from "../../Helpers/useToken";
const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 20,
  },
};

const ItemsEntry = () => {
  const [form] = Form.useForm();
  const date = new Date().toISOString();
  const [isbutdis, setisbutdis] = useState(false);
  const [reloadTable, setreloadTable] = useState(false);
  const [ItemLists, setItemLists] = useState();

  const { token } = useToken();

  const onFinish = (values) => {
    setisbutdis(true);

    let data = {
      itmID: 0,
      itmCode: values.ItemCode,
      itmName: values.ItemName,
      itmDateAdded: date,
      Units: values.Units,
    };

    InsertUpdateItemDetail(data, (res) => {
      if (res?.SuccessMsg === true) {
        message.success("Item Added");
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
    GetItemLists((res) => {
      setItemLists(res.ItemList);
    });
  }, []);

  return (
    <>
      <Header title={"Items Entry"}></Header>
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
                  Add Items:
                </h2>
                <Form.Item
                  name="ItemName"
                  label="Name"
                  id="itmName"
                  rules={[
                    {
                      required: true,
                      message: " Item required!",
                    },
                  ]}
                >
                  <Input></Input>
                </Form.Item>
                <Form.Item
                  name="ItemCode"
                  label="ItemCode"
                  id="itmCode"
                  rules={[
                    {
                      required: true,
                      message: "Item Code is required!",
                    },
                  ]}
                >
                  <Input></Input>
                </Form.Item>
                <Form.Item
                  name="Units"
                  label="Units"
                  id="Units"
                  rules={[
                    {
                      required: true,
                      message: "Unit is required!",
                    },
                  ]}
                >
                  <Input></Input>
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
              <ItemEntryTab
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

export default ItemsEntry;
