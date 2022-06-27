import { Space, Table, Button } from 'antd';
import { useEffect } from 'react';
import { FcPrint } from 'react-icons/fc';
import Header from '../../Components/Common/Header';
import { GetProductionDetailsDate } from '../../Services/appServices/ProductionService';

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
          <FcPrint style={{ marginRight: '5px', fontSize: '20px' }} /> Print
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




const ProductionTable = () => {
  useEffect(() => {
    const date = {
      fromdate: '2022-6-27',
      todate: '2022-6-27',
    }
    GetProductionDetailsDate(date, (res) => {
      console.log("res", res)
    })
  }, [])
  return (
    <>
      <Header title={'Products'}></Header>
      <div className="mainContainer">
        <Table columns={columns} dataSource={data} />
      </div>
    </>


  )
};

export default ProductionTable;