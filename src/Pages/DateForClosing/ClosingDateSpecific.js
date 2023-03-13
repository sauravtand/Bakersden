import React from "react";
import { Form, DatePicker, Button, message, Modal } from "antd";
import Header from "../../Components/Common/Header";
import styled from "styled-components";
import { useState, useEffect } from "react";
import {
  UpdateOpeningStockOfItem,
  GetLastClosingDates,
} from "../../Services/appServices/ProductionService";
import useToken from "../../Helpers/useToken";
const ClosingDateSpecific = ({ setCloseAllModal, closeAllModal }) => {
  const { token } = useToken();
  const [form] = Form.useForm();
  const [isbutdis, setisbutdis] = useState(true);
  const [visible, setVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [resDate, setResDate] = useState();
  const [correctdate, setCorrectdate] = useState();
  let correct = resDate?.split("T")[0];
  let currentDate = new Date().toISOString().split("T")[0];
  // let currentDate = "2023-03-22";

  let newCorrect = selectedDate?.format("YYYY-MM-DD");
  const initialValues = {
    Date: correct,
  };
  let previousDate = new Date(new Date(currentDate) - 86400000)
    .toISOString()
    .split("T")[0];
  console.log(previousDate, "its previous");
  useEffect(() => {
    setCorrectdate(correct);
    GetLastClosingDates((res) => {
      setResDate(res.GetLastClosingDate[0].OpeningDate);
    });
    if (newCorrect == previousDate) {
      setisbutdis(false);
      setCloseAllModal(true);
    } else {
      setisbutdis(true);
    }
  }, [newCorrect, correct]);

  const handleSave = () => {
    if (!selectedDate) {
      message.error("Please select a date.");
      return;
    } else {
      setCloseAllModal(!closeAllModal);
      setShowModal(false);
    }
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
    let data = {
      currentDate: selectedDate?.format("YYYY-MM-DD"),
      userId: token.id,
    };
    setisbutdis(true);

    UpdateOpeningStockOfItem(data, (res) => {
      if (res.SuccessMsg) {
        message.success("Closing has been Successful!!");
        setCloseAllModal(closeAllModal);
        setisbutdis(true);
      } else {
        message.error("Error!");
        setisbutdis(false);
      }
    });
    setCloseAllModal(closeAllModal);
    window.location.reload();
  };
  const handleCancel = () => {
    setVisible(false);
  };

  const handleModal = () => {
    setShowModal(false);
  };
  const handlCancelModal = () => {
    setShowModal(false);
  };
  return (
    <Form form={form} initialValues={initialValues} layout="vertical">
      <Header title="Closing Date For the Stock"></Header>

      <Closing>
        <Form.Item>
          <ClosingHead> Enter Closing date</ClosingHead>

          <DatePicker
            // defaultValue={correctdate}
            placeholder={`Please chooose ${previousDate} for yesterday's Closing`}
            name="Date"
            className="my-date-picker"
            label="Date"
            id="Date"
            rules={[
              {
                required: true,
                message: "Date is required!",
              },
            ]}
            style={{
              width: "40%",
              marginRight: "10px",
              textAlign: "center",
              fontWeight: "bold",
            }}
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
          />
          <Button type="primary" onClick={handleSave} disabled={isbutdis}>
            Save
          </Button>
        </Form.Item>
      </Closing>
      <Modal
        title="Confirm Closing Date"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{
          style: { background: "rgb(21 132 227 / 85%)", color: "white" },
        }}
        cancelButtonProps={{ style: { background: "#f5222d", color: "white" } }}
      >
        <div style={{ textAlign: "center" }}>
          <p style={{ fontWeight: "400", fontSize: "14px" }}>
            Do you want to close the stock for the selected date?<br></br>
            This will update the Opening Stock for tomorrow
          </p>
        </div>
      </Modal>
      <Modal
        title="Closing Date Error"
        visible={showModal}
        onOk={handleModal}
        onCancel={handlCancelModal}
        okButtonProps={{
          style: { background: "rgb(21 132 227 / 85%)", color: "white" },
        }}
        cancelButtonProps={{ style: { background: "#f5222d", color: "white" } }}
      >
        <div style={{ textAlign: "center" }}>
          <p style={{ fontWeight: "400", fontSize: "14px", color: "red" }}>
            Please enter the unused date.<br></br> The date has already been
            used!
          </p>
        </div>
      </Modal>
    </Form>
  );
};
export default ClosingDateSpecific;
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

const ClosingHead = styled.div`
  overflow: hidden;
  font-weight: bold;
  font-size: 16px;
  /* min-height: 40px; */
  justify-content: center;
  ${"" /* text-align: center; */}
  max-width: 100%;
  margin-bottom: 8px;
  margin-left: 0;
`;
