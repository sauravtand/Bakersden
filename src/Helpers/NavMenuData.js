import { MdDashboard, MdShoppingCart, MdAddShoppingCart,MdOutlineReceiptLong } from 'react-icons/md'
export const RouteData = [
  {
    id: 1,
    name: 'DashBoard',
    pathName: '/',
    icon: MdDashboard
  },
  {
    id: 2,
    name: 'Production Entry',
    pathName: '/ProductionEntry',
    icon: MdAddShoppingCart
  },
  {
    id: 3,
    name: 'View Products',
    pathName: '/ProductionTable',
    icon: MdShoppingCart
  },
  {
    id:4,
    name: 'Chalani Entry',
    pathName: '/Chalani',
    icon: MdOutlineReceiptLong
  },
  {
    id:5,
    name: 'View Chalani',
    pathName: '/ChalaniTable',
    icon: MdOutlineReceiptLong
  }
]