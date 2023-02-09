import React from "react";
import { Form, DatePicker, Button, message } from "antd";
import Header from "../../Components/Common/Header";
import RemainingProduction from "../Production/RemainingProduction";
import styled from "styled-components";
import { useState } from "react";
import { UpdateOpeningStockOfItem } from "../../Services/appServices/ProductionService";
import useToken from "../../Helpers/useToken";
const ClosingDate = () => {
  const { token } = useToken();
  const [isbutdis, setisbutdis] = useState(false);

  // console.log(token, "Its Saureys Token");

  const [selectedDate, setSelectedDate] = useState(null);

  const handleSave = () => {
    if (!selectedDate) {
      message.error("Please select a date.");
      return;
    }

    let confirmed = window.confirm(
      "Do you want to enter this date for closing?"
    );
    if (!confirmed) return;
    let data = {
      currentDate: selectedDate.format("YYYY-MM-DD"),
      userId: token.id,
    };
    UpdateOpeningStockOfItem(data, (res) => {
      console.log(res, "Response Data");
      console.log(data, "Hello guys");

      if (res.SuccessMsg) {
        message.success("Opening Stock updated");
        setisbutdis(isbutdis);
      } else {
        message.error("Error!");
        setisbutdis(false);
      }
    });
  };
  return (
    <Form layout="vertical">
      <Top>
        <Header title="Closing Date For the Stock"></Header>
      </Top>

      <Closing>
        <Form.Item>
          <ClosingHead> Enter Closing date</ClosingHead>

          <b style={{ fontSize: "20px" }}>Date:</b>

          <DatePicker
            name="Date"
            label="Date"
            id="Date"
            rules={[
              {
                required: true,
                message: "Date is required!",
              },
            ]}
            style={{ width: "40%", margin: "0 5px 0 5px", textAlign: "center" }}
            onChange={(date) => setSelectedDate(date)}
          />
          <Button type="primary" onClick={handleSave}>
            Save
          </Button>
        </Form.Item>
      </Closing>

      <RemainingProduction />
    </Form>
  );
};
export default ClosingDate;
const Closing = styled.div`
  background-color: #fefefe;
  padding: 10px;
  box-shadow: 1px 2px 2px #b0bccea6;
  border-radius: 8px;
  overflow: hidden;
  min-height: 40px;
  justify-content: center;
  max-width: 100%;
  margin-bottom: 8px;
  margin-left: 0;
  box-shadow: -1px 1px 6px 2px rgba(186, 186, 186, 0.75);
  -webkit-box-shadow: -1px 1px 6px 2px rgba(186, 186, 186, 0.75);
  -moz-box-shadow: -1px 1px 6px 2px rgba(186, 186, 186, 0.75);
`;

const Top = styled.div`
  background-color: #fefefe;
  padding: 10px;
  box-shadow: 1px 2px 2px #b0bccea6;
  border-radius: 8px;
  overflow: hidden;
  min-height: 40px;
  justify-content: center;
  text-align: center;
  max-width: 100%;
  margin-bottom: 8px;
  margin-left: 0;
  box-shadow: -1px 1px 6px 2px rgba(186, 186, 186, 0.75);
  -webkit-box-shadow: -1px 1px 6px 2px rgba(186, 186, 186, 0.75);
  -moz-box-shadow: -1px 1px 6px 2px rgba(186, 186, 186, 0.75);
`;
const ClosingHead = styled.div`
  overflow: hidden;
  font-weight: bold;
  font-size: 30px;
  min-height: 40px;
  justify-content: center;
  ${"" /* text-align: center; */}
  max-width: 100%;
  margin-bottom: 8px;
  margin-left: 0;
`;
