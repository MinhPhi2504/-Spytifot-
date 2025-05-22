import React from "react";
import "../assets/styles/AdminPage_Body.css";

function AdminPage_Body({ children }) {
  return (
    <main className="admin-body">
      {children || (
        <div className="welcome-message">
          <h2>Welcome to AdminPage</h2>
          <p>Chọn mục bên trái để bắt đầu quản lý.</p>
        </div>
      )}
    </main>
  );
}


import React from "react";
import Dashboard from "./Dashboard"; // thêm dòng này
import "../assets/styles/AdminPage_Body.css";

function AdminPage_Body() {
  return (
    <main className="admin-body">
      <Dashboard />
    </main>
  );
}

export default AdminPage_Body;

