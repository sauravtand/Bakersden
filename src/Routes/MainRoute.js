import { Routes, Route } from "react-router-dom";

import ProductionEntry from "../Pages/Production/ProductionEntry";
import ProductionTable from "../Pages/Production/ProductionTable";
import ChalaniTable from "../Pages/Chalani/ChalaniTable";
import RemainingProduction from "../Pages/Production/RemainingProduction";
import AddedAndParty from "../Pages/Chalani/AddedAndParty";
import ItemsEntry from "../Pages/Items/ItemsEntry";
import InsertUsers from "../Pages/Users/InsertUsers";
import ClosingDate from "../Pages/DateForClosing/ClosingDate";
import ReportTable from "../Pages/Report/ReportTable";
import useToken from "../Helpers/useToken";

const MainRoute = () => {
  const { token } = useToken();

  console.log(token, "tokentoken");
  // console.log(userData);
  return (
    <Routes>
      {/* <Route exact path="/Login" element={<Login />}></Route> */}

      {(token?.userrole === 1 || token?.userrole === 8) && (
        <Route exact path="/ProductionEntry" element={<ProductionEntry />} />
      )}

      {(token?.userrole === 1 || token?.userrole === 8) && (
        <Route exact path="/ProductionTable" element={<ProductionTable />} />
      )}
      {(token?.userrole === 1 ||
        token?.userrole === 3 ||
        token?.userrole === 4 ||
        token?.userrole === 5 ||
        token?.userrole === 6 ||
        token?.userrole === 7) && (
        <Route exact path="/AddedAndParty" element={<AddedAndParty />} />
      )}

      <Route path="/ChalaniTable" element={<ChalaniTable />} />

      {(token?.userrole === 1 || token?.userrole === 8) && (
        <Route
          exact
          path="/RemainingProduction"
          element={<RemainingProduction />}
        />
      )}

      <Route exact path="/ClosingDate" element={<ClosingDate />} />
      <Route exact path="/ReportTable" element={<ReportTable />} />
      <Route path="/ItemsEntry" element={<ItemsEntry />} />
      <Route path="/InsertUsers" element={<InsertUsers />} />
    </Routes>
  );
};

export default MainRoute;
