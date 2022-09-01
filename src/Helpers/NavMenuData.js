import {
  MdShoppingCart,
  MdAddShoppingCart,
  MdOutlineReceiptLong,
  MdFilterAlt,
} from "react-icons/md";
import { RiBillLine, RiGitBranchFill } from "react-icons/ri";
export const RouteData = [
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
  // {
  //   id: 5,
  //   label: "Branch Chalani",
  //   pathName: "/BranchChalani",
  //   icon: RiGitBranchFill,
  //   key: 5,
  // },
];
