import { Tag } from "antd";
import React from "react";

const DateTimeBAdge = ({ data }) => {
  let temp = data.split("T");

  return (
    <>
      <Tag
        color="purple"
        style={{
          marginBottom: "4px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {temp[0]}
      </Tag>
      {temp[1] !== "00:00:00" && (
        <Tag
          color="blue"
          style={{
            marginBottom: "4px",
            width: "100%",
            textAlign: "center",
          }}
        >
          {temp[1]}
        </Tag>
      )}
    </>
  );
};

export default DateTimeBAdge;
