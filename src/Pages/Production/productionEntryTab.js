import { Table } from "antd";
import { useEffect, useState } from "react";
import {
  GetItemLists,
  GetProductionDetailsDate,
} from "../../Services/appServices/ProductionService";
import PrintComponent from "../../Components/Common/PrintComponent";

const ProductionEntryTab = (props) => {
  const { reloadTable, tableAfterReloaded } = props;
  // const [isEditing, setisEditing] = useState(false);
  const [ProductList, setProductList] = useState();
  // const [editingProduct, setEditingProduct] = useState();
  const [ItemLists, setItemLists] = useState();
  useEffect(() => {
    if (reloadTable === true) {
      getTableData();
      tableAfterReloaded(false);
    }
  }, [reloadTable]);
  useEffect(() => {
    getTableData();
    GetItemLists((res) => {
      setItemLists(res?.ItemList);
    });
  }, []);

  function getTableData() {
    const date = {
      fromdate: new Date().toISOString(),
      todate: new Date().toISOString(),
    };
    GetProductionDetailsDate(date, (res) => {
      if (res?.ItemList.length > 0) {
        setProductList(res?.ItemList);
      }
    });
  }

  const addName = () => {
    let tempArr = [];
    let temp;
    if (ProductList !== undefined) {
      ProductList.map((e) => {
        let newItemName = "";
        ItemLists?.forEach((res) => {
          if (res?.itmId === e.ItemId) {
            newItemName = res.ItmName;
          }
        });
        temp = {
          ItemName: newItemName,
          ...e,
        };
        tempArr.push(temp);
      });
    }
    return tempArr;
  };

  const columns = [
    {
      title: "PId",
      dataIndex: "PId",
      key: "PId",
    },
    {
      title: "Item Name",
      dataIndex: "ItemId",
      key: "ItemId",
      render: (text, record) => {
        let a;
        if (ItemLists !== undefined) {
          a = ItemLists.map((res) => {
            if (res?.itmId === text) return res?.ItmName;
            else return "";
          });
        }
        return a;
      },
    },
    {
      title: "Good for Sale",
      dataIndex: "GoodForSale",
      key: "GoodForSale",
    },
    {
      title: "Spoilage",
      dataIndex: "SpoilageCount",
      key: "SpoilageCount",
    },
    {
      title: "Total Production",
      dataIndex: "TotalProduction",
      key: "TotalProduction",
    },

    {
      title: "Remarks",
      dataIndex: "Remarks",
      key: "Remarks",
    },
  ];
  //CSV
  const headers = [
    { label: "UserId", key: "UserId" },
    { label: "PId", key: "PId" },
    { label: "ItemId", key: "ItemId" },
    { label: "Item Name", key: "ItemName" },
    { label: "Good For Sale ", key: "GoodForSale" },
    { label: "Spoilage", key: "SpoilageCount" },
    { label: "Total Production", key: "TotalProduction" },
    { label: "EntryDate", key: "EntryDate" },
    { label: "Remarks", key: "Remarks" },
  ];
  return (
    <>
      {/* <Button
        type="primary"
        style={{ margin: "20px", float: "right" }}
        onClick={printHandle}
      >
        Print
      </Button>
      <Button type="primary" style={{ margin: "20px 5px", float: "right" }}>
        <CSVLink
          data={ProductList !== undefined ? ProductList : ""}
          filename={"ProductionData.csv"}
        >
          Export to CSV
        </CSVLink>
      </Button> */}
      <PrintComponent
        addname={addName}
        ProductList={ProductList}
        headers={headers}
        forCSV
        forPrint
      />

      <div>
        <Table
          columns={columns}
          dataSource={ProductList !== undefined ? ProductList : ""}
          style={{ height: "490px" }}
          scroll={{
            y: 350,
          }}
        />
      </div>
    </>
  );
};
export default ProductionEntryTab;
