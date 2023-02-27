import { Table, Tag, Modal, Input, DatePicker, Alert } from "antd";
import { useEffect, useState } from "react";
import Header from "../../Components/Common/Header";
import {
  GetItemLists,
  GetProductionDetailsDate,
  InsertUpdateDayWiseProductionDetail,
} from "../../Services/appServices/ProductionService";
import { EditOutlined } from "@ant-design/icons";
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
      if (res?.ItemList.length > 0) {
        setItemList(res?.ItemList);
      }
    });
  }, []);

  useEffect(() => {
    const date = {
      fromdate: new Date().toISOString(),
      todate: new Date().toISOString(),
    };
    GetProductionDetailsDate(date, (res) => {
      if (res?.ItemList?.length > 0) {
        setProductList(res?.ItemList);
      }
    });
  }, [editingProduct]);

  const addname = () => {
    let tempArr = [];
    let temp;
    if (ProductList !== undefined) {
      ProductList.map((e, index) => {
        let newItemName = "";
        if (itemList) {
          itemList.forEach((res) => {
            if (res.itmId === e.ItemId) {
              newItemName = res.ItmName;
            }
          });
        }

        temp = {
          ItemName: newItemName,
          ...e,
        };
        tempArr.push(temp);
      });
    }
    return tempArr;
  };
  const localStorageUserData = JSON.parse(localStorage.getItem("userData"));

  const onFinish = (values) => {
    let data = {
      PId: editingProduct.PId,
      ItemId: editingProduct.ItemId,
      Quantity: editingProduct.GoodForSale,
      Remarks: editingProduct.Remarks,
      UserId: editingProduct.UserId,
      EntryDate: editingProduct.EntryDate,
      IsActive: editingProduct.IsActive,
      SpoilageCount: editingProduct.SpoilageCount,
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
      title: "Good for Sale",
      dataIndex: "GoodForSale",
      key: "GoodForSale",
    },
    {
      title: "Spoilage",
      dataIndex: "SpoilageCount",
      key: "SpoilageCount",
    },
    {
      title: "Total Production",
      dataIndex: "TotalProduction",
      key: "TotalProduction",
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
    { label: "User Id", key: "UserId" },
    { label: "PId", key: "PId" },
    { label: "Item name", key: "ItemName" },
    { label: "Item Id", key: "ItemId" },
    { label: "Good For Sale ", key: "GoodForSale" },
    { label: "Spoilage", key: "SpoilageCount" },
    { label: "Total Production", key: "TotalProduction" },
    { label: "Entry Date", key: "EntryDate" },
    { label: "Remarks", key: "Remarks" },
  ];

  //Datepicker
  const { RangePicker } = DatePicker;
  // handle change

  function onDateRangeChange(data) {
    setProductList();
    let newData = {
      fromdate: data[0].format("YYYY-MM-DD"),
      todate: data[1].format("YYYY-MM-DD"),
    };
    callService(newData);
  }
  function callService(data) {
    // const date = new Date().toISOString();
    const date = {
      fromdate: data.fromdate,
      todate: data.todate,
    };
    GetProductionDetailsDate(date, (res) => {
      if (res?.ItemList && res?.ItemList.length > 0) {
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
          {/* Item Id:{" "}
          <Input
            value={editingProduct?.ItemId}
            onChange={(e) => {
              setEditingProduct((prev) => {
                return { ...prev, ItemId: e.target.value };
              });
            }}
            disabled="disabled"
          /> */}
          Good For Sale:{" "}
          <Input
            value={editingProduct?.GoodForSale}
            onChange={(e) => {
              setEditingProduct((prev) => {
                return { ...prev, GoodForSale: e.target.value };
              });
            }}
          />
          Spoilage:{" "}
          <Input
            value={editingProduct?.SpoilageCount}
            onChange={(e) => {
              setEditingProduct((prev) => {
                return { ...prev, SpoilageCount: e.target.value };
              });
            }}
          />
          {/* User Id:
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
          /> */}
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
          {/* IsActive: <br />
          <Switch defaultChecked disabled="disabled" /> */}
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
