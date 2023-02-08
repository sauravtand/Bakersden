// import { Table, Tag, Modal, Input, Alert, Switch } from "antd";
// import { useEffect, useState } from "react";
// import Header from "../../Components/Common/Header";
// import {
//   GetListOfUser,
//   GetProductionDetailsDate,
//   InsertUpdateUserDetail,
// } from "../../Services/appServices/ProductionService";
// import { EditOutlined } from "@ant-design/icons";
// import styled from "styled-components";
// import PrintComponent from "../../Components/Common/PrintComponent";

// // import { generateUrlEncodedData } from '../../Services/utils/generateUrlEncodedData';

// const EditUser = () => {
//   const [isEditing, setisEditing] = useState(false);
//   const [userList, setuserList] = useState();
//   const [editingUser, setEditingUser] = useState();
//   const [UserList, setUserList] = useState();

//   // useEffect(() => {
//   //   const { reloadTable, tableAfterReloaded } = props;

//   //   if (reloadTable === true) {
//   //     // getTableData();
//   //     tableAfterReloaded(false);
//   //   }
//   // }, [reloadTable]);
//   useEffect(() => {
//     getTableData();

//     GetListOfUser((res) => {
//       // console.log("item list", res.ItemList);
//       if (res?.UserList.length > 0) {
//         setUserList(res?.UserList);
//         // console.log(itemList);
//       }
//     });
//   }, []);
//   function getTableData() {
//     const date = {
//       fromdate: new Date().toISOString(),
//       todate: new Date().toISOString(),
//     };
//     GetProductionDetailsDate(date, (res) => {
//       if (res?.UserList.length > 0) {
//         setuserList(res?.UserList);
//       }
//     });
//   }

//   useEffect(() => {
//     // const date = new Date().toISOString();
//     // const date = {
//     //   fromdate: new Date().toISOString(),
//     //   todate: new Date().toISOString(),
//     // };
//     GetProductionDetailsDate((res) => {
//       // console.log("hello", res);
//       if (res?.UserList?.length > 0) {
//         setuserList(res?.UserList);
//       }
//     });
//     // addname();
//     // console.log("productList", ProductList);
//   }, [editingUser]);

//   const addName = () => {
//     // setIsChanging(true);
//     let tempArr = [];
//     let temp;
//     if (userList !== undefined) {
//       // console.log("hello wosdfsdfsd");
//       userList.map((e, index) => {
//         let newUserName = "";
//         // if (UserList) {
//         UserList.forEach((res) => {
//           if (res.Id === e.Id) {
//             newUserName = res.UserName;
//           }
//         });
//         // }

//         temp = {
//           UserName: newUserName,
//           ...e,
//         };
//         tempArr.push(temp);
//         // console.log("temp", tempArr);
//       });
//     }
//     return tempArr;
//   };
//   // const localStorageUserData = JSON.parse(localStorage.getUser("userData"));

//   const onFinish = (values) => {
//     let data = {
//       Id: editingUser.Id,
//       UserName: editingUser.UserName,
//       UserRole: editingUser.UserRole,
//       IsActive: editingUser.IsActive,
//     };
//     InsertUpdateUserDetail(data, (res) => {
//       // setisbutdis(false)
//       if (res?.SuccessMsg === true) {
//         <Alert message="The data is saved" type="success" showIcon />;

//         // setisbutdis(false)
//         // onReset()
//       } else {
//         <Alert message="Error" type="Error" showIcon />;

//         // setisbutdis(false)
//       }
//     });
//   };
//   const columns = [
//     {
//       title: "Id",
//       dataIndex: "Id",
//       key: "Id",
//       defaultSortOrder: "descend",
//       sorter: (a, b) => a.PId - b.PId,
//     },
//     {
//       title: "User Name",
//       dataIndex: "UserName",
//       key: "UserName",
//       // render: (text, record) => {
//       //   if (UserList !== undefined) {
//       //     const a = UserList.map((res) => {
//       //       if (res.Id === text) return res.UserName;
//       //       else return "";
//       //     });
//       //     return a;
//       //   }
//       // },
//     },
//     {
//       title: "UserRole",
//       dataIndex: "UserRole",
//       key: "UserRole",
//       //   defaultSortOrder: "descend",
//       //   sorter: (a, b) => a.PId - b.PId,
//     },

