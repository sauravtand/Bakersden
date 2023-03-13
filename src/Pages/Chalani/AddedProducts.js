import { Table, Space, Button } from "antd";
import { useEffect, useState } from "react";
import { GetItemLists } from "../../Services/appServices/ProductionService";

const AddedProducts = ({ items, removeProduct }) => {
  const [itemList, setItemList] = useState();
  useEffect(() => {
    GetItemLists((res) => {
      if (res?.ItemList.length > 0) {
        setItemList(res.ItemList);
      }
    });
  }, []);

  const columns = [
    {
      title: "Item Name",
      dataIndex: "productionName",
      key: "productionName",
      render: (text, record) => {
        if (itemList !== undefined) {
          const a = itemList.map((res) => {
            if (res.itmId === text) return res.ItmName;
            else return "";
          });
          return a;
        }
      },
    },
    {
      title: "Quantity",
      dataIndex: "productionQuantity",
      key: "productionQuantity",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="danger"
            onClick={() => removeProduct(record.productionName)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  // useEffect(() => {
  //   head()
  // }, [])

  // const head = () =>{
  //   headersData(columns)
  // }

  return (
    <div style={{ width: "100%" }}>
      <Table
        columns={columns}
        dataSource={items}
        style={{ height: "220px" }}
        scroll={{
          y: 240,
        }}
      />
    </div>
  );
};

export default AddedProducts;

// const Table = styled.div`
// // border: 2px solid black;//
// `
