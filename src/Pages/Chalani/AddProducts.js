import { Select, Button, InputNumber, Form, Row, Col } from "antd";
import React from "react";
import styled from "styled-components";

const { Option } = Select;
const AddProduct = (props) => {
  const { onSubmit, items } = props;
  // const [form] = Form.useForm();
  const handleSubmit = async (e) => {
    await onSubmit({
      key: e.ProductionName,
      productionName: e.ProductionName,
      productionQuantity: e.ProductionQuantity,
    });
    // form.resetFields();
  };

  const dummydata = [
    {
      name: "Dark Forest",
      price: "20",
      id: 1,
    },
    {
      name: "Red valvet",
      price: "110",
      id: 2,
    },
    {
      name: "White Forest",
      price: "200",
      id: 3,
    },
    {
      name: "Butter Scothc Cake",
      price: "2500",
      id: 4,
    },
    {
      name: "Banana Vake",
      price: "2500",
      id: 5,
    },
  ];

  return (
    <AddStyle>
      <h2>Add Products:</h2>
      <Row span={24}>
        <Form
          labelCol={{
            span: 1,
          }}
          wrapperCol={{
            span: 18,
          }}
          onFinish={handleSubmit}
          style={{ display: "flex", justifyContent: "space-between" }}
        // onValuesChange={(e)=>{
        //   handleProductChange(e);
        //   handleQuantityChange(e);
        // }}
        // form={form}
        ><Col span={10} >
            <Form.Item
              name="ProductionName"
              id="productionName"
              rules={[
                {
                  required: true,
                },
              ]}
            >

              <Select
                style={{ width: "155%", marginRight: "10px" }}
                placeholder="Products"
                showSearch
                filterOption={(input, option) => {
                  return (
                    option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                    option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  );
                }}

              // value={product}
              >
                {dummydata.map((e) => (
                  <Option title={e.name} value={e.id} key={e.id}>
                    {e.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={10} >
            <Form.Item
              name="ProductionQuantity"
              id="productionQuantity"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber
                style={{ width: "150%", marginLeft: "40px" }}
                placeholder="Quantity"
                min={1}
              />
            </Form.Item></Col>

          <Col span={4} >
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: "", marginLeft: "75px" }}>
                Add
              </Button>
            </Form.Item>
          </Col>
        </Form>
      </Row>
    </AddStyle >
  );
};

export default AddProduct;

const AddStyle = styled.div`
  margin-bottom: 2%;

  /* border: 2px solid black; */
  border-radius: 8px;
  background-color: white;
  box-shadow: -1px 1px 6px 2px rgba(186, 186, 186, 0.75);
  -webkit-box-shadow: -1px 1px 6px 2px rgba(186, 186, 186, 0.75);
  -moz-box-shadow: -1px 1px 6px 2px rgba(186, 186, 186, 0.75);
  padding: 8px;

`;
