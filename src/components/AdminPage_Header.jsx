import "../assets/styles/AdminPage_Header.css"; 

function AdminPage_Header() {
  return (
    <div className="admin-header">
      <div className="left">
        <p>
           AdminPage
        </p>
        </div>
      <div className="center">
        <i className="fa-solid fa-bars"></i>
      </div>
      <div className="right">
        <p>Admin</p>
        </div>
    </div>
  );
}

export default AdminPage_Header;
