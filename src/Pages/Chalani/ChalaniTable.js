import { EditOutlined } from "@ant-design/icons";
import { Button, DatePicker, message, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import styled from "styled-components";
import DateTimeBAdge from "../../Components/Common/DateTimeBAdge";
import Header from "../../Components/Common/Header";
import { newTableStyles } from "../../Components/Common/TableStyles";
import {
  GetChalanDetailByDate,
  GetChalanItemDetailsByChalansId,
} from "../../Services/appServices/ProductionService";

const { RangePicker } = DatePicker;

const dummydata = [
  {
    name: "Dark Forest",
    price: "20",
    id: 1,
  },
  {
    name: "Red velvet",
    price: "110",
    id: 2,
  },
  {
    name: "White Forest",
    price: "200",
    id: 3,
  },
  {
    name: "Butter Scotch Cake",
    price: "2500",
    id: 4,
  },
  {
    name: "Banana Cake",
    price: "2500",
    id: 5,
  },
];

const ChalaniTable = (props) => {
  const { reloadTable } = props;
  // const [isEditing, setisEditing] = useState(false);
  const [ProductList, setProductList] = useState();
  // const [editingProduct, setEditingProduct] = useState();
  const [ChalaniItemList, setChalaniItemList] = useState();
  // const [modalHeaders, setModalHeaders] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tempPartyDetails, setTempPartyDetails] = useState();
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
          setProductList(res?.chalandetails);
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
        setProductList(res?.chalandetails);
      }
    });
  }
  // console.log(ProductList)
  const handlePreview = (e) => {
    // console.log("e", e)
    setTempPartyDetails(e);
    setIsModalVisible(true);
    let tempArr = [];
    GetChalanItemDetailsByChalansId(e.DCId, (res) => {
      if (res.chalandetails.length > 0) {
        // setChalaniItemList(res.chalandetails);

        let tempArr = [];
        let temp;
        res.chalandetails.map((e, index) => {
          temp = {
            SN: index + 1,
            ...e,
          };
          tempArr.push(temp);
        });

        // console.log("temp arr", tempArr)
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
      title: "PartyName",
      dataIndex: "PartyName",
      key: "PartyName",
    },
    {
      title: "PartyAddress",
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
      title: "ItemId",
      dataIndex: "ItemId",
      key: "ItemId",
      render: (text, record) => {
        const a = dummydata.map((res) => {
          if (res.id === text) return res.name;
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
  // handel print
  const printHandle = () => {
    if (ProductList !== undefined) {
      let newWindow = window.open();

      let newStyle = ``;

      newStyle = `<style>thead > tr> th:first-child, thead > tr> th:nth-child(2), tbody > tr > td:first-child,tbody > tr > td:nth-child(2){
        display: none;
       }tbody > tr:last-child{
    background-color: #f0f0f2;
    }
    tbody > tr:last-child > td{
        font-size: 12px;
        font-weight: 500;
    }</style>`;

      let refName = `
      <div style='text-align:center;'>
          <h1>Baker's Den Pvt.ltd<h1>
          <h3>Naxal, Bhatbhateni, Kathmandu, Phone: 01-4416560<h3>
          <h5>Production Data<h5>
      </div>
    
      `;

      let tableBody = "";
      let tableHeadHtml = "<thead>";
      let columns = [];

      headers.forEach((ele) => {
        tableHeadHtml += `<th>${ele?.label}</th>`;
        columns.push(ele.label);
      });
      tableHeadHtml += "</thead>";

      ProductList.forEach((ele) => {
        tableBody = tableBody + "<tr>";
        columns.forEach((cell) => {
          tableBody = tableBody + "<td>" + ele[cell] + "</td>";
        });
        tableBody = tableBody + "</tr>";
      });

      let allTable = `<table>${tableHeadHtml}${tableBody}</table>`;

      newWindow.document.body.innerHTML =
        newTableStyles + newStyle + refName + allTable;

      setTimeout(function () {
        newWindow.print();
        newWindow.close();
      }, 300);
    } else {
      message.info("select some data");
    }
  };

  //===print and CSV for Modal===//

  // modal headers

  const modalHeaders = [
    { label: "CId", key: "CId" },
    { label: "SN", key: "SN" },
    { label: "SN", key: "SN" },
    { label: "ItemId", key: "ItemId" },
    { label: "Quantity", key: "Quantity" },
    // { label: "Remarks", key: "Remarks" },
  ];
  const modalPrint = () => {
    if (ChalaniItemList !== undefined) {
      let newWindow = window.open();

      let newStyle = ``;

      newStyle = `<style>thead > tr> th:first-child, thead > tr> th:nth-child(2), tbody > tr > td:first-child,tbody > tr > td:nth-child(2){
        display: none;
       }tbody > tr:last-child{
    background-color: #f0f0f2;
    }
    tbody > tr:last-child > td{
        font-size: 12px;
        font-weight: 500;
    }</style>`;

      let refName = `
     
      <div style='text-align:center;'>
          <h1>Baker's Den Pvt.ltd<h1>
          <h3>Naxal, Bhatbhateni, Kathmandu, Phone: 01-4416560<h3>
          <div 
          // style='border: 1px solid black;
          text-align: center;
          padding-left: 2%;
          margin:0 ;'>
           

          <p>Party Name:  ${tempPartyDetails.PartyName}</p>
          <p>Date: ${tempPartyDetails.EntryDate}</p>
          <p>Delivery Date: ${tempPartyDetails.DeliveryDate}</p>
          </div>
          <h2>Chalani Details<h2>
      </div>
      `;
      let footer = `
      <div 
      style='display: flex;
      justify-content: space-between;
      margin-top: 50px;
      '
      >
      <p style='border-top:1px solid black; padding-top: 10px;'>Issued By</p>
      <p style='border-top:1px solid black; padding-top: 10px;'>Received By</p>
      <p style='border-top:1px solid black; padding-top: 10px;'>Approved By</p>
      </div>
      
      `;

      let tableBody = "";
      let tableHeadHtml = "<thead>";
      let columns = [];

      modalHeaders.forEach((ele) => {
        tableHeadHtml += `<th>${ele?.label}</th>`;
        columns.push(ele.label);
      });
      tableHeadHtml += "</thead>";

      ChalaniItemList.forEach((ele) => {
        tableBody = tableBody + "<tr>";
        columns.forEach((cell) => {
          tableBody = tableBody + "<td>" + ele[cell] + "</td>";
        });
        tableBody = tableBody + "</tr>";
      });

      let allTable = `<table>${tableHeadHtml}${tableBody}</table>`;

      newWindow.document.body.innerHTML =
        newTableStyles + newStyle + refName + allTable + footer;

      setTimeout(function () {
        newWindow.print();
        newWindow.close();
      }, 300);
    } else {
      message.info("select some data");
    }
  };

  return (
    <div className="mainContainer">
      <Header title={"View Chalani"}></Header>

      <div
        style={{
          marginBottom: "8px",
        }}
      >
        <Button
          type="primary"
          style={{ marginLeft: "16px", float: "right" }}
          onClick={printHandle}
        >
          Print
        </Button>
        <Button type="primary" style={{ float: "right" }}>
          <CSVLink
            data={ProductList !== undefined ? ProductList : ""}
            filename={"chalaniData.csv"}
          >
            Export to CSV
          </CSVLink>
        </Button>
        <RangePicker
          onChange={(value) => {
            onDateRangeChange(value);
          }}
        />
      </div>

      <div>
        <Table
          columns={columns}
          dataSource={ProductList !== undefined ? ProductList : ""}
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
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            <CSVLink
              data={ChalaniItemList !== undefined ? ChalaniItemList : ""}
              filename={"chalaniItemData.csv"}
            >
              Export to CSV
            </CSVLink>
          </Button>,
          <Button type="primary" onClick={modalPrint}>
            Print
          </Button>,
         
        ]}
      >
        {
          // ChalaniItemList!== undefined &&
          // <>
          // {
          //   ChalaniItemList.map(e => (
          //     <>
          //     <p>{e.ItemId}</p>
          //     <p>{e.Quantity}</p>
          //     <p>{e.Remarks}</p>
          //     </>
          //   ))
          // }
          // </>

          <Table
            columns={columnsChalan}
            dataSource={ChalaniItemList}
            scroll={{
              y: 140,
            }}
          />
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
