import AdminPage_Header from "./AdminPage_Header";
import AdminPage_Sidebar from "./AdminPage_Sidebar";
import { Outlet } from "react-router-dom";
function AdminPage_MainLayout ()
{
    return (<>
       <AdminPage_Header/>
       <AdminPage_Sidebar/>
       <div className="main-content" style={{ marginTop: '0 px', marginLeft: '100 px', height: '2000px'}}>
        <Outlet />
      </div>

    </>)
}
export default AdminPage_MainLayout