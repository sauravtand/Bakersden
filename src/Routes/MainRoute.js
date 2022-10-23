import { Routes, Route } from "react-router-dom";

import ProductionEntry from "../Pages/Production/ProductionEntry";
import ProductionTable from "../Pages/Production/ProductionTable";
import ChalaniTable from "../Pages/Chalani/ChalaniTable";
import RemainingProduction from "../Pages/Production/RemainingProduction";
import AddedAndParty from "../Pages/Chalani/AddedAndParty";

const MainRoute = () => {
  return (
    <Routes>
      {/* <Route exact path="/Login" element={<Login />}></Route> */}
      <Route exact path="/ProductionEntry" element={<ProductionEntry />} />
      <Route exact path="/ProductionTable" element={<ProductionTable />} />
      <Route exact path="/AddedAndParty" element={<AddedAndParty />} />
      <Route exact path="/ChalaniTable" element={<ChalaniTable />} />
      <Route
        exact
        path="/RemainingProduction"
        element={<RemainingProduction />}
      />
    </Routes>
  );
};

export default MainRoute;
