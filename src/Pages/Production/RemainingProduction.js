import { Table, DatePicker, Button } from "antd";
import React, { useEffect, useState } from "react";
import Header from "../../Components/Common/Header";
import { GetRemainingProductionGoodsByDatee } from "../../Services/appServices/ProductionService";
import PrintComponent from "../../Components/Common/PrintComponent";
import moment from "moment";
import SearchBar from "../../Components/Common/SearchBar";

const { RangePicker } = DatePicker;

export default function RemainingProduction({ title }) {
  const [remainingProduction, setRemainingProduction] = useState();
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const date = {
      fromdate: new Date().toISOString().split("T")[0],

      todate: new Date().toISOString().split("T")[0],
    };
    GetRemainingProductionGoodsByDatee(date, (res) => {
      if (res !== []) {
        setRemainingProduction(res?.RemainingQuantity);
      }
    });
  }, []);

  // function onDateRangeChange(data) {
  //   setRemainingProduction();
  //   let newData = {
  //     fromdate: data[0].format("YYYY-MM-DD"),
  //     todate: data[1].format("YYYY-MM-DD"),
  //   };
  //   getTableData(newData);
  // }

  function loadData() {
    setRemainingProduction();
    // console.log(dates[0], dates[1]);
    let newData = {
      fromdate: dates[0],
      todate: dates[1],
    };

    getTableData(newData);

    // console.log(newData, "its new");
  }

  function getTableData(date) {
    GetRemainingProductionGoodsByDatee(date, (res) => {
      if (res?.RemainingQuantity.length > 0) {
        setRemainingProduction(res?.RemainingQuantity);
      }
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
    if (!value) {
      getTableData();
      // If the value is null, reset the table data to the original remaining production data
      setRemainingProduction(remainingProduction);
    }
    const filteredData = remainingProduction.filter((item) =>
      item.ItemName.toLowerCase().includes(value.toLowerCase())
    );
    setRemainingProduction(filteredData);
  }

  return (
    <>
      <div className="mainContainer">
        <Header title={"Remaining Production"}></Header>
        <div
          style={{
            display: "flex",
            marginBottom: "10px",
            justifyContent: "space-around",
            marginLeft: "-4%",
          }}
        >
          <div>
            <RangePicker
              onChange={(values) => {
                setDates(
                  values.map((item) => {
                    return moment(item).format("YYYY-MM-DD");
                  })
                );
              }}
            />
            <Button type="primary" onClick={loadData}>
              Load Data
            </Button>
          </div>
          <SearchBar onSearch={onSearch} />
          <div>
            <PrintComponent
              addname={addname}
              // remainingProduction={remainingProduction}
              headers={headers}
              forCSV
              forPrint
            />
          </div>
        </div>

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
