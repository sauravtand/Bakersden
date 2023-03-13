import { Select, Button, Input, Form, message } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import {
  GetAvailableCountofProductForChalanis,
  GetItemLists,
  GetProductionDetailsDate,
} from "../../Services/appServices/ProductionService";

const { Option } = Select;
const AddProduct = (props) => {
  const [form] = Form.useForm();
  const { onSubmit, items, heightForModal } = props;
  const [ProductList, setProductList] = useState();
  const [MaxCount, setMaxCount] = useState();
  const [ItemLists, setItemLists] = useState();
  // const [form] = Form.useForm();
  const handleSubmit = (e) => {
    if (e.ProductionQuantity <= MaxCount && e.ProductionQuantity > 0) {
      onSubmit({
        key: e.ProductionName,
        productionName: e.ProductionName,
        productionQuantity: e.ProductionQuantity,
      });
      resetThisField();
    } else if (e.productionQuantity === 0) {
      message.error("Please fill the quantity in required range");
    } else {
      message.error("Production Quantity not enough!");
    }
  };

  const resetThisField = () => {
    form.resetFields();
    setMaxCount();
  };

  const handleSelected = (e) => {
    const data = {
      fromdate: moment().format("YYYY-MM-DD"),
      id: e,
    };

    GetAvailableCountofProductForChalanis(data, (res) => {
      setMaxCount(res.AvailableQuantity[0].Column1);
    });
  };
  useEffect(() => {
    const date = {
      fromdate: moment().format("YYYY-MM-DD"),
      todate: moment().format("YYYY-MM-DD"),
      id: 1,
    };
    GetProductionDetailsDate(date, (res) => {
      if (res?.ItemList.length > 0) {
        setProductList(res?.ItemList);
      }
    });

    GetItemLists((res) => {
      setItemLists(res.ItemList);
    });
  }, []);

  return (
    <AddStyle style={{ height: heightForModal ? "395px" : "" }}>
      <h2>Add Products:</h2>

      <Form
        initialValues={{
          remember: true,
        }}
        onFinish={handleSubmit}
        form={form}
      >
        <Form.Item
          name="ProductionName"
          id="productionName"
          rules={[
            {
              required: true,
            },
          ]}
          style={{ display: "inline-block", width: "100%" }}
          wrapperCol={{
            span: 24,
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
            {ItemLists !== undefined &&
              ItemLists.map((e) => (
                <Option title={e.ItmName} value={e.itmId} key={e.itmId}>
                  {e.ItmName}
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
              message: "Please input the Quantity",
            },
          ]}
          style={{ display: "inline-block", width: "100%" }}
          wrapperCol={{
            span: 24,
          }}
          // label={`max count: ${MaxCount}`}
          label={`${MaxCount !== undefined ? `Max count : ${MaxCount}` : ""}`}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Input
              style={{ width: "100%" }}
              placeholder="Quantity"
              min={1}
              type="number"
            />
          </div>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            span: 24,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: heightForModal ? "100%" : 200 }}
          >
            Add
          </Button>
        </Form.Item>
      </Form>
    </AddStyle>
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
