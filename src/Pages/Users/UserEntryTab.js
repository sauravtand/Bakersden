import { Table, Tag, Modal, Input, Checkbox, Alert, Select } from "antd";
import styled from "styled-components";
import { EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  GetListOfUser,
  GetProductionDetailsDate,
  InsertUpdateUserDetail,
} from "../../Services/appServices/ProductionService";
import SearchBar from "../../Components/Common/SearchBar";

import PrintComponent from "../../Components/Common/PrintComponent";

const { Option } = Select;

const UserEntryTab = (props) => {
  const { reloadTable, tableAfterReloaded } = props;
  const [userList, setuserList] = useState();
  const [UserLists, setUserLists] = useState();
  const [isEditing, setisEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState();

  useEffect(() => {
    if (reloadTable === true) {
      getTableData();
      tableAfterReloaded(false);
    }
  }, [reloadTable]);
  useEffect(() => {
    getTableData();
    GetListOfUser((res) => {
      if (res?.UserList.length > 0) {
        setuserList(res?.UserList);
        setUserLists(res.UserList);
      }
    });
  }, [reloadTable]);

  function getTableData() {
    const date = {
      fromdate: new Date().toISOString(),
      todate: new Date().toISOString(),
    };
    GetProductionDetailsDate(date, (res) => {
      if (res?.UserList.length > 0) {
        setuserList(res?.UserList);
      }
    });
  }

  // const localStorageUserData = JSON.parse(localStorage.getItem("userData"));

  const onFinish = (values) => {
    let data = {
      Id: editingProduct.Id,
      // ItemCode: editingProduct.itmCode,
      UserName: editingProduct.UserName,
      UserPassword: editingProduct.UserPassword,
      IsActive: editingProduct.IsActive,
      UserRole: editingProduct.UserRole,
    };
    const updatedProductList = UserLists.map((product) => {
      if (product.Id === editingProduct.Id) {
        return { ...product, ...editingProduct };
      } else {
        return product;
      }
    });
    setUserLists(updatedProductList);
    InsertUpdateUserDetail(data, (res) => {
      if (res?.SuccessMsg === true) {
        <Alert message="The data is saved" type="success" showIcon />;
      } else {
        <Alert message="Error" type="Error" showIcon />;
      }
    });
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "Id",
      key: "Id",
      sorter: (a, b) => a.Id - b.Id,
    },
    {
      title: "User Name",
      dataIndex: "Id",
      key: "Id",
      render: (text, value) => {
        if (UserLists !== undefined) {
          const a = UserLists.map((res) => {
            if (res.Id === text) return res.UserName;
            else return "";
          });
          return a;
        }
      },
    },
    {
      title: "UserRole",
      dataIndex: "UserRole",
      key: "UserRole",
    },

    {
      title: "IsActive",
      dataIndex: "IsActive",
      key: "IsActive",
      render: (text, record) => {
        return (
          <>
            {text === true ? (
              <Tag color={"green"}>Active</Tag>
            ) : (
              <Tag color={"red"}>InActive</Tag>
            )}
          </>
        );
      },
      sorter: (a, b) => a.IsActive - b.IsActive,
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
    { label: "Id", key: "Id" },
    { label: "User Name", key: "UserName" },
    { label: "User Role ", key: "UserRole" },
    { label: "IsActive", key: "IsActive" },
  ];
  const addname = () => {
    return UserLists;
  };
  function onSearch(value) {
    if (!value) {
      setUserLists(userList);
    } else {
      const filteredData = UserLists.filter((item) =>
        item.UserName.toLowerCase().includes(value.toLowerCase())
      );
      setUserLists(filteredData);
    }
  }

  return (
    <>
      <div>
        <PrintComponent
          addname={addname}
          userList={userList}
          headers={headers}
          forCSV
          forPrint
        />
      </div>

      <div>
        <SearchBar onSearch={onSearch} />
        <Table
          columns={columns}
          dataSource={UserLists !== undefined ? UserLists : ""}
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
            resetEditing();
            onFinish();
          }}
        >
          Id:
          <Input
            value={editingProduct?.Id}
            onChange={(e) => {
              setEditingProduct((prev) => {
                return { ...prev, Id: e.target.value };
              });
            }}
            disabled
          />
          Name:{" "}
          <Input
            value={editingProduct?.UserName}
            onChange={(e) => {
              setEditingProduct((prev) => {
                return { ...prev, UserName: e.target.value };
              });
            }}
          />
          User Role: <br></br>
          <Select
            style={{ width: "100%" }}
            value={editingProduct?.UserRole}
            onChange={(value) => {
              setEditingProduct((prev) => {
                return { ...prev, UserRole: value };
              });
            }}
          >
            <Option value="Admin">Admin</Option>
            <Option value="Normal">Normal</Option>
            <Option value="Production">Production</Option>
          </Select>
          <br></br>
          <Checkbox
            checked={editingProduct?.IsActive}
            onChange={(e) => {
              setEditingProduct((prev) => {
                return { ...prev, IsActive: e.target.checked };
              });
            }}
          >
            IsActive
          </Checkbox>
        </Modal>
      </div>
    </>
  );
};
export default UserEntryTab;

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

  &:hover {
    background-color: #84b0c9;
    color: #fefefe;
  }
`;
