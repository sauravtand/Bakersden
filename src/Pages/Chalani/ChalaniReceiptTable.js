import { Space, Table, Button } from 'antd';
import {FcPrint} from 'react-icons/fc';

const columns = [
  {
    title: 'S.No.',
    dataIndex: 'SNo',
    key: 'S.NO.',
  },
  {
    title: 'Particulars',
    dataIndex: 'Particulars',
    key: 'Particulars',
  },
  {
    title: 'Qty.',
    dataIndex: 'Qty',
    key: 'Qty.',
  },
 

];
const data = [
  {
    key: '1',
    SNo: '1',
    Particulars: 'Cheese Cake',
    Qty: '500',
  
  },
  {
    key: '1',
    SNo: '2',

    Particulars: 'Blueberry Muffin',
    Qty: '500'
  
  
  },
  {
    key: '1',
    SNo: '3',

    Particulars: 'Teramesu',
    Qty: '300',
   
  
  },
 
];

const ProductionTable = () => <Table columns={columns} dataSource={data} />;

export default ProductionTable;