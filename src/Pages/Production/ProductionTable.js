import { Space, Table, Button, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { FcPrint } from 'react-icons/fc';
import Header from '../../Components/Common/Header';
import { GetProductionDetailsDate } from '../../Services/appServices/ProductionService';

const dummydata = [
  {
    name: "Dark Forest",
    price: '20',
    id: 1,
  },
  {
    name: "Red velvet",
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
    name: "Banana Cake",
    price: '2500',
    id: 5,
  }
]

const columns = [
  {
    title: 'PId',
    dataIndex: 'PId',
    key: 'PId',
  },
  {
    title: 'ItemId',
    dataIndex: 'ItemId',
    key: 'Item Id',
    render: (text, record) => {
      const a = dummydata.map(res => {
        if (res.id === text)
          return res.name
        else
          return ''
      })
      return a

    }
  },

  {
    title: 'Quantity',
    dataIndex: 'Quantity',
    key: 'Quantity',
  },

  {
    title: 'UserId',
    dataIndex: 'UserId',
    key: 'User Id',
  },
  {
    title: 'EntryDate',
    dataIndex: 'EntryDate',
    key: 'Entry Date',
  },
  {
    title: 'Remarks',
    dataIndex: 'Remarks',
    key: 'Remarks',
  },
  {
    title: 'IsActive',
    dataIndex: 'IsActive',
    key: 'IsActive',
    render: (text, record) => (
      <>
        {
          text === true ?
            <Tag color={'green'}>Active</Tag> : <Tag color={'red'}>inActive</Tag>
        }
      </>
    )
  },


  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a ><Button type="primary">
          Edit
        </Button></a>
        <a ><Button >
          <FcPrint style={{ marginRight: '5px', fontSize: '20px' }} /> Print
        </Button></a>
      </Space>
    ),
  },
];


const ProductionTable = () => {


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

  // EntryDate: "2022-06-28T10:53:33.1"
  // IsActive: true
  // ItemId: 2
  // PId: 3
  // Quantity: 12
  // Remarks: "123asa"
  // UserId: 5

  const [ProductList, setProductList] = useState();
  useEffect(() => {
    // const date = new Date().toISOString();
    const date = {
      fromdate: new Date().toISOString(),
      todate: new Date().toISOString(),
    }
    GetProductionDetailsDate(date, (res) => {


      if (res?.ItemList.length > 0) {



        setProductList(res?.ItemList)
      }

    })
  }, [])
  // console.log("res", ProductList)
  return (
    <>
      <Header title={'Products'}></Header>
      <div className="mainContainer">
        <Table columns={columns} dataSource={ProductList} />
      </div>
    </>
  )

}



export default ProductionTable;