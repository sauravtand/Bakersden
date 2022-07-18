import {
  MdShoppingCart,
  MdAddShoppingCart,
  MdOutlineReceiptLong,
} from "react-icons/md";
import { RiBillLine } from "react-icons/ri";
export const RouteData = [
  // {
  //   id: 1,
  //   name: 'DashBoard',
  //   pathName: '/',
  //   icon: MdDashboard
  // },
  {
    id: 1,
    name: "Production Entry",
    pathName: "/",
    icon: MdAddShoppingCart,
    key: 1,
  },
  {
    id: 2,
    name: "View Production",
    pathName: "/ProductionTable",
    icon: MdShoppingCart,
    key: 2,
  },
  {
    id: 3,
    name: "Chalani Entry",
    pathName: "/Chalani",
    icon: RiBillLine,
    key: 3,
  },
  {
    id: 4,
    name: "View Chalani",
    pathName: "/ChalaniTable",
    icon: MdOutlineReceiptLong,
    key: 4,
  },
];
