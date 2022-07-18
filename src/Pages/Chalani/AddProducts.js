import { Select, Button, InputNumber, Form, Row, Col, message } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { GetProductionDetailsDate } from "../../Services/appServices/ProductionService";

const { Option } = Select;
const AddProduct = (props) => {
  const { onSubmit, items } = props;
  const [ProductList, setProductList] = useState();
  const [MaxCount, setMaxCount] = useState();
  // const [form] = Form.useForm();
  const handleSubmit = async (e) => {

    if (e.ProductionQuantity <= MaxCount && e.ProductionQuantity > 0) {
      await onSubmit({
        key: e.ProductionName,
        productionName: e.ProductionName,
        productionQuantity: e.ProductionQuantity,
      });
    }else{
      message.error("Pliz fill the qunatitiy in required range")
    }

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

  const handleSelected = (e) => {
    console.log("selected", e)

    if (ProductList !== undefined) {
      console.log("poor", ProductList)
      const found = ProductList.find(el => {
        if (el.ItemId === e) {
          return e
        }
      })
      setMaxCount(found.Quantity);
    }
    console.log("max count", MaxCount)

  }
  useEffect(() => {
    const date = {
      fromdate: moment().format("YYYY-MM-DD"),
      todate: moment().format("YYYY-MM-DD"),
    };
    GetProductionDetailsDate(date, (res) => {
      if (res?.ItemList.length > 0) {
        setProductList(res?.ItemList);
      }
    });
  }, [])

  return (
    <AddStyle>
      <h2>Add Products:</h2>

      <Form
        onFinish={handleSubmit}
      // style={{ display: "flex", justifyContent: "space-between" }}
      // style={{ display: 'inline', width: "100%" }}
      >

        <Form.Item
          name="ProductionName"
          id="productionName"
          rules={[
            {
              required: true,
            },
          ]}
          style={{ display: 'inline-block', width: "100%" }}
          wrapperCol={{
            span: 24
          }}
        >

          <Select
            placeholder="Products"
            showSearch
            filterOption={(input, option) => {
              return (
                option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
              );
            }}
            onSelect={(e) => handleSelected(e)}

          // value={product}
          >
            {dummydata.map((e) => (
              <Option title={e.name} value={e.id} key={e.id}>
                {e.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="ProductionQuantity"
          id="productionQuantity"
          rules={[
            {
              required: true,
            },
          ]}
          style={{ display: 'inline-block', width: "100%" }}
          wrapperCol={{
            span: 24
          }}
          // label={`max count: ${MaxCount}`}
          label={`${MaxCount !== undefined ? `max count : ${MaxCount}` : ''}`}

        >
          <div style={{
            display: 'flex',
            flexDirection: 'column'
          }}>
            <InputNumber
              style={{ width: "100%" }}
              placeholder="Quantity"
              min={1}
              max={MaxCount !== undefined ? MaxCount : 1}
              type='number'
              disabled={MaxCount === undefined ? true : false}
            />
          </div>

        </Form.Item>
        <Form.Item
          wrapperCol={{
            span: 24
          }}
        >
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Form >

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
