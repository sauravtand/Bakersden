
import styled from "styled-components";
import AddProduct from './AddProducts';
import { useState } from "react";
import EachItem from "./EachItem";
import { Button, Col, message, Row } from "antd";
import { DatePicker, Form, Input } from 'antd';
import { UpdateChalanItem, UpdateDeliveryChalani } from "../../Services/appServices/ProductionService";
import { generateUrlEncodedData } from '../../Services/utils/generateUrlEncodedData'
import { newTableStyles } from "../../Components/Common/TableStyles";
import moment from "moment";


const AddedAndParty = () => {


  const [chalanData, setChalanData] = useState([]);
  const [items, setItems] = useState([]);
  const [partyData, setPartyData] = useState([]);
  const [headData, setHeadData] = useState([]);
  const [form] = Form.useForm();


  const onReset = () => {
    form.resetFields();
  }



  const handleAllData = (e) => {

    // console.log(items);
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
    setPartyData(Party);
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
        setChalanData(ChalanItems)
        console.log(ChalanItems);
        //  console.log(ChalanItems);
        //  setChalaniData(ChalanItems);
        UpdateChalanItem(generateUrlEncodedData(ChalanItems), (res) => {
          console.log(res);

        })
      }

    })
    message.info('Data has been saved!');
    onReset();


  }
  const addItems = item => {
    const newItems = [...items, item]
    setItems(newItems);
  }
  const removeProduct = id => {
    const remove = [...items].filter(item => item.productionName !== id)
    setItems(remove);
  }

  console.log(items);
  const headers = {}
  const printHandle = () => {

    let newWindow = window.open()

    let newStyle = ``

    newStyle = `<style>thead > tr> th:first-child, thead > tr> th:nth-child(2), tbody > tr > td:first-child,tbody > tr > td:nth-child(2){
      display: none;
     }tbody > tr:last-child{
  background-color: #f0f0f2;
  }
  tbody > tr:last-child > td{
      font-size: 12px;
      font-weight: 500;
  }</style>`

    let refName = `
    <div style='text-align:center;'>
        <h1>Baker's Den Pvt.ltd<h1>
        <h3>Naxal, Bhatbhateni, Kathmandu, Phone: 01-4416560<h3>
        <p>Party Name: party name </p>
        <p>Date: 2022/01/34</p>
        <p>Delivery Date: 2022/01/35</p>
    </div>
  
    `;

    let tableBody = '';
    let tableHeadHtml = '<thead>';
    let columns = [];

    headers.forEach(ele => {
      tableHeadHtml += `<th>${ele?.label}</th>`;
      columns.push(ele.label);
    })
    tableHeadHtml += '</thead>';

    items.forEach(ele => {
      tableBody = tableBody + '<tr>'
      columns.forEach(cell => {
        tableBody = tableBody + '<td>' + ele[cell] + '</td>'
      })
      tableBody = tableBody + '</tr>'
    })

    let allTable = `<table>${tableHeadHtml}${tableBody}</table>`

    newWindow.document.body.innerHTML = newTableStyles + newStyle + refName + allTable

    setTimeout(function () {
      newWindow.print();
      newWindow.close();
    }, 300);
  }


  // console.log(headData)

  return (
    <>
      <Row>
        <Col span={12}>
          <AddProduct onSubmit={addItems} />
          <AddedProducts>
            <h2>Added Products:</h2>
            <EachItem items={items} removeProduct={removeProduct} />
          </AddedProducts>
        </Col>
        <Col span={12}>
          <FormStyled>
            <Form
              name="basic"
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 18,
              }}
              initialValues={{
                remember: true,
              }}
              autoComplete="off"
              onFinish={handleAllData}
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
                label="Entry Date"
                name="EntryDate"
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

// {
//   "_Chalan": {
//     "DCId": 1,
//     "PartyId": 2,
//     "PartyName": "sample string 3",
//     "PartyAddress": "sample string 4",
//     "UserId": 5,
//     "EntryDate": "2022-07-05T17:23:58.1651819+05:45",
//     "DeliveryDate": "2022-07-05T17:23:58.1651819+05:45",
//     "Remarks": "sample string 8",
//     "IssuedBy": 9,
//     "ReceivedBy": 10,
//     "ApprovedBy": 11,
//     "IsActive": true
//   },
//   "_chalanItemDetails": [
//     {
//       "CId": 1,
//       "ChalaniNo": 2,
//       "ItemId": 3,
//       "Quantity": 4.1,
//       "Remarks": "sample string 5",
//       "IsActive": true
//     },
//     {
//       "CId": 1,
//       "ChalaniNo": 2,
//       "ItemId": 3,
//       "Quantity": 4.1,
//       "Remarks": "sample string 5",
//       "IsActive": true
//     }
//   ]
// }
const FormStyled = styled.div`
/* margin: 2% 2%; */
margin-left: 2%;
padding:2% 8%;
height: 360px;
border-left: 2px solid #c8cacb;
border: 2px solid white;
border-radius: 8px;
box-shadow: -1px 1px 6px 2px rgba(186,186,186,0.75);
-webkit-box-shadow: -1px 1px 6px 2px rgba(186,186,186,0.75);
-moz-box-shadow: -1px 1px 6px 2px rgba(186,186,186,0.75);
`
const AddedProducts = styled.div`
height:auto;
border: 2px solid white;
border-radius: 8px;
box-shadow: -1px 1px 6px 2px rgba(186,186,186,0.75);
-webkit-box-shadow: -1px 1px 6px 2px rgba(186,186,186,0.75);
-moz-box-shadow: -1px 1px 6px 2px rgba(186,186,186,0.75);
`