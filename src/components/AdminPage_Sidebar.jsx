import React from "react";
import "../assets/styles/AdminPage_Sidebar.css";
import { FaTachometerAlt, FaMusic, FaUser, FaCompactDisc, FaUsers, FaChartBar } from "react-icons/fa";
import { Link } from "react-router-dom";
function AdminPage_Sidebar() {
  return (
    <div className="sidebar2">
      <ul className="sidebar-menu">
        <li>
           <Link to="/admin/dashboard" className="sidebar-link">
              <FaTachometerAlt />
              <span>Dashboard</span>
            </Link>
        </li>
        <li>
           <Link to="/admin/QLBH" className="QLBH">
              <FaTachometerAlt />
              <span>Quản lý bài hát</span>
            </Link>
        </li>
        <li><FaUser /> <span>Quản lý nghệ sĩ</span></li>
        <li><FaCompactDisc /> <span>Quản lý album/playlist</span></li>
        <li><FaUsers /> <span>Quản lý người dùng</span></li>
        <li><FaChartBar /> <span>Thống kê và báo cáo</span></li>
      </ul>
    </div>
  );
}

export default AdminPage_Sidebar;
