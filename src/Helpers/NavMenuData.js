import {
  MdShoppingCart,
  MdAddShoppingCart,
  MdOutlineReceiptLong,
  MdFilterAlt,
} from "react-icons/md";
import { RiBillLine } from "react-icons/ri";
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
    icon: MdOutlineReceiptLong,
    key: 6,
  },
  {
    id: 7,
    label: "Users",
    pathName: "/InsertUsers",
    icon: MdOutlineReceiptLong,
    key: 7,
  },
];
