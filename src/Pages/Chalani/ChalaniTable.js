import { EditOutlined } from "@ant-design/icons";
import { DatePicker, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DateTimeBAdge from "../../Components/Common/DateTimeBAdge";
import Header from "../../Components/Common/Header";
import PrintComponent from "../../Components/Common/PrintComponent";
import {
  GetChalanDetailByDate,
  GetChalanItemDetailsByChalansId,
  GetItemLists,
} from "../../Services/appServices/ProductionService";

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
  useEffect(() => {
    // const date = new Date().toISOString();

    GetItemLists((res) => {
      // console.log("item list", res.ItemList);
      if (res?.ItemList.length > 0) {
        setItemList(res.ItemList);
        // console.log(itemList);
      }
    });
  }, []);

  useEffect(() => {
    if (reloadTable === true) {
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
  }, []);

  function onDateRangeChange(data) {
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
  const handlePreview = (e) => {
    // console.log("e", e)
    setTempPartyDetails(e);
    console.log(tempPartyDetails);
    setIsModalVisible(true);

    GetChalanItemDetailsByChalansId(e.DCId, (res) => {
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
