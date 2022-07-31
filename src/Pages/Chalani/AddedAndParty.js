import styled from "styled-components";
import AddProduct from "./AddProducts";
import { useState } from "react";
import EachItem from "./EachItem";
import { Button, Col, message, Row, Select } from "antd";
import { DatePicker, Form } from "antd";
import {
  GetBranchLists,
  UpdateChalanItem,
  UpdateDeliveryChalani,
} from "../../Services/appServices/ProductionService";
import { generateUrlEncodedData } from "../../Services/utils/generateUrlEncodedData";
import moment from "moment";
import TextArea from "antd/lib/input/TextArea";
// import { PartyDetail } from "../../Helpers/Dummydata";
import { useEffect } from "react";

const { Option } = Select;
const AddedAndParty = () => {
  const [items, setItems] = useState();
  const [form] = Form.useForm();
  const [BakeryDetail, setBakeryDetail] = useState();
  const [BakeryBranch, setBakeryBranch] = useState();
  // console.log("PartyDetail", PartyDetail)

  const handleSelected = (e) => {
    // console.log("ee", e)
    const dataIndex = BakeryBranch.find((el) => el.BId == e);
    // console.log("data index", dataIndex)
    setBakeryDetail(dataIndex);
  };

  const handleAllData = (e) => {
    let Party = {
      DCId: 0,
      PartyId: BakeryDetail.BId,
      PartyName: BakeryDetail.BranchName,
      PartyAddress: BakeryDetail.BranchLocation,
      UserId: 1,
      EntryDate: moment().format("YYYY-MM-DD"),
      DeliveryDate: e.Delivery.format("YYYY-MM-DD"),
      Remarks: e.Remarks !== undefined ? e.Remarks : "n/a",
      IssuedBy: 1,
      ReceivedBy: 1,
      ApprovedBy: 1,
      IsActive: true,
    };

    // console.log(Party)
    // return
    let chalaniNo = 0;
    UpdateDeliveryChalani(generateUrlEncodedData(Party), (res) => {
      chalaniNo = res.CreatedId;
      for (let i = 0; i < items.length; i++) {
        let ChalanItems = {
          CId: 0,
          ChalaniNo: chalaniNo,
          ItemId: items[i].productionName,
          Quantity: items[i].productionQuantity,
          Remarks: e.remarks,
          IsActive: true,
        };
        UpdateChalanItem(generateUrlEncodedData(ChalanItems), (res) => {
          if (res.SuccessMsg === true) {
            message.info("Data has been saved!");
            form.resetFields();
            setItems();
          } else {
            message.warning("Error, saving data!");
          }
        });
      }
    });
  };
  const addItems = (item) => {
    if (items === undefined) {
      const newItems = [item];
      setItems(newItems);
    } else {
      let tempArr = [...items];
      const found = items.some((e) => e.productionName === item.productionName);
      if (found) {
        message.warning("item already added");
      } else {
        tempArr.push(item);
      }
      setItems(tempArr);
    }
  };

  const removeProduct = (id) => {
    const remove = [...items].filter((item) => item.productionName !== id);
    setItems(remove);
  };

  useEffect(() => {
    GetBranchLists((res) => {
      // console.log("res 222", res.BranchList);
      setBakeryBranch(res.BranchList);
    });
  }, []);

  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <FormStyled>
            <Form
              name="basic"
              labelCol={{
                span: 5,
              }}
              wrapperCol={{
                span: 24,
              }}
              initialValues={{
                remember: true,
              }}
              autoComplete="off"
              onFinish={handleAllData}
              form={form}
            >
              <h2 style={{ marginBottom: "30px" }}>Branch Details:</h2>

              <Form.Item
                label="Branch Name"
                name="PartyName"
                rules={[
                  {
                    required: true,
                    message: "Please input Party Name!",
                  },
                ]}
              >
                <Select
                  placeholder="Branch Name"
                  showSearch
                  filterOption={(input, option) => {
                    return (
                      option.key.toLowerCase().indexOf(input.toLowerCase()) >=
                        0 ||
                      option.title.toLowerCase().indexOf(input.toLowerCase()) >=
                        0
                    );
                  }}
                  onSelect={(e) => handleSelected(e)}

                  // value={product}
                >
                  {BakeryBranch !== undefined &&
                    BakeryBranch.map((e) => (
                      <Option title={e.BranchName} value={e.BId} key={e.BId}>
                        {e.BranchName}
                      </Option>
                    ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Delivery Date"
                name="Delivery"
                rules={[
                  {
                    required: true,
                    message: "Please input Entry Date!",
                  },
                ]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item label="Remarks" name="Remarks">
                <TextArea rows={6} />
              </Form.Item>

              <Form.Item style={{ margin: "20px 205px" }}>
                <Button type="primary" htmlType="submit">
                  Save Chalani
                </Button>
              </Form.Item>
            </Form>
          </FormStyled>
        </Col>
        <Col span={12}>
          <AddProduct onSubmit={addItems} items={items} />
          <AddedProducts>
            <h2>Added Products:</h2>
            <EachItem items={items} removeProduct={removeProduct} />
          </AddedProducts>
        </Col>
      </Row>
    </>
  );
};

export default AddedAndParty;

const Itemlist = styled.div`
  margin-top: 2%;
  width: 60%;
  margin-left: 2%;
`;

const FormStyled = styled.div`
  padding: 8px 16px;
  border-left: 2px solid #c8cacb;
  border: 2px solid white;
  border-radius: 8px;
  box-shadow: -1px 1px 6px 2px rgba(186, 186, 186, 0.75);
  -webkit-box-shadow: -1px 1px 6px 2px rgba(186, 186, 186, 0.75);
  -moz-box-shadow: -1px 1px 6px 2px rgba(186, 186, 186, 0.75);
  background-color: #fefefe;
`;
const AddedProducts = styled.div`
  padding: 8px 16px;
  height: 405px;
  border: 2px solid "#c8cacb";
  border-radius: 8px;
  box-shadow: -1px 1px 6px 2px rgba(186, 186, 186, 0.75);
  -webkit-box-shadow: -1px 1px 6px 2px rgba(186, 186, 186, 0.75);
  -moz-box-shadow: -1px 1px 6px 2px rgba(186, 186, 186, 0.75);
  background-color: #fefefe;
`;
