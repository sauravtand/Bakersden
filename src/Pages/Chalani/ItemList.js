
import styled from "styled-components";
import AddProduct from './AddProducts';
import { useState } from "react";
import EachItem from "./Item";
import { Button } from "antd";
import {DatePicker, Form, Input } from 'antd';
import { InsertChalanWithItemDetail } from "../../Services/appServices/ProductionService";

const ItemList = () => {


  const [allChalaniData, setAllChalaniData] = useState([]);
  const [items, setItems] = useState([]);
  const [partyData, setPartyData] = useState([]);



// const ChalanData = ()=>{

//   // setAllChalaniData(tempData)

// }

const handleAllData = (e) =>{
  let tempData;
let arrTemp = [];

items.map((e)=>{
  tempData = {
    "CId": 0,
    "ChalaniNo": 2,
    "ItemId": e.productionName,
    "Quantity": e.productionQuantity,
    "Remarks": "sample string 5",
    "IsActive": true
  }
  arrTemp.push(tempData);
})

setAllChalaniData(arrTemp);
 let Party = {
  "DCId": 1,
  "PartyId": 2,
  "PartyName": e.PartyName,
  "PartyAddress": e.PartyAddress,
  "UserId": 5,
  "EntryDate": "2022-07-06T11:27:55.5756515+05:45",
  "DeliveryDate": "2022-07-06T11:27:55.5756515+05:45",
  "Remarks": e.remarks,
  "IssuedBy": 9,
  "ReceivedBy": 10,
  "ApprovedBy": 11,
  "IsActive": true
 }
//  setPartyData(newParty)


 const Data = {
  "_Chalan": Party,
  "_chalanItemDetails": arrTemp

 }
 console.log(JSON.stringify(Data));
 InsertChalanWithItemDetail(JSON.stringify(Data), (res)=>{
  console.log(res);
 })

 
}


  const addItems = item =>{
    const newItems = [ ...items, item]
    setItems(newItems);
  }
  const removeProduct = id => {
    const remove = [...items].filter(item => item.productionName !== id)
    setItems(remove);
  }
  
 return (
  <>
         <Itemlist>
          <AddProduct onSubmit={addItems}/>
          <AddedProducts>
          <h2>Added Products:</h2>
          <EachItem items={items} removeProduct={removeProduct}/>
          </AddedProducts>
        </Itemlist>

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
      <h2 style={{textAlign:'center'}}>Party Details:</h2>
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
      <Form.Item style={{ margin:'20px 110px'}}>
      <Button type='primary' htmlType="submit">Save</Button>
      </Form.Item>

    </Form> 
  </FormStyled>
</>
    )
}
export default ItemList;




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
margin: 2% 2%;
padding:2% 8%;
height: 350px;
border-left: 2px solid #c8cacb;
border: 2px solid white;
border-radius: 8px;
box-shadow: -3px 3px 36px -5px rgba(0,0,0,0.3);
-webkit-box-shadow: -3px 3px 36px -5px rgba(0,0,0,0.3);
-moz-box-shadow: -3px 3px 36px -5px rgba(0,0,0,0.3);


`


const AddedProducts = styled.div`
border: 2px solid white;
border-radius: 8px;
box-shadow: -5px 5px 23px -2px rgba(0,0,0,0.3);
-webkit-box-shadow: -5px 5px 23px -2px rgba(0,0,0,0.3);
-moz-box-shadow: -5px 5px 23px -2px rgba(0,0,0,0.3);padding: 2%;

`