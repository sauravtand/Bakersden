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
    name: 'Product Entry',
    pathName: '/ProductionEntry',
    icon: MdAddShoppingCart
  },
  {
    id: 3,
    name: 'Products',
    pathName: '/ProductionTable',
    icon: MdShoppingCart
  },
  {
    id:3,
    name: 'Chalani',
    pathName: '/Chalani',
    icon: MdOutlineReceiptLong
  }
]