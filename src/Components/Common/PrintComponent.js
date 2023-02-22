import { Button, message } from "antd";
import React, { useState } from "react";
import { CSVLink } from "react-csv";
import { newTableStyles } from "./TableStyles";
import { companyDetail } from "../../Helpers/CompanyDetails";
import useToken from "../../Helpers/useToken";

const PrintComponent = ({
  addname,
  ProductList,
  ProductionList,
  headers,
  forCSV,
  forPrint,
  remainingProduction,
  ChalaniItemList,
  modalHeaders,
  tempPartyDetails,
  ItemLists,
}) => {
  // const [dataForCSV, setDataForCSV] = useState()
  // console.log(ProductList, "from istem");

  // const CSVdata = addname();
  // setDataForCSV(CSVdata);
  if (addname) {
    var CSVdata = addname();
    // console.log(CSVdata, "this csv");
  }

  const printHandle = () => {
    if (!remainingProduction && !ChalaniItemList && !ProductionList) {
      var temp = addname();
    }

    if (
      ProductList ||
      remainingProduction ||
      ProductionList ||
      ChalaniItemList !== 0 ||
      undefined
    ) {
      let newWindow = window.open();

      let newStyle = ``;

      newStyle = `<style>thead > tr> th:first-child, thead > tr> th:nth-child(2), tbody > tr > td:first-child,tbody > tr > td:nth-child(2){
      
       }tbody > tr:last-child{
    // background-color: #f0f0f2;
 
    }
    tbody > tr:last-child > td{
        // font-size: 12px;
        // font-weight: 500;
    }
    
    
    </style>`;

      if (tempPartyDetails) {
        var modalAdditionalHeader = `

        <p>Chalani Number: ${
          tempPartyDetails.DCId
        }<span style='float:right'>Production Date: ${tempPartyDetails.EntryDate?.slice(
          0,
          10
        )}</span</p>
       <p>Party Name: ${
         tempPartyDetails.PartyName
       } <span style='float:right'>Delivery Date: ${tempPartyDetails.DeliveryDate?.slice(
          0,
          10
        )}</span>
</p>
      
      
     
  
        <h4 style="text-align:center;">Chalani Details<h4>
    `;
      }

      let refName = `
         <div style='text-align:center;'>
          <h1>${companyDetail.companyName}<h1>
          <h3>${companyDetail.companyAddress}, Phone:${
        companyDetail.companyPhoneNo
      }<h3>
           <h4>${
             ChalaniItemList || remainingProduction
               ? ""
               : companyDetail.reportName
           }<h4>
           <h4>${remainingProduction ? "Remaining Production Data" : ""}<h4>
      </div>

    
      `;

      if (ChalaniItemList) {
        var footerContent = `    <div 
      style='display: flex;
      justify-content: space-between;
      margin-top: 50px;
      font-size: 14px;
      margin-bottom:-25px;
      font-weight: 400
    '
      >
   
      <p>${ChalaniItemList[0].Issuer}</p>
      <p>${
        tempPartyDetails.Approver !== null &&
        tempPartyDetails.Approver !== undefined
          ? tempPartyDetails.Approver
          : ""
      }</p>
      <p>${
        tempPartyDetails.Approver !== null &&
        tempPartyDetails.Approver !== undefined
          ? tempPartyDetails.Approver
          : ""
      }</p>
 

      </div>`;
      }

      let footer = `
 
  




      <div 
      style='display: flex;
      justify-content: space-between;
      margin-top: -10px;
      font-size: 14px;
      
      '
      >
      <p style='border-top:1px solid black; padding-top: 10px;'>Issued By
      </p>
      <p style='border-top:1px solid black; padding-top: 10px;'>Received By</p>
      <p style='border-top:1px solid black; padding-top: 10px;'>Approved By</p>
      </div>
      
      `;

      let tableBody = "";
      let tableHeadHtml = "<thead>";
      let columns = [];

      if (headers) {
        headers.forEach((ele) => {
          // console.log(ele.label, "elelelele");
          tableHeadHtml += `<th>${ele?.label}</th>`;
          columns.push(ele.key);
        });
        tableHeadHtml += "</thead>";
        if (temp) {
          let productListWithoutTime = temp.map((e) => {
            return { ...e, EntryDate: e.EntryDate?.slice(0, 10) };
          });

          productListWithoutTime.forEach((ele) => {
            tableBody = tableBody + "<tr>";
            columns.forEach((cell) => {
              tableBody = tableBody + "<td>" + ele[cell] + "</td>";
            });
            tableBody = tableBody + "</tr>";
          });
        } else if (remainingProduction) {
          remainingProduction.forEach((ele) => {
            tableBody = tableBody + "<tr>";
            columns.forEach((cell) => {
              tableBody = tableBody + "<td>" + ele[cell] + "</td>";
            });
            tableBody = tableBody + "</tr>";
          });
        } else if (ProductionList) {
          let productionListWithoutTime = ProductionList.map((e) => {
            return {
              ...e,
              EntryDate: e.EntryDate?.slice(0, 10),
              DeliveryDate: e.DeliveryDate?.slice(0, 10),
            };
          });

          productionListWithoutTime.forEach((ele) => {
            tableBody = tableBody + "<tr>";
            columns.forEach((cell) => {
              tableBody = tableBody + "<td>" + ele[cell] + "</td>";
            });
            tableBody = tableBody + "</tr>";
          });
        }
        let allTable = `<table>${tableHeadHtml}${tableBody}</table>`;

        newWindow.document.body.innerHTML =
          newTableStyles + newStyle + refName + allTable;

        setTimeout(function () {
          newWindow.print();
          newWindow.close();
        }, 300);
      } else {
        modalHeaders.forEach((ele) => {
          tableHeadHtml += `<th>${ele?.label}</th>`;
          columns.push(ele.label);
        });
        tableHeadHtml += "</thead>";

        ChalaniItemList.forEach((ele) => {
          tableBody = tableBody + "<tr>";
          columns.forEach((cell) => {
            tableBody = tableBody + "<td>" + ele[cell] + "</td>";
          });
          tableBody = tableBody + "</tr>";
        });

        let allTable = `<table>${tableHeadHtml}${tableBody}</table>`;

        newWindow.document.body.innerHTML =
          newTableStyles +
          newStyle +
          refName +
          modalAdditionalHeader +
          allTable +
          footerContent +
          footer;

        setTimeout(function () {
          newWindow.print();
          newWindow.close();
        }, 300);
      }
    } else {
      message.info("select some data");
    }
  };

  return (
    <>
      {forPrint && (
        <Button
          type="primary"
          style={{ marginLeft: "16px", float: "right" }}
          onClick={() => {
            printHandle();
          }}
        >
          Print
        </Button>
      )}

      {forCSV && (
        <Button type="primary" style={{ float: "right" }}>
          <CSVLink
            data={CSVdata !== undefined ? CSVdata : ""}
            filename={"ProductionData.csv"}
          >
            Export to CSV
          </CSVLink>
        </Button>
      )}
    </>
  );
};

export default PrintComponent;
