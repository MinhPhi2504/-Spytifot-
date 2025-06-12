import { Link } from "react-router-dom";
import "../assets/styles/MainPage_Sidebar.css"
import logo from "../../public/img/logo.jpg";
import  { useState, useEffect } from "react";

import CreatePlaylistModal from "../components/CreatePlaylistModal.jsx";
function Sidebar () {
  const [showModal, setShowModal] = useState(false);

  // Vô hiệu hóa scroll khi mở modal
  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
  }, [showModal]);

  const handleOpenModal = (e) => {
    e.preventDefault(); // Ngăn reload hoặc điều hướng
    setShowModal(true);
  };
    return (
        <div className="sidebar">
          <div className="logo-container">
            <a href="" className="pic-logo-link">
              <img className="pic-logo" src={logo} alt="Logo" />
            </a>
          </div>
          <div className="sidebar-option">
            <div className="library">
              <Link to="/thuvien">
                <i className="fa-solid fa-music"></i>
                <p>Thư viện</p>
                </Link>
            </div>
            <div className="discover">
              <Link to = "/main">
                <i className="fa-solid fa-o"></i>
                <p>Khám phá</p>
              </Link>
            </div>
            <div className="chart">
              <a href="">
                <i className="fa-solid fa-chart-line"></i>
                <p>My Chart</p>
              </a>
            </div>
            <div className="radio">
              <a href="">
                <i className="fa-solid fa-broadcast-tower"></i>
                <p className="radio-text">Radio</p>
                <p className="live">LIVE</p>
              </a>
            </div>
            <div className="new-song">
              <Link to = "/main/bang-xep-hang">
                <i className="fa-solid fa-wave-square"></i>
                <p>Bảng xếp hạng</p>
              </Link>
            </div>
            <div className="title">
              <Link to ="/main/chu-de-va-the-loai">
                <i className="fa-solid fa-icons"></i>
                <p>Chủ đề và thể loại</p>
              </Link>
            </div>
            <div className="top-hit">
              <Link to="/main/top100">
                <i className="fa-regular fa-star"></i>
                <p>Top 100</p>
              </Link>
            </div>
            <div className="add-new-list">
              <a href="#" onClick={handleOpenModal}>
                <i className="fa-solid fa-plus"></i>
                <p>Tạo playlist mới</p>
              </a>
            </div>
          </div>
          {showModal && <CreatePlaylistModal onClose={() => setShowModal(false)} />}
        </div>
      );
}
export default Sidebar