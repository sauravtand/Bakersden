import {
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from "../Pages/Dashboard/Dashboard";
import ProductionEntry from "../Pages/Production/ProductionEntry";
/**
 * @desc: define static routes here
 *  
 */
const MainRoute = () => {
  return (
    <Routes>
      <Route exact path='/' element={<Dashboard />} />
      <Route exact path="/ProductionEntry" element={<ProductionEntry />}> </Route>
      
    </Routes>
  )
}

export default MainRoute