import { Table, DatePicker, Button, message, Tag } from "antd";
import React, { useEffect, useState } from "react";
import Header from "../../Components/Common/Header";
import { GetRemainingProductionGoodsByDatee } from "../../Services/appServices/ProductionService";
import { CSVLink } from "react-csv";
import { newTableStyles } from "../../Components/Common/TableStyles";
const { RangePicker } = DatePicker;

export default function RemainingProduction() {
  const [remainingProduction, setRemainingProduction] = useState();

  useEffect(() => {
    // const date = new Date().toISOString();
    const date = {
      fromdate: new Date().toISOString().split("T")[0],
      // fromdate: '2022-6-6',
      todate: new Date().toISOString().split("T")[0],
    };
    GetRemainingProductionGoodsByDatee(date, (res) => {
      console.log("hwllo world", res);
      if (res !== []) {
        setRemainingProduction(res?.RemainingQuantity);

        console.log(remainingProduction);
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
    GetRemainingProductionGoodsByDatee(date, (res) => {
      if (res?.RemainingQuantity.length > 0) {
        setRemainingProduction(res?.RemainingQuantity);
      }
      console.log(res);
    });
  }
  // columns
  const columns = [
    {
      title: "Item Id",
      dataIndex: "itemId",
      key: "itemId",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.itemId - b.itemId,
    },
    {
      title: "Item Name",
      dataIndex: "ItemName",
      key: "ItemName",
    },
    {
      title: "Production",
      dataIndex: "Production",
      key: "Production",
      sorter: (a, b) => a.Production - b.Production,
    },
    {
      title: "Consumption",
      dataIndex: "Consumption",
      key: "Consumption",
      sorter: (a, b) => a.Consumption - b.Consumption,
    },
    {
      title: "Remaining",
      dataIndex: "Remaining",
      key: "Remaining",
      sorter: (a, b) => a.Remaining - b.Remaining,
    },
  ];
  //====CSV and Print========//
  const headers = [
    { label: "Item Id", key: "itemId" },
    { label: "Item Name", key: "ItemName" },
    { label: "Production", key: "Production" },
    { label: "Consumption", key: "Consumption" },
    { label: "Remaining", key: "Remaining" },
  ];
  const printHandle = () => {
    if (remainingProduction !== 0) {
      let newWindow = window.open();

      let newStyle = ``;

      newStyle = `<style>thead > tr> th:first-child, thead > tr> th:nth-child(2), tbody > tr > td:first-child,tbody > tr > td:nth-child(2){
        
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
        //console.log(ele.label);
        tableHeadHtml += `<th>${ele?.label}</th>`;
        columns.push(ele.key);
      });
      tableHeadHtml += "</thead>";
      //console.log(remainingProduction);
      remainingProduction.forEach((ele) => {
        tableBody = tableBody + "<tr>";
        columns.forEach((cell) => {
          console.log(ele, cell);
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

  return (
    <>
      <div className="mainContainer">
        <Header title={"Remaining Production"}></Header>

        <RangePicker
          onChange={(value) => {
            onDateRangeChange(value);
          }}
        />
        <Button
          type="primary"
          style={{ marginLeft: "16px", float: "right" }}
          onClick={printHandle}
        >
          Print
        </Button>
        <Button type="primary" style={{ float: "right" }}>
          <CSVLink
            data={remainingProduction !== undefined ? remainingProduction : ""}
            filename={"RemainingProduction.csv"}
          >
            Export to CSV
          </CSVLink>
        </Button>
        <Table
          style={{ marginTop: "15px" }}
          columns={columns}
          dataSource={
            remainingProduction !== undefined ? remainingProduction : ""
          }
          scroll={{
            y: 340,
          }}
        />
      </div>
    </>
  );
}
