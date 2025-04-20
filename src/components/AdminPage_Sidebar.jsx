import React from "react";
import "../assets/styles/AdminPage_Sidebar.css";
import { FaTachometerAlt, FaMusic, FaUser, FaCompactDisc, FaUsers, FaChartBar } from "react-icons/fa";

function Sidebar() {
  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li><FaTachometerAlt /> <span>Dashboard</span></li>
        <li><FaMusic /> <span>Quản lý bài hát</span></li>
        <li><FaUser /> <span>Quản lý nghệ sĩ</span></li>
        <li><FaCompactDisc /> <span>Quản lý album/playlist</span></li>
        <li><FaUsers /> <span>Quản lý người dùng</span></li>
        <li><FaChartBar /> <span>Thống kê và báo cáo</span></li>
      </ul>
    </div>
  );
}

export default Sidebar;
