import React from "react";
import "../assets/styles/AdminPage_Dashboard.css";
import {
  FaMusic,
  FaUser,
  FaCompactDisc,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";

function AdminPage_Dashboard() {
  const stats = [
    {
      label: "🎵 Tổng số bài hát",
      count: 128,
      icon: <FaMusic />,
      color: "#8e24aa",
    },
    {
      label: "👤 Tổng số nghệ sĩ",
      count: 34,
      icon: <FaUser />,
      color: "#3949ab",
    },
    {
      label: "💽 Tổng số album/playlist",
      count: 47,
      icon: <FaCompactDisc />,
      color: "#00897b",
    },
    {
      label: "👥 Tổng số người dùng",
      count: 512,
      icon: <FaUsers />,
      color: "#f4511e",
    },
    
  ];

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Tổng quan hệ thống</h2>
      <div className="dashboard-grid">
        {stats.map((item, index) => (
          <div
            key={index}
            className="dashboard-card"
            style={{ borderLeftColor: item.color }}
          >
            <div
              className="dashboard-icon"
              style={{ backgroundColor: item.color }}
            >
              {item.icon}
            </div>
            <div className="dashboard-info">
              <p className="dashboard-count">{item.count}</p>
              <p className="dashboard-label">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPage_Dashboard;
