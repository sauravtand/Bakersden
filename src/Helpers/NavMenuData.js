import {
  MdShoppingCart,
  MdAddShoppingCart,
  MdOutlineReceiptLong,
  MdFilterAlt,
} from "react-icons/md";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import TableChartTwoToneIcon from "@mui/icons-material/TableChartTwoTone";
import { Route } from "react-router-dom";
import styled from "styled-components";
import { RiBillLine, RiCalendarTodoFill } from "react-icons/ri";
export const RouteDataAdmin = [
  // {
  //   id: 1,
  //   name: 'DashBoard',
  //   pathName: '/',
  //   icon: MdDashboard
  // },
  {
    id: 1,
    label: "Production Entry",
    pathName: "/ProductionEntry",
    icon: MdAddShoppingCart,
    key: 1,
  },
  {
    id: 2,
    label: "View Production",
    pathName: "/ProductionTable",
    icon: MdShoppingCart,
    key: 2,
  },
  {
    id: 3,
    label: "Remaining Production",
    pathName: "/RemainingProduction",
    icon: MdFilterAlt,
    key: 3,
  },
  {
    id: 4,
    label: "Chalani Entry",
    pathName: "/AddedAndParty",
    icon: RiBillLine,
    key: 4,
  },
  {
    id: 5,
    label: "View Chalani",
    pathName: "/ChalaniTable",
    icon: MdOutlineReceiptLong,
    key: 5,
  },
  {
    id: 6,
    label: "Items Entry",
    pathName: "/ItemsEntry",
    icon: MdAddShoppingCart,
    key: 6,
  },
  {
    id: 7,
    label: "Users",
    pathName: "/InsertUsers",
    icon: AccountCircleOutlinedIcon,
    key: 7,
  },
  {
    id: 8,
    label: "Closing Date",
    pathName: "/ClosingDate",
    icon: RiCalendarTodoFill,
    key: 8,
  },
  {
    id: 9,
    label: "Report Table",
    pathName: "/ReportTable",
    icon: TableChartTwoToneIcon,
    key: 9,
  },
];
