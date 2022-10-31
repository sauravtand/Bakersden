import { Routes, Route } from "react-router-dom";

import ProductionEntry from "../Pages/Production/ProductionEntry";
import ProductionTable from "../Pages/Production/ProductionTable";
import ChalaniTable from "../Pages/Chalani/ChalaniTable";
import RemainingProduction from "../Pages/Production/RemainingProduction";
import AddedAndParty from "../Pages/Chalani/AddedAndParty";
import { useSelector } from "react-redux";

const MainRoute = () => {
  const userData = useSelector((state) => state.storeUserData.userData);
  // console.log(userData);
  return (
    <Routes>
      {/* <Route exact path="/Login" element={<Login />}></Route> */}

      <Route
        exact
        path="/ProductionEntry"
        element={userData?.userrole === 1 && <ProductionEntry />}
      />
      <Route
        exact
        path="/ProductionTable"
        element={userData?.userrole === 1 && <ProductionTable />}
      />
      <Route
        exact
        path="/AddedAndParty"
        element={userData?.userrole === 1 && <AddedAndParty />}
      />
      <Route path="/ChalaniTable" element={<ChalaniTable />} />
      <Route
        exact
        path="/RemainingProduction"
        element={userData?.userrole === 1 && <RemainingProduction />}
      />
    </Routes>
  );
};

export default MainRoute;
