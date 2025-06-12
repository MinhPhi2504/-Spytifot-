import React from "react";
import "../assets/styles/AdminPage_Sidebar.css";
import {
  FaTachometerAlt,
  FaMusic,
  FaUsers,
  FaChartBar,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function AdminPage_Sidebar() {
  return (
    <div className="sidebar2">
      <ul className="sidebar-menu">
        <li>
          <Link to="/admin/dashboard" className="element sidebar-link">
            <FaTachometerAlt />
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/QLBH" className="element QLBH">
            <FaMusic />
            <span>Quản lý bài hát</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/QLND" className="element QLND">
            <FaUsers />
            <span>Quản lý người dùng</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default AdminPage_Sidebar;
