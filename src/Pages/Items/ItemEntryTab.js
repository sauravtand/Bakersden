import { Table, Tag, Modal, Input, DatePicker, Alert } from "antd";
import { useEffect, useState } from "react";
import {
  GetItemLists,
  GetProductionDetailsDate,
  InsertUpdateItemDetail,
} from "../../Services/appServices/ProductionService";
import { EditOutlined } from "@ant-design/icons";
import styled from "styled-components";

import PrintComponent from "../../Components/Common/PrintComponent";

const ItemEntryTab = (props) => {
  const { reloadTable, tableAfterReloaded } = props;
  const [isEditing, setisEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState();
  const [ProductList, setProductList] = useState();
  const [ItemLists, setItemLists] = useState();

  useEffect(() => {
    if (reloadTable === true) {
      getTableData();
      tableAfterReloaded(false);
    }
  }, []);
  useEffect(() => {
    // const date = new Date().toISOString();
    getTableData();
    GetItemLists((res) => {
      // console.log("item list", res.ItemList);
      setItemLists(res.ItemList);
      if (res?.ItemList.length > 0) {
        setProductList(res?.ItemList);
      }
    });
  }, []);

  function getTableData() {
    const date = {
      fromdate: new Date().toISOString(),
      todate: new Date().toISOString(),
    };
    GetProductionDetailsDate(date, (res) => {
      console.log(res);
      if (res?.ItemList.length > 0) {
        setProductList(res?.ItemList);
      }
    });
  }

  const addName = () => {
    let tempArr = [];
    let temp;
    if (ProductList !== undefined) {
      ProductList.map((e) => {
        let newItmName = "";
        if (ItemLists) {
          ItemLists.forEach((res) => {
            if (res.itmId === e.ItemId) {
              newItmName = res.ItmName;
            }
          });
        }

        temp = {
          ItemName: newItmName,
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
      itmID: editingProduct.itmId,
      // itmName: editingProduct.itmName,
      itmName: editingProduct.Name,
      itmCode: editingProduct.itmCode,
      itmDateAdded: editingProduct.itmDateAdded,
      Units: editingProduct.Units,
    };

    InsertUpdateItemDetail(data, (res) => {
      console.log(data, res, "update");
      if (res?.SuccessMsg === true) {
        <Alert message="The data is saved" type="success" showIcon />;
      } else {
        <Alert message="Error" type="Error" showIcon />;
      }
    });
  };
  const columns = [
    {
      title: "Item Id",
      dataIndex: "itmId",
      key: "itmId",
      sorter: (a, b) => a.itmId - b.itmId,
      sortOrder: "descend",
    },

    // {
    //   title: "Item Name",
    //   dataIndex: "ItmName",
    //   key: "ItmName",
    // },
    {
      title: " Name",
      dataIndex: "Name",
      key: "Name",
    },
    {
      title: "Item Code",
      dataIndex: "itmCode",
      key: "itmCode",
    },
    {
      title: "Units",
      dataIndex: "Units",
      key: "Units",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        console.log(record, "YA YOU FOUND ME");
        return (
          <>
            <CIcon
              onClick={() => {
                editProduct(record);
              }}
            >
              <EditOutlined />
              <span>Edit</span>
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
    // { label: "ItemId", key: "itmId" },
    { label: "Item Name", key: "ItmName" },
    { label: "Added date ", key: "itmDateAdded" },
    { label: "Units", key: "Units" },
  ];
  return (
    <>
      <PrintComponent
        addname={addName}
        ProductList={ProductList}
        headers={headers}
        forCSV
        forPrint
      />

      <div>
        <Table
          columns={columns}
          dataSource={ProductList !== undefined ? ProductList : ""}
          style={{ height: "490px" }}
          scroll={{
            y: 350,
          }}
        />
        <Modal
          title="Edit Items"
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
          Id:
          <Input
            value={editingProduct?.itmId}
            onChange={(e) => {
              setEditingProduct((prev) => {
                return { ...prev, itmId: e.target.value };
              });
            }}
            disabled
          />
          Item Code:{" "}
          <Input
            value={editingProduct?.itmCode}
            onChange={(e) => {
              setEditingProduct((prev) => {
                return { ...prev, itmCode: e.target.value };
              });
            }}
            // disabled
          />
          Name:{" "}
          <Input
            value={editingProduct?.Name}
            onChange={(e) => {
              setEditingProduct((prev) => {
                return { ...prev, Name: e.target.value };
              });
            }}
          />
          Units:{" "}
          <Input
            value={editingProduct?.Units}
            onChange={(e) => {
              setEditingProduct((prev) => {
                return { ...prev, Units: e.target.value };
              });
            }}
          />
        </Modal>
      </div>
    </>
  );
};
export default ItemEntryTab;

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