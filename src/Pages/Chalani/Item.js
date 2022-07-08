import AddProduct from "./AddProducts";
import styled from "styled-components";
import { Table,Space, Button  } from 'antd';
import {AiFillDelete} from 'react-icons/ai'
import { useEffect } from "react";





const EachItem = ( {items, removeProduct, headersData}) => {

  const dummydata = [
    {
      name: "Dark Forest",
      price: '20',
      id: 1,
    },
    {
      name: "Red valvet",
      price: '110',
      id: 2,
    },
    {
      name: "White Forest",
      price: '200',
      id: 3,
    },
    {
      name: "Butter Scothc Cake",
      price: '2500',
      id: 4,
    },
    {
      name: "Banana Vake",
      price: '2500',
      id: 5,
    }
  ]
  const changeIdToName = (text)=>{
    const a = dummydata.map(res => {
      if (res.id === text)
        return res.name
      else
        return ''
    })
    return a

  }
 

 
    const columns = [
        {
          title: 'Name',
          dataIndex: 'productionName',
          key: 'productionName',
          render: (text, record) => {
            const a = dummydata.map(res => {
              if (res.id === text)
                return res.name
              else
                return ''
            })
            return a
    
          }        },
        {
          title: 'Quantity',
          dataIndex: 'productionQuantity',
          key: 'productionQuantity',
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record, ) => (
            <Space size="middle">
              <Button type='danger' onClick={() => removeProduct(record.productionName)}>Delete</Button>
            </Space>
          ),
        },
      ];


      useEffect(() => {
        head()
      }, [])

      const head = () =>{
        headersData(columns)
      }
     
    return (<div  style={{width:'100%',height:'55vh'}}>
            <Table columns={columns} dataSource={items}
            style={{height:'250px'}}
            scroll={{
              y: 300,
            }} />
           </div>
    )
    
}


export default EachItem;


// const Table = styled.div`
// // border: 2px solid black;// 
// `



