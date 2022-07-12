
import styled from "styled-components";
import AddProduct from './AddProducts';
import { useState } from "react";
import EachItem from "./EachItem";
import { Button, Col, message, Row } from "antd";
import { DatePicker, Form, Input } from 'antd';
import { UpdateChalanItem, UpdateDeliveryChalani } from "../../Services/appServices/ProductionService";
import { generateUrlEncodedData } from '../../Services/utils/generateUrlEncodedData'
import moment from "moment";


const AddedAndParty = () => {
  const [items, setItems] = useState();
  const [form] = Form.useForm();

  const handleAllData = (e) => {
    let Party = {
      "DCId": 0,
      "PartyId": 1,
      "PartyName": e.PartyName,
      "PartyAddress": e.PartyAddress,
      "UserId": 1,
      "EntryDate": moment().format('YYYY-MM-DD'),
      "DeliveryDate": moment().format('YYYY-MM-DD'),
      "Remarks": e.remarks,
      "IssuedBy": 1,
      "ReceivedBy": 1,
      "ApprovedBy": 1,
      "IsActive": true
    }

    let chalaniNo = 0;
    UpdateDeliveryChalani(generateUrlEncodedData(Party), (res) => {

      chalaniNo = res.CreatedId;
      for (let i = 0; i < items.length; i++) {
        let ChalanItems = {
          "CId": 0,
          "ChalaniNo": chalaniNo,
          "ItemId": items[i].productionName,
          "Quantity": items[i].productionQuantity,
          "Remarks": e.remarks,
          "IsActive": true

        }
        UpdateChalanItem(generateUrlEncodedData(ChalanItems), (res) => {
          if (res.SuccessMsg === true) {
            message.info('Data has been saved!');
            form.resetFields();
            setItems()
          } else {
            message.warning('Error, saving data!')
          }
        })
      }
    })
  }
  const addItems = item => {
    if (items === undefined) {
      const newItems = [item]
      setItems(newItems);
    } else {
      items.map(e => {
        if (e.productionName !== item.productionName) {
          let temp = [...items, item]
          setItems(temp);
        } else {
          message.warning("item already added")
        }
      })
    }
  }

  const removeProduct = id => {
    const remove = [...items].filter(item => item.productionName !== id)
    setItems(remove);
  }

  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <AddProduct onSubmit={addItems} items={items} />
          <AddedProducts >
            <h2>Added Products:</h2>
            <EachItem items={items} removeProduct={removeProduct} />
          </AddedProducts>
        </Col>
        <Col span={12}>
          <FormStyled>
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 24,
              }}
              initialValues={{
                remember: true,
              }}
              autoComplete="off"
              onFinish={handleAllData}
              form={form}
            >
              <h2 style={{ textAlign: 'center' }}>Party Details:</h2>
              <Form.Item
                label="Party Name"
                name="PartyName"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Party Name!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Party Address"
                name="PartyAddress"
                rules={[
                  {
                    required: true,
                    message: 'Please input Party Address!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Delivery Date"
                name="Delivery"
                rules={[
                  {
                    required: true,
                    message: 'Please input Entry Date!',
                  },
                ]}
              >
                <DatePicker />
              </Form.Item>
              <Form.Item
                label="Remarks"
                name="Remarks"
                rules={[
                  {
                    required: true,
                    message: 'Please input Remarks!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item style={{ margin: '20px 205px' }}>
                <Button type='primary' htmlType="submit">Save</Button>
              </Form.Item>

            </Form>
          </FormStyled>


        </Col>


      </Row>
      <Itemlist>

      </Itemlist>


    </>
  )
}

export default AddedAndParty;




const Itemlist = styled.div`
margin-top: 2%;
width: 60%;
margin-left: 2%;
`

const FormStyled = styled.div`
padding: 8px 16px;
border-left: 2px solid #c8cacb;
border: 2px solid white;
border-radius: 8px;
box-shadow: -1px 1px 6px 2px rgba(186,186,186,0.75);
-webkit-box-shadow: -1px 1px 6px 2px rgba(186,186,186,0.75);
-moz-box-shadow: -1px 1px 6px 2px rgba(186,186,186,0.75);
background-color: #fefefe;
`
const AddedProducts = styled.div`
padding: 8px 16px;
height:460px;
border: 2px solid '#c8cacb';
border-radius: 8px;
box-shadow: -1px 1px 6px 2px rgba(186,186,186,0.75);
-webkit-box-shadow: -1px 1px 6px 2px rgba(186,186,186,0.75);
-moz-box-shadow: -1px 1px 6px 2px rgba(186,186,186,0.75);
background-color: #fefefe;
`