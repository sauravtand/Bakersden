import { Routes, Route } from "react-router-dom";

import ProductionEntry from "../Pages/Production/ProductionEntry";
import ProductionTable from "../Pages/Production/ProductionTable";
import Chalani from "../Pages/Chalani/ChalaniUI";
import ChalaniTable from "../Pages/Chalani/ChalaniTable";
import BranchChalani from "../Pages/Chalani/BranchChalani";
import Login from "../Pages/Login/Login";

const MainRoute = () => {
  return (
    <Routes>
      <Route exact path="/Login" element={<Login />}></Route>
      <Route exact path="/" element={<ProductionEntry />} />
      <Route exact path="/ProductionTable" element={<ProductionTable />} />
      <Route exact path="/Chalani" element={<Chalani />} />
      <Route exact path="/ChalaniTable" element={<ChalaniTable />} />
      <Route exact path="/BranchChalani" element={<BranchChalani />} />
    </Routes>
  );
};

export default MainRoute;
