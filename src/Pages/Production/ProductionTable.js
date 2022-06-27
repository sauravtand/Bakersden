import { Space, Table, Button } from 'antd';
import {FcPrint} from 'react-icons/fc';

const columns = [
  {
    title: 'ProductionName',
    dataIndex: 'ProductionName',
    key: 'Production Name',
  },
  {
    title: 'ProductionQuantity',
    dataIndex: 'ProductionQuantity',
    key: 'Production Quantity',
  },
  {
    title: 'PricePerUnit',
    dataIndex: 'PricePerUnit',
    key: 'Price PerUnit',
  },
 
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a><Button type="primary">
          Edit
        </Button></a>
        <a><Button >
         <FcPrint style={{marginRight:'5px', fontSize:'20px'}}/> Print
        </Button></a>
      </Space>
    ),
  },
];
const data = [
  {
    key: '1',
    ProductionName: 'Cheese Cake',
    ProductionQuantity: '500',
    PricePerUnit: '150'
  
  },
  {
    key: '1',
    ProductionName: 'Blueberry Muffin',
    ProductionQuantity: '500',
    PricePerUnit: '100'
  
  },
  {
    key: '1',
    ProductionName: 'Teramesu',
    ProductionQuantity: '300',
    PricePerUnit: '200'
  
  },
 
];

const ProductionTable = () => <Table columns={columns} dataSource={data} />;

export default ProductionTable;