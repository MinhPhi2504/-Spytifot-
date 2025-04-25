import Header from "./MainPage_header.jsx";
import Sidebar from "./MainPage_Sidebar.jsx";
import { Outlet } from "react-router-dom";
const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="main-content" style={{ marginTop: '90px', marginLeft: '250px', height: '2000px'}} >
      <Outlet />
      </div>
    </>
  );
};

export default MainLayout;