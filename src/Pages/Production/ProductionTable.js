


import { Space, Table, Button, Tag, Modal, Input, Switch } from 'antd';
import { useEffect, useState } from 'react';
import { FcPrint } from 'react-icons/fc';
import Header from '../../Components/Common/Header';
import { GetProductionDetailsDate, InsertUpdateDayWiseProductionDetail } from '../../Services/appServices/ProductionService';
import { EditOutlined } from '@ant-design/icons';
// import { generateUrlEncodedData } from '../../Services/utils/generateUrlEncodedData';

const ProductionTable = () => {
  const [isEditing, setisEditing] = useState(false);
  const [ProductList, setProductList] = useState();
  const [editingProduct, setEditingProduct] = useState();


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

  // console.log("data", editingProduct)


  const onFinish = (values) => {
    // setisbutdis(true)

    //     EntryDate: "2022-07-01T11:18:14.713"
    // IsActive: true
    // ItemId: 1
    // PId: 36
    // Quantity: 500
    // Remarks: "hello"
    // UserId: 5

    let data = {
      "PId": editingProduct.PId,
      "ItemId": editingProduct.ItemId,
      "Quantity": editingProduct.Quantity,
      "Remarks": editingProduct.Remarks,
      "UserId": editingProduct.UserId,
      "EntryDate": editingProduct.EntryDate,
      "IsActive": editingProduct.IsActive
    }

    console.log("data", data)
    // return



    InsertUpdateDayWiseProductionDetail(data, (res) => {
      // setisbutdis(false)
      if (res?.SuccessMsg === true) {
        alert("The data is saved")
        // setisbutdis(false)
        // onReset()
      } else {
        alert("Error!")
        // setisbutdis(false)
      }
    })

  };



  const columns = [
    {
      title: 'PId',
      dataIndex: 'PId',
      key: 'PId',
    },
    {
      title: 'ItemId',
      dataIndex: 'ItemId',
      key: 'ItemId',
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
      key: 'UserId',
    },
    {
      title: 'EntryDate',
      dataIndex: 'EntryDate',
      key: 'EntryDate',
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
      render: (_, record) => {
        return (
          <>
            <Space size="middle">

              <EditOutlined
                onClick={() => {
                  editProduct(record);
                }} />
              <Button >
                <FcPrint style={{ marginRight: '5px', fontSize: '20px' }} /> Print
              </Button>
            </Space>
          </>
        );
      },
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

  // EntryDate: "2022-06-28T10:53:33.1"
  // IsActive: true
  // ItemId: 2
  // PId: 3
  // Quantity: 12
  // Remarks: "123asa"
  // UserId: 5

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


  const editProduct = (record) => {
    setisEditing(true);
    setEditingProduct({ ...record })

  }
  const resetEditing = () => {
    setisEditing(false);
    setEditingProduct(null);
  }
  return (
    <>
      <Header title={'Products'}></Header>
      <div className="mainContainer">
        <Table columns={columns} dataSource={ProductList} />
        <Modal
          title="Edit Product"
          okText="Save"
          visible={isEditing}
          onCancel={() => {
            resetEditing()
            setisEditing(false);
          }}
          onOk={() => {
            // handleEditing();
            resetEditing();
            onFinish()
          }
          }>
          PId:<Input value={editingProduct?.PId} onChange={(e) => {
            setEditingProduct(prev => {
              return { ...prev, PId: e.target.value }
            })
          }} disabled="disabled"
          />
          Item Id: <Input value={editingProduct?.ItemId} onChange={(e) => {
            setEditingProduct(prev => {
              return { ...prev, ItemId: e.target.value }
            })
          }}
            disabled="disabled" />
          Quantity: <Input value={editingProduct?.Quantity} onChange={(e) => {
            setEditingProduct(prev => {
              return { ...prev, Quantity: e.target.value }
            })
          }} />
          User Id:<Input value={editingProduct?.UserId} onChange={(e) => {
            setEditingProduct(prev => {
              return { ...prev, UserId: e.target.value }
            })
          }} disabled="disabled" />
          Date:<Input value={editingProduct?.EntryDate} onChange={(e) => {
            setEditingProduct(prev => {
              return { ...prev, EntryDate: e.target.value }
            })
          }} disabled="disabled" />
          Remarks:<Input value={editingProduct?.Remarks} onChange={(e) => {
            setEditingProduct(prev => {
              return { ...prev, Remarks: e.target.value }
            })
          }} />
          IsActive:<Switch defaultChecked disabled="disabled" />
        </Modal>
      </div>
    </>
  )

}



export default ProductionTable;








