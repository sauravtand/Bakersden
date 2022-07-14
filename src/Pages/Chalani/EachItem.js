import { Table, Space, Button } from "antd";

const EachItem = ({ items, removeProduct }) => {
  const dummydata = [
    {
      name: "Dark Forest",
      price: "20",
      id: 1,
    },
    {
      name: "Red valvet",
      price: "110",
      id: 2,
    },
    {
      name: "White Forest",
      price: "200",
      id: 3,
    },
    {
      name: "Butter Scothc Cake",
      price: "2500",
      id: 4,
    },
    {
      name: "Banana Vake",
      price: "2500",
      id: 5,
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "productionName",
      key: "productionName",
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

export default EachItem;

// const Table = styled.div`
// // border: 2px solid black;//
// `
