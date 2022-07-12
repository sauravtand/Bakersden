import { Space, Table, Button, Tag, Modal, Input, Switch, message, DatePicker, Alert } from 'antd';
import { useEffect, useState } from 'react';
import { FcPrint } from 'react-icons/fc';
import Header from '../../Components/Common/Header';
import { GetProductionDetailsDate, InsertUpdateDayWiseProductionDetail } from '../../Services/appServices/ProductionService';
import { EditOutlined } from '@ant-design/icons';
import { CSVLink } from 'react-csv';
import { newTableStyles } from '../../Components/Common/TableStyles';
import styled from 'styled-components';
import DateTimeBAdge from '../../Components/Common/DateTimeBAdge';

// import { generateUrlEncodedData } from '../../Services/utils/generateUrlEncodedData';

const ProductionTable = () => {
  const [isEditing, setisEditing] = useState(false);
  const [ProductList, setProductList] = useState();
  const [editingProduct, setEditingProduct] = useState();

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
      name: "Butter Scotch Cake",
      price: '2500',
      id: 4,
    },
    {
      name: "Banana Cake",
      price: '2500',
      id: 5,
    }
  ]
  const onFinish = (values) => {
    let data = {
      "PId": editingProduct.PId,
      "ItemId": editingProduct.ItemId,
      "Quantity": editingProduct.Quantity,
      "Remarks": editingProduct.Remarks,
      "UserId": editingProduct.UserId,
      "EntryDate": editingProduct.EntryDate,
      "IsActive": editingProduct.IsActive
    }
    InsertUpdateDayWiseProductionDetail(data, (res) => {
      // setisbutdis(false)
      if (res?.SuccessMsg === true) {
        <Alert message="The data is saved" type="success" showIcon />

        // setisbutdis(false)
        // onReset()
      } else {
        <Alert message="Error" type="Error" showIcon />

        // setisbutdis(false)
      }
    })

  };
  const columns = [
    {
      title: 'PId',
      dataIndex: 'PId',
      key: 'PId',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.PId - b.PId,
    },
    {
      title: 'Item Name',
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
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.Quantity - b.Quantity,
    },
    {
      title: 'User Id',
      dataIndex: 'UserId',
      key: 'UserId',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.UserId - b.UserId,
    },
    {
      title: 'Entry Date',
      dataIndex: 'EntryDate',
      key: 'EntryDate',
      render: ((val) =>
      (
        <DateTimeBAdge data={val} />
      ))
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
            <CIcon onClick={() => {
              editProduct(record);
            }}>
              <EditOutlined />
              <span>Edit</span>
              {/* <Button >
                <FcPrint style={{ marginRight: '5px', fontSize: '20px' }} /> Print
              </Button> */}
            </CIcon>
          </>
        );
      },
    },
  ];


  const editProduct = (record) => {
    setisEditing(true);
    setEditingProduct({ ...record })
  }
  const resetEditing = () => {
    setisEditing(false);
    setEditingProduct(null);
  }
  //CSV
  const headers = [
    { label: 'UserId', key: 'UserId' },
    { label: 'PId', key: 'PId' },
    { label: 'ItemId', key: 'ItemId' },
    { label: 'Quantity', key: 'Quantity' },
    { label: 'EntryDate', key: 'EntryDate' },
    { label: 'Remarks', key: 'Remarks' },
  ]
  // handel print
  const printHandle = () => {
    if (ProductList !== 0) {
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
          <h5>Production Data<h5>
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

      ProductList.forEach(ele => {
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
    else {
      message.info('select some data')
    }


  }

  //Datepicker
  const { RangePicker } = DatePicker;
  // handle change

  function onDateRangeChange(data) {
    let newData = {
      fromdate: data[0].format('YYYY-MM-DD'),
      todate: data[1].format('YYYY-MM-DD')
    }
    callService(newData)
    // console.log(data);

  }
  function callService(data) {
    // const date = new Date().toISOString();
    const date = {
      fromdate: data.fromdate,
      todate: data.todate,
    }
    GetProductionDetailsDate(date, (res) => {


      if (res?.ItemList.length > 0) {
        setProductList(res?.ItemList)
      }

    })
  }
  return (
    <div className="mainContainer">
      <Header title={'View Products'}></Header>

      {/* start of buttons */}
      {/* //CSV */}
      <div style={{
        marginBottom: '8px'
      }}>
        <Button type='primary' style={{ marginLeft: '16px', float: 'right' }} onClick={printHandle}>Print</Button>
        <Button type='primary' style={{ float: 'right' }}><CSVLink data={ProductList !== undefined ? ProductList : ''} filename={'ProductionData.csv'}>Export to CSV</CSVLink>
        </Button>
        {/* range picker */}
        <RangePicker
          onChange={(value) => { onDateRangeChange(value) }}
        />
      </div>

      {/* End-of-Buttons */}
      <div >
        <Table columns={columns} dataSource={ProductList !== undefined ? ProductList : ''}
          scroll={{
            y: 340,
          }} />
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
            disabled="disabled" />Quantity: <Input value={editingProduct?.Quantity} onChange={(e) => {
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
    </div>
  )
}
export default ProductionTable;

const CIcon = styled.div`
  border: 1px solid #84b0c9d5;
  cursor: pointer;
  width: 60px;
  height: 24px;
  border-radius: 4px;
  color: #84b0c9;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  /* span{
    margin-left: 16px;
  } */

  &:hover{
    background-color: #84b0c9;
    color: #fefefe;
  }
`









