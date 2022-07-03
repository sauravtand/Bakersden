import {
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from "../Pages/Dashboard/Dashboard";

import ProductionEntry from "../Pages/Production/ProductionEntry";
import ProductionTable from "../Pages/Production/ProductionTable";
/**
 * @desc: define static routes here
 *  
 */
const MainRoute = () => {
  return (
    <Routes>
      <Route exact path='/' element={<Dashboard />} />
      <Route exact path="/ProductionEntry" element={<ProductionEntry />} />
      <Route exact path="/ProductionTable" element={<ProductionTable />} />


    </Routes>
  )
}

export default MainRoute