import React, { useState, useEffect } from "react";
import { Table, Form, DatePicker } from "antd";
import { GetDayWiseProductionStockDetail } from "../../Services/appServices/ProductionService";
import Header from "../../Components/Common/Header";
import styled from "styled-components";
import PrintComponent from "../../Components/Common/PrintComponent";
import SearchBar from "../../Components/Common/SearchBar";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const ReportTable = (props) => {
  const [date, setDate] = useState(null);
  const [ProductList, setProductList] = useState();
  const [itemList, setItemList] = useState();

  useEffect(() => {
    const date = {
      stockDate: new Date().toISOString(),
    };
    GetDayWiseProductionStockDetail(date, (res) => {
      if (res?.Stock?.length > 0) {
        setProductList(res?.Stock);
      }
    });
  }, []);

  const columns = [
    {
      title: "ItemId",
      dataIndex: "ItemId",
      key: "ItemId",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.PId - b.PId,
    },
    {
      title: "Item Name",
      dataIndex: "ItemName",
      key: "ItemName",
    },
    {
      title: "Opening Stock",
      dataIndex: "Opening",
      key: "Opening",
    },

    {
      title: "Production",
      dataIndex: "Production",
      key: "Production",
    },
    {
      title: "Total",
      dataIndex: "Total",
      key: "Total",
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

  function onDateRangeChange(data) {
    setProductList();
    let newData = {
      stockDate: data,
    };
    callService(newData);
  }
  function callService(data) {
    const date = {
      stockDate: data.stockDate,
    };
    GetDayWiseProductionStockDetail(date, (res) => {
      if (res?.Stock && res?.Stock.length > 0) {
        setProductList(res?.Stock);
      }
    });
  }
  const headers = [
    // { label: "ItemId", key: "itmId" },
    { label: "ItemId", key: "ItemId" },
    { label: "ItemName", key: "ItemName" },
    { label: "Opening", key: "Opening" },
    { label: "Production", key: "Production" },
    { label: "Total", key: "Total" },
    { label: "Consumption", key: "Consumption" },
    { label: "Remaining", key: "Remaining" },
  ];

  const addname = () => {
    return ProductList;
  };
  function onSearch(value) {
    if (value) {
      const filteredData = ProductList.filter((item) =>
        item.ItemName.toLowerCase().includes(value.toLowerCase())
      );
      setProductList(filteredData);
    }
  }

  return (
    <>
      <Top>
        <Header title="Stock Detail"></Header>
        <div
          style={{
            display: "flex",
            marginBottom: "10px",
            justifyContent: "space-between",
          }}
        >
          <div>
            <DatePicker
              style={{ width: 300 }}
              onChange={(value) =>
                onDateRangeChange(value.format("YYYY-MM-DD"))
              }
            />
          </div>
          <SearchBar onSearch={onSearch} />
          <div>
            <PrintComponent
              addname={addname}
              headers={headers}
              forCSV
              forPrint
            />
          </div>
        </div>
      </Top>

      <div>
        <Table
          className="mainContainer"
          columns={columns}
          dataSource={ProductList !== undefined ? ProductList : ""}
        />
      </div>
    </>
  );
};

export default ReportTable;

const Top = styled.div`
  background-color: #fefefe;
  padding: 10px;
  box-shadow: 1px 2px 2px #b0bccea6;
  border-radius: 8px;
  overflow: hidden;
  min-height: 100px;
  margin-bottom: 8px;
  box-shadow: -1px 1px 6px 2px rgba(186, 186, 186, 0.75);
  -webkit-box-shadow: -1px 1px 6px 2px rgba(186, 186, 186, 0.75);
  -moz-box-shadow: -1px 1px 6px 2px rgba(186, 186, 186, 0.75);
`;
