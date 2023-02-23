import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Input,
  InputNumber,
  message,
  Modal,
  Table,
  Tag,
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DateTimeBAdge from "../../Components/Common/DateTimeBAdge";
import Header from "../../Components/Common/Header";
import PrintComponent from "../../Components/Common/PrintComponent";
import useToken from "../../Helpers/useToken";
import {
  ApproveDeliveryChalani,
  GetAvailableCountofProductForChalanis,
  GetChalanDetailByDate,
  GetChalanItemDetailsByChalansId,
  GetItemLists,
  UpdateChalanItem,
  UpdateDeliveryChalani,
} from "../../Services/appServices/ProductionService";
import { generateUrlEncodedData } from "../../Services/utils/generateUrlEncodedData";
import AddedProducts from "./AddedProducts";
import AddProduct from "./AddProducts";
///
const { RangePicker } = DatePicker;

const ChalaniTable = (props) => {
  const { reloadTable } = props;
  // const [isEditing, setisEditing] = useState(false);
  const [ProductionList, setProductionList] = useState();
  // const [editingProduct, setEditingProduct] = useState();
  const [ChalaniItemList, setChalaniItemList] = useState();
  // const [modalHeaders, setModalHeaders] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tempPartyDetails, setTempPartyDetails] = useState();
  const [itemList, setItemList] = useState();
  const [reloadOnButtonClick, setReloadOnButtonClick] = useState(false);
  const [editModalVisibility, setEditModalVisibility] = useState(false);

  const { token } = useToken();

  // states for edits

  const [editingProduct, setEditingProduct] = useState();
  const [editingChalani, setEditingChalani] = useState();
  const [deleteModalVisibility, setDeleteModalVisibility] = useState(false);
  const [isApproved, setIsApproved] = useState();
  const [addProductModalVisibility, setAddProductModalVisibility] =
    useState(false);
  const [items, setItems] = useState();
  const [reloadModalTableOnCRUD, setReloadModalTableOnCRUD] = useState(false);
  const [maxCount, setMaxCount] = useState();

  useEffect(() => {
    console.log(editingProduct, "this change in editing product");
    console.log(editingChalani, "this change in editingChalani ");
    console.log(items, "items log");
  }, [editingProduct, editingChalani, items]);

  useEffect(() => {
    setChalaniItemList();
    setTempPartyDetails();
    handlePreview(editingChalani);
  }, [reloadModalTableOnCRUD]);

  useEffect(() => {
    // const date = new Date().toISOString();

    GetItemLists((res) => {
      if (res?.ItemList.length > 0) {
        setItemList(res.ItemList);
      }
    });
  }, []);

  useEffect(() => {
    if (reloadTable) {
      getTableData();
    }
  }, [reloadTable]);

  useEffect(() => {
    // const date = new Date().toISOString();
    const date = {
      fromdate: new Date().toISOString(),
      // fromdate: '2022-6-6',
      todate: new Date().toISOString(),
    };
    GetChalanDetailByDate(date, (res) => {
      if (res !== []) {
        if (res?.chalandetails?.length > 0) {
          setProductionList(res?.chalandetails);
        }
      }
    });
    setReloadOnButtonClick(false);
  }, [reloadOnButtonClick]);

  function onDateRangeChange(data) {
    setProductionList();
    let newData = {
      fromdate: data[0].format("YYYY-MM-DD"),
      todate: data[1].format("YYYY-MM-DD"),
    };
    getTableData(newData);
  }

  function getTableData(date) {
    GetChalanDetailByDate(date, (res) => {
      if (res?.chalandetails.length > 0) {
        setProductionList(res?.chalandetails);
      }
    });
  }

  const handlePreview = (val) => {
    setTempPartyDetails(val);

    GetChalanItemDetailsByChalansId(val?.DCId, (res) => {
      if (res?.chalandetails?.length > 0) {
        // setChalaniItemList(res.chalandetails);

        let tempArr = [];
        let temp;
        res.chalandetails.map((e, index) => {
          let newItemName = "";
          itemList.forEach((res) => {
            if (res.itmId === e.ItemId) {
              newItemName = res.ItmName;
            }
          });
          temp = {
            SN: index + 1,
            "Item Name": newItemName,
            Issuer: val.IssuedUser,

            ...e,
          };
          tempArr.push(temp);
        });

        setChalaniItemList(tempArr);
      }
    });
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setEditingProduct();
    setEditingChalani();
    setIsModalVisible(false);
    setIsApproved();
  };

  const handleApprove = (e) => {
    let data = {
      chalanId: e.DCId,
      userId: e.UserId,
    };

    ApproveDeliveryChalani(data, (res) => {
      if (res.SuccessMsg === true) {
        // console.log("success");

        if (token) {
          let Party = {
            ApprovedBy: token.id,
            Approver: token.userName,
            DCId: e.DCId,
            PartyId: e.PartyId,
            PartyName: e.PartyName,
            PartyAddress: e.PartyAddress,
            UserId: e.UserId,
            EntryDate: e.EntryDate,
            DeliveryDate: e.DeliveryDate,
            Remarks: e.Remarks,
            IssuedBy: e.IssuedBy,
            IssuedUser: e.IssuedUser,
            ReceivedBy: token.id,
            ReceivedUser: token.userName,
            IsActive: e.IsActive,
          };
          UpdateDeliveryChalani(generateUrlEncodedData(Party), (res) => {
            if (res.SuccessMsg === true) {
              message.success("Approved Successfully");
              setReloadOnButtonClick(true);
            } else {
              message.warning("Error, saving data!");
            }
          });
        }
      } else {
        console.log("Error!!!!!!!!!!!");
      }
    });
  };

  const columns = [
    {
      title: "DCId",
      dataIndex: "DCId",
      key: "DCId",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.DCId - b.DCId,
    },
    {
      title: "Branch Name",
      dataIndex: "PartyName",
      key: "PartyName",
    },
    {
      title: "Address",
      dataIndex: "PartyAddress",
      key: "PartyAddress",
    },
    {
      title: "EntryDate",
      dataIndex: "EntryDate",
      key: "EntryDate",
      render: (val) => <DateTimeBAdge data={val} />,
    },
    {
      title: "DeliveryDate",
      dataIndex: "DeliveryDate",
      key: "DeliveryDate",
      render: (val) => <DateTimeBAdge data={val} />,
    },

    {
      title: "Remarks",
      dataIndex: "Remarks",
      key: "Remarks",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        // console.log(record, "this log");
        return (
          <>
            <CIcon
              onClick={() => {
                setIsApproved(record.ApprovedBy);
                setEditingChalani(record);

                handlePreview(record);
                setIsModalVisible(true);
              }}
            >
              <EditOutlined />
              <span>View</span>
              {/* <Button >
                <FcPrint style={{ marginRight: '5px', fontSize: '20px' }} /> Print
              </Button> */}
            </CIcon>
          </>
        );
      },
    },
    {
      title: "Approve Status",
      key: "approve",
      render: (_, record) => {
        return (
          <>
            <Button
              onClick={(e) => {
                handleApprove(record);
                // console.log("recod", record);
              }}
              // disabled={record.DCId ? false : true}
              // isApproved={isApproved}
              disabled={record.ApprovedBy !== 0 ? true : false}
              style={{
                backgroundColor: record.ApprovedBy !== 0 ? "#067d01" : "",
                borderWidth: "1.5px",
                color: record.ApprovedBy !== 0 ? "white" : "black",
              }}
            >
              {record.ApprovedBy !== 0 ? "Approved" : "Approve"}
            </Button>
          </>
        );
      },
    },
  ];

  const columnsChalan = [
    {
      title: "SN",
      dataIndex: "SN",
      key: "SN",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.SN - b.SN,
    },
    {
      title: "Name",
      dataIndex: "ItemId",
      key: "ItemId",
      render: (text, record) => {
        const a = itemList.map((res) => {
          if (res.itmId === text) return res.ItmName;
          else return "";
        });
        return a;
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
      title: "IsDeleted",
      dataIndex: "IsActive",
      key: "IsActive",
      render: (record, text) => {
        if (record) {
          return <Tag color={"green"}>Not Deleted</Tag>;
        } else {
          return <Tag color={"volcano"}>Deleted</Tag>;
        }
      },
    },
    {
      title: "Remarks",
      dataIndex: "Remarks",
      key: "Remarks",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        console.log(record);

        return (
          <>
            {record.IsActive && (
              <div
                style={{
                  display: "flex",
                  width: 125,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <CIcon onClick={() => onEditButtonClick(record)}>
                  <EditOutlined />
                  <span>Edit</span>
                  {/* <Button >
                <FcPrint style={{ marginRight: '5px', fontSize: '20px' }} /> Print
              </Button> */}
                </CIcon>
                <CIconDelete
                  onClick={() => {
                    onDeleteModalClick(record);
                  }}
                >
                  <DeleteOutlined />
                  <span>Delete</span>
                  {/* <Button >
                <FcPrint style={{ marginRight: '5px', fontSize: '20px' }} /> Print
              </Button> */}
                </CIconDelete>
              </div>
            )}
          </>
        );
      },
    },
  ];
  //CSV
  const headers = [
    { label: "DCId", key: "DCId" },
    { label: "PartyName", key: "PartyName" },
    { label: "PartyAddress", key: "PartyAddress" },
    // { label: 'Quantity', key: 'Quantity' },
    { label: "EntryDate", key: "EntryDate" },
    { label: "DeliveryDate", key: "DeliveryDate" },
    { label: "Remarks", key: "Remarks" },
  ];

  //===print and CSV for Modal===//
  // modal headers
  const modalHeaders = [
    // { label: "CId", key: "CId" },
    { label: "SN", key: "SN" },
    { label: "Item Name", key: "ItemId" },
    { label: "Quantity", key: "Quantity" },
    { label: "Remarks", key: "Remarks" },
  ];

  useEffect(() => {
    console.log(maxCount, "this max count");
  }, [maxCount]);

  const onEditButtonClick = (e) => {
    setEditingProduct(e);
    setEditModalVisibility(!editModalVisibility);
    GetItemMaxCount(e.ItemId);
  };
  const onDeleteModalClick = (e) => {
    setEditingProduct(e);
    setDeleteModalVisibility(!deleteModalVisibility);
  };

  const onEditSave = () => {
    let ChalanItems = {
      CId: editingProduct.CId,
      ChalaniNo: editingProduct.ChalaniNo,
      ItemId: editingProduct.ItemId,
      Quantity: editingProduct.Quantity,
      Remarks: editingProduct.Remarks,
      IsActive: true,
    };
    // console.log(ChalanItems, "data");

    if (editingProduct.Quantity > maxCount) {
      message.warning("Product Quantity not enough!");
    } else if (editingProduct.Quantity < 1) {
      message.warning("Quantity cannot be zero!");
    } else {
      UpdateChalanItem(generateUrlEncodedData(ChalanItems), (res) => {
        if (res.SuccessMsg === true) {
          message.info("Product edited successfully");
          setReloadModalTableOnCRUD(!reloadModalTableOnCRUD);
          setEditModalVisibility(!editModalVisibility);
          setMaxCount();
        } else {
          message.warning("Error, saving data!");
        }
      });
    }
  };
  const onDelete = () => {
    let ChalanItems = {
      CId: editingProduct.CId,
      ChalaniNo: editingProduct.ChalaniNo,
      ItemId: editingProduct.ItemId,
      Quantity: editingProduct.Quantity,
      Remarks: editingProduct.Remarks,
      IsActive: false,
    };
    console.log(ChalanItems, "data");
    UpdateChalanItem(generateUrlEncodedData(ChalanItems), (res) => {
      if (res.SuccessMsg === true) {
        setReloadModalTableOnCRUD(!reloadModalTableOnCRUD);

        message.info("Product deleted successfully");
      } else {
        message.warning("Error, saving data!");
      }
    });
  };

  if (editingProduct) {
    var secondKey = Object.keys(editingProduct)[1];
  }
  // Adding products in modal

  const addItems = (item) => {
    if (items === undefined) {
      const newItems = [item];
      setItems(newItems);
    } else {
      let tempArr = [...items];
      const found = items.some((e) => e.productionName === item.productionName);
      if (found) {
        message.warning("item already added");
      } else {
        tempArr.push(item);
      }
      setItems(tempArr);
    }
  };
  const removeProduct = (id) => {
    const remove = [...items].filter((item) => item.productionName !== id);
    setItems(remove);
  };

  const handleSaveDataOfAddProductModal = () => {
    for (let i = 0; i < items.length; i++) {
      let ChalanItems = {
        CId: 0,
        ChalaniNo: editingChalani.DCId,
        ItemId: items[i].productionName,
        Quantity: items[i].productionQuantity,
        Remarks: "n/a",
        IsActive: true,
      };
      UpdateChalanItem(generateUrlEncodedData(ChalanItems), (res) => {
        if (res.SuccessMsg === true) {
          console.log(res);
          message.success("Products added successfully.");
          setItems();
        } else {
          message.warning("Error, saving data!");
        }
      });
    }
    setReloadModalTableOnCRUD(!reloadModalTableOnCRUD);
    setAddProductModalVisibility(false);
  };

  const GetItemMaxCount = (e) => {
    const data = {
      fromdate: moment().format("YYYY-MM-DD"),
      id: e,
    };

    GetAvailableCountofProductForChalanis(data, (res) => {
      setMaxCount(res.AvailableQuantity[0].Column1);
    });
  };

  return (
    <div className="mainContainer">
      <Header title={"View Chalani"}></Header>

      <div
        style={{
          marginBottom: "8px",
        }}
      >
        <PrintComponent
          ProductionList={ProductionList}
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

      <div>
        <Table
          columns={columns}
          dataSource={ProductionList !== undefined ? ProductionList : ""}
          scroll={{
            y: 340,
          }}
        />
      </div>
      <Modal
        width={950}
        title="Product List"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[]}
      >
        {
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              {!isApproved && (
                <Button
                  style={{ marginRight: 13 }}
                  onClick={() => setAddProductModalVisibility(true)}
                >
                  Add More Products
                </Button>
              )}
              <div>
                <PrintComponent
                  modalHeaders={modalHeaders}
                  ChalaniItemList={ChalaniItemList}
                  forCSV
                  forPrint
                  tempPartyDetails={tempPartyDetails}
                />
              </div>
            </div>

            <Table
              style={{ marginTop: "40px" }}
              columns={
                isApproved
                  ? columnsChalan.slice(0, columnsChalan.length - 1)
                  : columnsChalan
              }
              dataSource={ChalaniItemList}
              scroll={{
                y: 160,
              }}
            />
          </>
        }
      </Modal>
      <Modal
        title="Edit Product"
        okText="Save"
        onOk={() => {
          onEditSave();
        }}
        width={300}
        visible={editModalVisibility}
        onCancel={() => {
          setEditModalVisibility(false);
          setMaxCount();
        }}
      >
        Name:{" "}
        <Input
          style={{ marginBottom: 10 }}
          disabled
          value={editingProduct ? editingProduct[secondKey] : null}
        />
        Quantity:
        <span style={{ marginLeft: "8px", color: "red" }}>
          {`${maxCount !== undefined ? `Max count : ${maxCount}` : ""}`}
        </span>
        <InputNumber
          min={0}
          style={{ width: "100%" }}
          value={editingProduct?.Quantity}
          onChange={(e) => {
            setEditingProduct((prev) => {
              return { ...prev, Quantity: e };
            });
          }}
        />
      </Modal>
      <Modal
        okText="Yes"
        onOk={() => {
          onDelete();
          setDeleteModalVisibility(!deleteModalVisibility);
        }}
        width={300}
        visible={deleteModalVisibility}
        onCancel={() => {
          setDeleteModalVisibility(false);
        }}
      >
        Are you sure you want to delete the product?
      </Modal>
      <Modal
        okText="Yes"
        onOk={() => {
          setAddProductModalVisibility(!deleteModalVisibility);
        }}
        width={"75%"}
        visible={addProductModalVisibility}
        onCancel={() => {
          setAddProductModalVisibility(false);
        }}
        footer={null}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div style={{ width: "35%", marginRight: "15px" }}>
            <AddProduct heightForModal={true} onSubmit={addItems} />
          </div>
          <div style={{ width: "60%", marginRight: "20px" }}>
            <ProductsContainer>
              <h2>Added Products:</h2>
              <AddedProducts
                heightForModal={true}
                items={items}
                removeProduct={removeProduct}
              />
            </ProductsContainer>
          </div>
        </div>

        <div
          style={{
            width: "50%",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "15px",
          }}
        >
          <Button
            type="primary"
            style={{
              width: "100%",
              fontSize: 16,
              fontWeight: "500",
              // padding: "12px",
              // textAlign: "center",
              // display: "flex",
              // alignItems: "center",
            }}
            onClick={() => handleSaveDataOfAddProductModal()}
          >
            Save
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ChalaniTable;

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
const CIconDelete = styled.div`
  border: 1px solid red;
  cursor: pointer;
  width: 60px;
  height: 24px;
  border-radius: 4px;
  color: red;
  display: flex;

  justify-content: space-evenly;
  align-items: center;

  /* span{
    margin-left: 16px;
  } */

  &:hover {
    background-color: red;
    color: #fefefe;
  }
`;
const ApproveIcon = styled.div`
  border: 1px solid #84b0c9d5;
  cursor: pointer;
  width: 80px;
  height: 34px;
  border-radius: 2px;
  color: white;
  display: flex;
  background-color: #1890ff;

  justify-content: space-evenly;
  align-items: center;

  /* span{
    margin-left: 16px;
  } */

  &:hover {
    background-color: #1890ff;
    color: #fefefe;
  }
`;

const ProductsContainer = styled.div`
  padding: 8px 16px;
  height: 395px;
  border: 2px solid "#c8cacb";
  border-radius: 8px;
  box-shadow: -1px 1px 6px 2px rgba(186, 186, 186, 0.75);
  -webkit-box-shadow: -1px 1px 6px 2px rgba(186, 186, 186, 0.75);
  -moz-box-shadow: -1px 1px 6px 2px rgba(186, 186, 186, 0.75);
  background-color: #fefefe;
`;
