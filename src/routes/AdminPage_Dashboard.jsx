import React, { useState, useEffect } from "react";
import "../assets/styles/AdminPage_Dashboard.css";
import { FaMusic, FaUser, FaCompactDisc } from "react-icons/fa";

function AdminPage_Dashboard() {
  const [stats, setStats] = useState([
    { label: "🎵 Tổng số bài hát", count: null, icon: <FaMusic />, color: "#8e24aa" },
    { label: "👤 Tổng số nghệ sĩ", count: null, icon: <FaUser />, color: "#3949ab" },
    { label: "💽 Tổng số album/playlist người dùng đã tạo", count: null, icon: <FaCompactDisc />, color: "#00897b" },
  ]);

  useEffect(() => {
    fetch("http://localhost/stats.php")
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        setStats([
          { ...stats[0], count: data.songs },
          { ...stats[1], count: data.artists },
          { ...stats[2], count: data.playlists },
        ]);
      })
      .catch(err => {
        console.error("Fetch stats error:", err);
        // Nếu lỗi, gán count về 0 để không hiển thị null
        setStats(prev =>
          prev.map(item => ({ ...item, count: 0 }))
        );
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Tổng quan hệ thống</h2>
      <div className="dashboard-grid">
        {stats.map((item, idx) => (
          <div
            key={idx}
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
              <p className="dashboard-count">
                {item.count === null ? "..." : item.count}
              </p>
              <p className="dashboard-label">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPage_Dashboard;