//     {
//       title: "IsActive",
//       dataIndex: "IsActive",
//       key: "IsActive",
//       render: (text, value) => {
//         return (
//           <>
//             {text === true ? (
//               <Tag color={"green"}>Active</Tag>
//             ) : (
//               <Tag color={"red"}>InActive</Tag>
//             )}
//           </>
//         );
//       },
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: (_, record) => {
//         return (
//           <>
//             <CIcon
//               onClick={() => {
//                 editUser(record);
//               }}
//             >
//               <EditOutlined />
//               <span>Edit</span>
//               {/* <Button >
//                 <FcPrint style={{ marginRight: '5px', fontSize: '20px' }} /> Print
//               </Button> */}
//             </CIcon>
//           </>
//         );
//       },
//     },
//   ];

//   const editUser = (record) => {
//     setisEditing(true);
//     setEditingUser({ ...record });
//   };
//   const resetEditing = () => {
//     setisEditing(false);
//     setEditingUser(null);
//   };
//   //CSV
//   const headers = [
//     { label: "Id", key: "Id" },
//     { label: "User Name", key: "UserName" },
//     { label: "User Role", key: "UserRole" },
//     { label: "IsActive", key: "IsActive" },
//   ];

//   //Datepicker
//   // const { RangePicker } = DatePicker;
//   // handle change

//   // function onDateRangeChange(data) {
//   //   setuserList();
//   //   let newData = {
//   //     fromdate: data[0].format("YYYY-MM-DD"),
//   //     todate: data[1].format("YYYY-MM-DD"),
//   //   };
//   //   callService(newData);
//   //   // console.log(data);
//   // }
//   // function callService(data) {
//   //   // const date = new Date().toISOString();
//   //   const date = {
//   //     fromdate: data.fromdate,
//   //     todate: data.todate,
//   //   };
//   //   GetProductionDetailsDate(date, (res) => {
//   //     if (res?.UserList && res?.UserList.length > 0) {
//   //       setuserList(res?.UserList);
//   //     }
//   //   });
//   // }
//   return (
//     <div className="mainContainer">
//       <Header title={"View User"}></Header>

//       {/* start of buttons */}
//       {/* //CSV */}
//       <div
//         style={{
//           marginBottom: "8px",
//         }}
//       >
//         <PrintComponent
//           addname={addName}
//           UserList={userList}
//           headers={headers}
//           forCSV
//           forPrint
//         />
//         {/* <RangePicker
//           onChange={(value) => {
//             onDateRangeChange(value);
//           }}
//         /> */}
//       </div>

//       {/* End-of-Buttons */}
//       <div>
//         <Table
//           columns={columns}
//           dataSource={UserList !== undefined ? UserList : ""}
//           scroll={{
//             y: 310,
//           }}
//         />
//         <Modal
//           title="Edit Product"
//           okText="Save"
//           visible={isEditing}
//           onCancel={() => {
//             resetEditing();
//             setisEditing(false);
//           }}
//           onOk={() => {
//             // handleEditing();
//             resetEditing();
//             onFinish();
//           }}
//         >
//           Id:
//           <Input
//             value={editingUser?.Id}
//             onChange={(e) => {
//               setEditingUser((prev) => {
//                 return { ...prev, Id: e.target.value };
//               });
//             }}
//             disabled="disabled"
//           />
//           {/* Item Id:{" "}
//           <Input
//             value={editingProduct?.ItemId}
//             onChange={(e) => {
//               setEditingProduct((prev) => {
//                 return { ...prev, ItemId: e.target.value };
//               });
//             }}
//             disabled="disabled"
//           /> */}
//           User Name:{" "}
//           <Input
//             value={editingUser?.UserNames}
//             onChange={(e) => {
//               setEditingUser((prev) => {
//                 return { ...prev, UserName: e.target.value };
//               });
//             }}
//           />
//           User Role:{" "}
//           <Input
//             value={editingUser?.UserRole}
//             onChange={(e) => {
//               setEditingUser((prev) => {
//                 return { ...prev, UserRole: e.target.value };
//               });
//             }}
//           />
//           IsActive: <br />
//           <Switch defaultChecked disabled="disabled" />
//         </Modal>
//       </div>
//     </div>
//   );
// };
// export default EditUser;

// const CIcon = styled.div`
//   border: 1px solid #84b0c9d5;
//   cursor: pointer;
//   width: 60px;
//   height: 24px;
//   border-radius: 4px;
//   color: #84b0c9;
//   display: flex;
//   justify-content: space-evenly;
//   align-items: center;

//   /* span{
//     margin-left: 16px;
//   } */

//   &:hover {
//     background-color: #84b0c9;
//     color: #fefefe;
//   }
// `;
