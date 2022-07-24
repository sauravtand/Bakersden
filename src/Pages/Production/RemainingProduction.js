import { Table, DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import Header from "../../Components/Common/Header";
import { GetRemainingProductionGoodsByDatee } from "../../Services/appServices/ProductionService";
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
    },
    {
      title: "Consumption",
      dataIndex: "Consumption",
      key: "Consumption",
    },
    {
      title: "Remaining",
      dataIndex: "Remaining",
      key: "Remaining",
    },
  ];

  return (
    <>
      <div className="mainContainer">
        <Header title={"Remaining Production"}></Header>

        <RangePicker
          onChange={(value) => {
            onDateRangeChange(value);
          }}
        />
        <Table
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
