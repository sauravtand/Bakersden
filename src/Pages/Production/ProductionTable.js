import {
  Table,
  Button,
  Tag,
  Modal,
  Input,
  Switch,
  message,
  DatePicker,
  Alert,
} from "antd";
import { useEffect, useState } from "react";
import Header from "../../Components/Common/Header";
import {
  GetItemLists,
  GetProductionDetailsDate,
  InsertUpdateDayWiseProductionDetail,
} from "../../Services/appServices/ProductionService";
import { EditOutlined } from "@ant-design/icons";
import { CSVLink } from "react-csv";
import { newTableStyles } from "../../Components/Common/TableStyles";
import styled from "styled-components";
import DateTimeBAdge from "../../Components/Common/DateTimeBAdge";
import PrintComponent from "../../Components/Common/PrintComponent";

// import { generateUrlEncodedData } from '../../Services/utils/generateUrlEncodedData';

const ProductionTable = () => {
  const [isEditing, setisEditing] = useState(false);
  const [ProductList, setProductList] = useState();
  const [editingProduct, setEditingProduct] = useState();
  const [itemList, setItemList] = useState();

  useEffect(() => {
    GetItemLists((res) => {
      // console.log("item list", res.ItemList);
      if (res?.ItemList.length > 0) {
        setItemList(res?.ItemList);
        // console.log(itemList);
      }
    });
  }, []);

  useEffect(() => {
    // const date = new Date().toISOString();
    const date = {
      fromdate: new Date().toISOString(),
      todate: new Date().toISOString(),
    };
    GetProductionDetailsDate(date, (res) => {
      // console.log("hello", res);
      if (res?.ItemList.length > 0) {
        setProductList(res?.ItemList);
      }
    });
    // addname();
  }, []);
  const addname = () => {
    // setIsChanging(true);
    let tempArr = [];
    let temp;
    if (ProductList !== undefined) {
      // console.log("hello wosdfsdfsd");
      ProductList.map((e, index) => {
        let newItemName = "";
        itemList.forEach((res) => {
          if (res.itmId === e.ItemId) {
            newItemName = res.ItmName;
          }
        });
        temp = {
          ItemName: newItemName,
          ...e,
        };
        tempArr.push(temp);
        // console.log("temp", tempArr);
      });
    }
    return tempArr;
  };

  const onFinish = (values) => {
    let data = {
      PId: editingProduct.PId,
      ItemId: editingProduct.ItemId,
      Quantity: editingProduct.Quantity,
      Remarks: editingProduct.Remarks,
      UserId: editingProduct.UserId,
      EntryDate: editingProduct.EntryDate,
      IsActive: editingProduct.IsActive,
    };
    InsertUpdateDayWiseProductionDetail(data, (res) => {
      // setisbutdis(false)
      if (res?.SuccessMsg === true) {
        <Alert message="The data is saved" type="success" showIcon />;

        // setisbutdis(false)
        // onReset()
      } else {
        <Alert message="Error" type="Error" showIcon />;

        // setisbutdis(false)
      }
    });
  };
  const columns = [
    {
      title: "PId",
      dataIndex: "PId",
      key: "PId",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.PId - b.PId,
    },
    {
      title: "Item Name",
      dataIndex: "ItemId",
      key: "ItemId",
      render: (text, record) => {
        if (itemList !== undefined) {
          const a = itemList.map((res) => {
            if (res.itmId === text) return res.ItmName;
            else return "";
          });
          return a;
        }
      },
    },
    {
      title: "Quantity",
      dataIndex: "Quantity",
      key: "Quantity",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.Quantity - b.Quantity,
    },
    {
      title: "User Id",
      dataIndex: "UserId",
      key: "UserId",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.UserId - b.UserId,
    },
    {
      title: "Entry Date",
      dataIndex: "EntryDate",
      key: "EntryDate",
      render: (val) => <DateTimeBAdge data={val} />,
    },
    {
      title: "Remarks",
      dataIndex: "Remarks",
      key: "Remarks",
    },
    {
      title: "IsActive",
      dataIndex: "IsActive",
      key: "IsActive",
      render: (text, record) => (
        <>
          {text === true ? (
            <Tag color={"green"}>Active</Tag>
          ) : (
            <Tag color={"red"}>inActive</Tag>
          )}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <>
            <CIcon
              onClick={() => {
                editProduct(record);
              }}
            >
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
    setEditingProduct({ ...record });
  };
  const resetEditing = () => {
    setisEditing(false);
    setEditingProduct(null);
  };
  //CSV
  const headers = [
    { label: "UserId", key: "UserId" },
    { label: "PId", key: "PId" },
    { label: "Item name", key: "ItemName" },
    { label: "ItemId", key: "ItemId" },
    { label: "Quantity", key: "Quantity" },
    { label: "EntryDate", key: "EntryDate" },
    { label: "Remarks", key: "Remarks" },
  ];

  //Datepicker
  const { RangePicker } = DatePicker;
  // handle change

  function onDateRangeChange(data) {
    let newData = {
      fromdate: data[0].format("YYYY-MM-DD"),
      todate: data[1].format("YYYY-MM-DD"),
    };
    callService(newData);
    // console.log(data);
  }
  function callService(data) {
    // const date = new Date().toISOString();
    const date = {
      fromdate: data.fromdate,
      todate: data.todate,
    };
    GetProductionDetailsDate(date, (res) => {
      if (res?.ItemList.length > 0) {
        setProductList(res?.ItemList);
      }
    });
  }
  return (
    <div className="mainContainer">
      <Header title={"View Production"}></Header>

      {/* start of buttons */}
      {/* //CSV */}
      <div
        style={{
          marginBottom: "8px",
        }}
      >
        {/* <Button
          type="primary"
          style={{ marginLeft: "16px", float: "right" }}
          onClick={printHandle}
        >
          Print
        </Button>
        <Button type="primary" style={{ float: "right" }}>
          <CSVLink
            data={ProductList !== undefined ? ProductList : ""}
            filename={"ProductionData.csv"}
          >
            Export to CSV
          </CSVLink>
        </Button> */}
        {/* range picker */}
        <PrintComponent
          addname={addname}
          ProductList={ProductList}
          headers={headers}
          forCSV
          forPrint
        />
        <RangePicker
          onChange={(value) => {
            onDateRangeChange(value);
          }}
        />
      </div>

      {/* End-of-Buttons */}
      <div>
        <Table
          columns={columns}
          dataSource={ProductList !== undefined ? ProductList : ""}
          scroll={{
            y: 310,
          }}
        />
        <Modal
          title="Edit Product"
          okText="Save"
          visible={isEditing}
          onCancel={() => {
            resetEditing();
            setisEditing(false);
          }}
          onOk={() => {
            // handleEditing();
            resetEditing();
            onFinish();
          }}
        >
          PId:
          <Input
            value={editingProduct?.PId}
            onChange={(e) => {
              setEditingProduct((prev) => {
                return { ...prev, PId: e.target.value };
              });
            }}
            disabled="disabled"
          />
          Item Id:{" "}
          <Input
            value={editingProduct?.ItemId}
            onChange={(e) => {
              setEditingProduct((prev) => {
                return { ...prev, ItemId: e.target.value };
              });
            }}
            disabled="disabled"
          />
          Quantity:{" "}
          <Input
            value={editingProduct?.Quantity}
            onChange={(e) => {
              setEditingProduct((prev) => {
                return { ...prev, Quantity: e.target.value };
              });
            }}
          />
          User Id:
          <Input
            value={editingProduct?.UserId}
            onChange={(e) => {
              setEditingProduct((prev) => {
                return { ...prev, UserId: e.target.value };
              });
            }}
            disabled="disabled"
          />
          Date:
          <Input
            value={editingProduct?.EntryDate}
            onChange={(e) => {
              setEditingProduct((prev) => {
                return { ...prev, EntryDate: e.target.value };
              });
            }}
            disabled="disabled"
          />
          Remarks:
          <br />
          <Input
            value={editingProduct?.Remarks}
            onChange={(e) => {
              setEditingProduct((prev) => {
                return { ...prev, Remarks: e.target.value };
              });
            }}
          />
          IsActive: <br />
          <Switch defaultChecked disabled="disabled" />
        </Modal>
      </div>
    </div>
  );
};
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

  &:hover {
    background-color: #84b0c9;
    color: #fefefe;
  }
`;
