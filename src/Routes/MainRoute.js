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

      {(userData?.userrole === 1 || userData?.userrole === 8) && (
        <Route exact path="/ProductionEntry" element={<ProductionEntry />} />
      )}

      {(userData?.userrole === 1 || userData?.userrole === 8) && (
        <Route exact path="/ProductionTable" element={<ProductionTable />} />
      )}
      {(userData?.userrole === 1 ||
        userData?.userrole === 3 ||
        userData?.userrole === 4 ||
        userData?.userrole === 5 ||
        userData?.userrole === 6 ||
        userData?.userrole === 7) && (
        <Route exact path="/AddedAndParty" element={<AddedAndParty />} />
      )}

      <Route path="/ChalaniTable" element={<ChalaniTable />} />

      {(userData?.userrole === 1 || userData?.userrole === 8) && (
        <Route
          exact
          path="/RemainingProduction"
          element={<RemainingProduction />}
        />
      )}
    </Routes>
  );
};

export default MainRoute;
