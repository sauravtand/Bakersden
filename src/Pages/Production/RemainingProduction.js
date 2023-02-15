import { Table, DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import Header from "../../Components/Common/Header";
import { GetRemainingProductionGoodsByDatee } from "../../Services/appServices/ProductionService";
import PrintComponent from "../../Components/Common/PrintComponent";
import SearchBar from "../../Components/Common/SearchBar";

const { RangePicker } = DatePicker;

export default function RemainingProduction({ title }) {
  const [remainingProduction, setRemainingProduction] = useState();

  useEffect(() => {
    // const date = new Date().toISOString();
    const date = {
      fromdate: new Date().toISOString().split("T")[0],
      // fromdate: '2022-6-6',
      todate: new Date().toISOString().split("T")[0],
    };
    GetRemainingProductionGoodsByDatee(date, (res) => {
      // console.log("hwllo world", res);
      if (res !== []) {
        setRemainingProduction(res?.RemainingQuantity);

        // console.log(remainingProduction);
      }
    });
  }, []);

  function onDateRangeChange(data) {
    setRemainingProduction();
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
      // console.log(res);
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

  const addname = () => {
    return remainingProduction;
  };

  function onSearch(value) {
    if (value) {
      const filteredData = remainingProduction.filter((item) =>
        item.ItemName.toLowerCase().includes(value.toLowerCase())
      );
      setRemainingProduction(filteredData);
    }
  }

  return (
    <>
      <div className="mainContainer">
        <Header title={"Remaining Production"}></Header>
        <div
          style={{
            display: "flex",
            marginBottom: "10px",
            justifyContent: "space-between",
          }}
        >
          {" "}
          <RangePicker
            onChange={(value) => {
              onDateRangeChange(value);
            }}
          />
          <SearchBar onSearch={onSearch} />
        </div>

        <PrintComponent
          addname={addname}
          // remainingProduction={remainingProduction}
          headers={headers}
          forCSV
          forPrint
        />
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
