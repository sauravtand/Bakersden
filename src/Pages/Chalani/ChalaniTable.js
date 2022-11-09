import { EditOutlined } from "@ant-design/icons";
import { Button, DatePicker, message, Modal, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DateTimeBAdge from "../../Components/Common/DateTimeBAdge";
import Header from "../../Components/Common/Header";
import PrintComponent from "../../Components/Common/PrintComponent";
import useToken from "../../Helpers/useToken";
import {
  ApproveDeliveryChalani,
  GetChalanDetailByDate,
  GetChalanItemDetailsByChalansId,
  GetItemLists,
  UpdateDeliveryChalani,
} from "../../Services/appServices/ProductionService";
import { generateUrlEncodedData } from "../../Services/utils/generateUrlEncodedData";
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

  const { token } = useToken();

  useEffect(() => {
    // const date = new Date().toISOString();

    GetItemLists((res) => {
      // console.log("item list", res.ItemList);
      if (res?.ItemList.length > 0) {
        setItemList(res.ItemList);
        // console.log(itemList);
      }
    });
    // console.log("token,token", token);
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
        if (res?.chalandetails.length > 0) {
          setProductionList(res?.chalandetails);
        }
      }
    });
    setReloadOnButtonClick(false);
  }, [reloadOnButtonClick]);

  // setTimeout(() => {
  //   console.log(ProductionList, "hellomf");
  // }, 2000);

  function onDateRangeChange(data) {
    setProductionList();
    let newData = {
      fromdate: data[0].format("YYYY-MM-DD"),
      todate: data[1].format("YYYY-MM-DD"),
    };
    getTableData(newData);
    // console.log(data);
  }

  function getTableData(date) {
    GetChalanDetailByDate(date, (res) => {
      if (res?.chalandetails.length > 0) {
        setProductionList(res?.chalandetails);
      }
    });
  }

  // console.log(ProductList)
  const handlePreview = (val) => {
    console.log("e", val);
    setTempPartyDetails(val);

    // console.log(tempPartyDetails);
    setIsModalVisible(true);

    GetChalanItemDetailsByChalansId(val.DCId, (res) => {
      if (res.chalandetails.length > 0) {
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
            Approver: val.Approver,
            Issuer: val.IssuedUser,
            ...e,
          };
          tempArr.push(temp);
        });

        // console.log("temp arr", tempArr);
        setChalaniItemList(tempArr);
      }
    });
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleApprove = (e) => {
    // console.log("e", e);
    let data = {
      chalanId: e.DCId,
      userId: e.UserId,
    };

    ApproveDeliveryChalani(data, (res) => {
      if (res.SuccessMsg === true) {
        console.log("success");

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
              // console.log("Successssss", res, Party);
              message.success("Approved Successfully");
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

  // useEffect(() => {
  //   console.log(approveUser, "aproveUser");
  //   console.log("ProductionList", ProductionList);
  // }, [approveUser]);

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
        return (
          <>
            <CIcon
              onClick={() => {
                handlePreview(record);
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
                setReloadOnButtonClick(true);
              }}
              // disabled={record.DCId ? false : true}
              // isApproved={isApproved}
              disabled={record.ApprovedBy !== 0 ? true : false}
              style={{
                borderColor: record.ApprovedBy !== 0 ? "red" : "green",
                borderWidth: "1.5px",
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
      title: "Remarks",
      dataIndex: "Remarks",
      key: "Remarks",
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
            console.log(value, "onchangevalue");
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
        width={900}
        title="Product List"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[]}
      >
        {
          <>
            <PrintComponent
              modalHeaders={modalHeaders}
              ChalaniItemList={ChalaniItemList}
              forCSV
              forPrint
              tempPartyDetails={tempPartyDetails}
            />

            <Table
              style={{ marginTop: "40px" }}
              columns={columnsChalan}
              dataSource={ChalaniItemList}
              scroll={{
                y: 160,
              }}
            />
          </>
        }
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
