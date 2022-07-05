import AddProduct from "./AddProducts";
import styled from "styled-components";
import { Table,Space, Button  } from 'antd';
import {AiFillDelete} from 'react-icons/ai'





const EachItem = ( {items, removeProduct}) => {

 
    const columns = [
        {
          title: 'Name',
          dataIndex: 'productionName',
          key: 'productionName',
          render: (text) => <a>{text}</a>,
        },
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
     
    return (<div  style={{width:'100%'}}>
            <Table columns={columns} dataSource={items} />
           </div>
    )
    
}

export default EachItem;


// const Table = styled.div`
// // border: 2px solid black;// 
// `



