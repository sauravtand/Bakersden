import styled from "styled-components";
import AddProduct from "./AddProducts";
import { useState } from "react";
import AddedProducts from "./AddedProducts";
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
import Header from "../../Components/Common/Header";
import useToken from "../../Helpers/useToken";

const { Option } = Select;
const AddedAndParty = () => {
  const [items, setItems] = useState();
  const [form] = Form.useForm();
  const [BakeryDetail, setBakeryDetail] = useState();
  const [BakeryBranch, setBakeryBranch] = useState();
  const { token } = useToken();

  const handleSelected = (e) => {
    const dataIndex = BakeryBranch.find((el) => el.BId === e);

    setBakeryDetail(dataIndex);
  };

  const handleAllData = (e) => {
    if (items) {
      let Party = {
        ApprovedBy: 0,
        Approver: 0,
        DCId: 0,
        PartyId: BakeryDetail.BId,
        PartyName: BakeryDetail.BranchName,
        PartyAddress: BakeryDetail.BranchLocation,
        UserId: token.id,
        EntryDate: moment().format("YYYY-MM-DD"),
        DeliveryDate: e.Delivery.format("YYYY-MM-DD"),
        Remarks: e.Remarks !== undefined ? e.Remarks : "n/a",
        IssuedBy: token.id,
        IssuedUser: token.userName,
        ReceivedBy: 0,
        ReceivedUser: 0,
        IsActive: true,
      };

      let chalaniNo = 0;
      UpdateDeliveryChalani(generateUrlEncodedData(Party), (res) => {
        chalaniNo = res.CreatedId;
        for (let i = 0; i < items.length; i++) {
          let ChalanItems = {
            CId: 0,
            ChalaniNo: chalaniNo,
            ItemId: items[i].productionName,
            Quantity: items[i].productionQuantity,
            Remarks: e.Remarks !== undefined ? e.Remarks : "n/a",
            IsActive: true,
          };
          UpdateChalanItem(generateUrlEncodedData(ChalanItems), (res) => {
            if (res.SuccessMsg === true) {
              form.resetFields();
              setItems();
            } else {
              message.warning("Error, saving data!");
            }
          });
        }
      });
      message.success("Data has been saved!");
    } else {
      message.info("Please add some Production Items!");
    }
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
      setBakeryBranch(res.BranchList);
    });
  }, []);

  return (
    <>
      <Header title={"Add Chalani"}></Header>

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
                    message: "Please input Branch Name!",
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
                    message: "Please input Delivery Date!",
                  },
                ]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item label="Remarks" name="Remarks">
                <TextArea rows={6} />
              </Form.Item>

              <Form.Item style={{ margin: "20px 105px" }}>
                <Button type="primary" htmlType="submit" style={{ width: 200 }}>
                  Save Chalani
                </Button>
              </Form.Item>
            </Form>
          </FormStyled>
        </Col>
        <Col span={12}>
          <AddProduct onSubmit={addItems} items={items} />
          <ProductsContainer>
            <h2>Added Products:</h2>
            <AddedProducts items={items} removeProduct={removeProduct} />
          </ProductsContainer>
        </Col>
      </Row>
    </>
  );
};

export default AddedAndParty;

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
const ProductsContainer = styled.div`
  padding: 8px 16px;
  height: 395px;
  border: 2px solid "#c8cacb";
  border-radius: 8px;
  box-shadow: -1px 1px 6px 2px rgba(186, 186, 186, 0.75);
  -webkit-box-shadow: -1px 1px 6px 2px rgba(186, 186, 186, 0.75);
  -moz-box-shadow: -1px 1px 6px 2px rgba(186, 186, 186, 0.75);
  background-color: #fefefe;
`;
