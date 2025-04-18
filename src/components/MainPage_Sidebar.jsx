import { Link } from "react-router-dom";
import "../assets/styles/MainPage_Sidebar.css"
import logo from "../../public/img/logo.jpg";
function Sidebar () {
    return (
        <div className="sidebar">
          <div className="logo-container">
            <a href="" className="pic-logo-link">
              <img className="pic-logo" src={logo} alt="Logo" />
            </a>
          </div>
          <div className="sidebar-option">
            <div className="library">
              <a href="">
                <i className="fa-solid fa-music"></i>
                <p>Thư viện</p>
              </a>
            </div>
            <div className="discover">
              <a href="">
                <i className="fa-solid fa-o"></i>
                <p>Khám phá</p>
              </a>
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
              <a href="">
                <i className="fa-solid fa-wave-square"></i>
                <p>Bảng xếp hạng</p>
              </a>
            </div>
            <div className="title">
              <a href="">
                <i className="fa-solid fa-icons"></i>
                <p>Chủ đề và thể loại</p>
              </a>
            </div>
            <div className="top-hit">
              <Link to="/top100">
                <i className="fa-regular fa-star"></i>
                <p>Top 100</p>
              </Link>
            </div>
            <div className="add-new-list">
              <a href="">
                <i className="fa-solid fa-plus"></i>
                <p>Tạo playlist mới</p>
              </a>
            </div>
          </div>
        </div>
      );
}
export default Sidebar