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

  return (
    <Routes>
      {(token?.userrole === "Admin" || token?.userrole === "Production") && (
        <Route exact path="/ProductionEntry" element={<ProductionEntry />} />
      )}

      {(token?.userrole === "Admin" || token?.userrole === "Production") && (
        <Route exact path="/ProductionTable" element={<ProductionTable />} />
      )}
      {(token?.userrole === "Admin" || token?.userrole === "Normal") && (
        <Route exact path="/AddedAndParty" element={<AddedAndParty />} />
      )}

      <Route path="/ChalaniTable" element={<ChalaniTable />} />

      {(token?.userrole === "Admin" || token?.userrole === "Production") && (
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
