import { Table, Tag, Modal, Input, Checkbox, Alert, Select } from "antd";
import styled from "styled-components";
import { EditOutlined } from "@ant-design/icons";

import { useEffect, useState } from "react";
import {
  GetListOfUser,
  GetProductionDetailsDate,
  InsertUpdateUserDetail,
} from "../../Services/appServices/ProductionService";
import PrintComponent from "../../Components/Common/PrintComponent";
import { InsertUpdateUserDetails } from "../../Services/constants/url";
const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 20,
  },
};

const UserEntryTab = (props) => {
  const { reloadTable, tableAfterReloaded } = props;
  const [userList, setuserList] = useState();
  const [UserLists, setUserLists] = useState();
  const [isEditing, setisEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState();

  useEffect(() => {
    if (reloadTable === true) {
      // getTableData();
      tableAfterReloaded(false);
    }
  }, [reloadTable]);
  useEffect(() => {
    getTableData();
    GetListOfUser((res) => {
      // console.log(res.UserList, "users");
      setUserLists(res.UserList);
      if (res?.UserList.length > 0) {
        setuserList(res?.ItemList);
      }
    });
  }, []);

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

  const addName = () => {
    let tempArr = [];
    let temp;
    if (userList !== undefined) {
      userList.map((e) => {
        let newUserName = "";
        UserLists.forEach((res) => {
          if (res.Id === e.Id) {
            newUserName = res.UserName;
          }
        });
        temp = {
          UserName: newUserName,
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
      Id: editingProduct.Id,
      // ItemCode: editingProduct.itmCode,
      UserName: editingProduct.UserName,
      UserPassword: editProduct.UserPassword,
      IsActive: editingProduct.IsActive,
      UserRole: editingProduct.UserRole,
    };
    InsertUpdateUserDetail(data, (res) => {
      console.log(data, res, "update");
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
      title: "Id",
      dataIndex: "Id",
      key: "Id",
      sorter: (a, b) => a.Id - b.Id,
      sortOrder: "descend",
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
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        // console.log(record, "this is log123123123123");
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
    // console.log(editingProduct, "main");
  };
  const resetEditing = () => {
    setisEditing(false);
    setEditingProduct(null);
  };
  //CSV
  const headers = [
    // { label: "ItemId", key: "itmId" },
    { label: "User Name", key: "UserName" },
    { label: "User Role ", key: "UserRole" },
    { label: "IsActive", key: "IsActive" },
  ];

  return (
    <>
      <div>
        <PrintComponent
          addname={addName}
          UserList={userList}
          headers={headers}
          forCSV
          forPrint
        />
      </div>

      <div>
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
            // handleEditing();
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

  /* span{
    margin-left: 16px;
  } */

  &:hover {
    background-color: #84b0c9;
    color: #fefefe;
  }
`;
