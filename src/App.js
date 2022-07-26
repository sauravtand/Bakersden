
import './App.css';
import MainLayout from './Layouts/Layout';
import 'antd/dist/antd.css';
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Login from './Pages/Login/Login';
import useAuth from './Helpers/useAuth';
import PrivateOutlet from './Routes/PrivateOutlet';


function App() {
  useAuth()
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<PrivateOutlet />}>
          <Route path="*" element={<MainLayout />} />
        </Route>
        <Route path="" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
