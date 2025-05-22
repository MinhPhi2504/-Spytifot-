import AdminPage_Header from "../components/AdminPage_Header";
import AdminPage_Sidebar from"../components/AdminPage_Sidebar";
import AdminPage_Body from "../components/AdminPage_Body";
function AdminPage () {
    return (
        <>
                <AdminPage_Header/>
                <AdminPage_Body/>
                <AdminPage_Sidebar/>
        </>
    )
}
export default AdminPage;