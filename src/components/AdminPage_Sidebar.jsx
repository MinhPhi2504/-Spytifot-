import React from "react";
import "../assets/styles/AdminPage_Sidebar.css";
import { FaTachometerAlt, FaMusic, FaUser, FaCompactDisc, FaUsers, FaChartBar } from "react-icons/fa";
import { Link } from "react-router-dom";
function AdminPage_Sidebar() {
  return (
    <div className="sidebar2">
      <ul className="sidebar-menu">
        <li>
           <Link to="/admin/dashboard" className=" element sidebar-link">
              <FaTachometerAlt />
              <span>Dashboard</span>
            </Link>
        </li>
        <li>
           <Link to="/admin/QLBH" className=" element QLBH">
              <FaTachometerAlt />
              <span>Quản lý bài hát</span>
            </Link>
        </li>
        <li className="element"><FaUser /> <span>Quản lý nghệ sĩ</span></li>
        <li className="element"><FaCompactDisc /> <span>Quản lý album/playlist</span></li>
        <li className="element"><FaUsers /> <span>Quản lý người dùng</span></li>
        <li className="element"><FaChartBar /> <span>Thống kê và báo cáo</span></li>
      </ul>
    </div>
  );
}

export default AdminPage_Sidebar;
