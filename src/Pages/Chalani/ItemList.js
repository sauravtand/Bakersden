
import styled from "styled-components";
import AddProduct from './AddProducts';
import { useState } from "react";
import EachItem from "./Item";
import { Button, Col, Row } from "antd";
const ItemList = () => {
  const [items, setItems] = useState([]);


  const addItems = item => {
    console.log("item", item)
    const newItems = [...items, item]
    setItems(newItems);

  }
  const removeProduct = id => {
    const remove = [...items].filter(item => item.productionName !== id)
    setItems(remove);
  }

  return (

    <Itemlist>
      <AddProduct onSubmit={addItems} />
      <h2>Added Products:</h2>
      <EachItem items={items} removeProduct={removeProduct} />
      <Row>
        <Col offset={18}>
          <Button>Reset</Button>
          <Button style={{marginLeft: "16px"}}>Save</Button>
        </Col>
      </Row>

    </Itemlist>





  )
}
export default ItemList;


const Itemlist = styled.div`
margin-top: 2%;
width: 60%;
`