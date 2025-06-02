import "../assets/styles/MainPage_header.css"
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
function Header () {
        return (
        <div className="header">
          <div className="left-section">
            <a href="">
              <i className="fa-solid fa-arrow-left"></i>
            </a>
            <a href="">
              <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>
          <div className="mid-section">
            <button className="search-button">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <input className="search-input" placeholder="Tìm kiếm bài hát yêu thích" />
          </div>
          <div className="right-section">
            <div className="container-upgrade">
              <a href="" className="text01">Nâng cấp tài khoản</a>
            </div>
            <div className="container-download">
              <i className="fa-solid fa-download"></i>
              <a href="" className="text02">Tải xuống</a>
            </div>
            <div className="settings-menu">
              <i className="fa-solid fa-gear"></i>
              <div className="sub-menu">
                <div className="show-menu music-player">
                  <i className="fa-regular fa-circle-play"></i>
                  <p>Trình phát nhạc</p>
                  <i className="fa-solid fa-greater-than"></i>
                </div>
                <div className="show-menu interface">
                  <i className="fa-solid fa-palette"></i>
                  <p>Giao diện</p>
                  <i className="fa-solid fa-greater-than"></i>
                </div>
                <div className="show-menu introduce">
                  <i className="fa-solid fa-info"></i>
                  <a href="">Giới thiệu</a>
                </div>
                <div className="show-menu">
                <i class="fa-solid fa-shield"></i>
                  <Link to="/chinh-sach-bao-mat">Chính sách bảo mật</Link>
                </div>
                <div className="show-menu">
                  <i className="fa-solid fa-rectangle-ad"></i>
                  <a href="">Quảng cáo</a>
                </div>
                <div className="show-menu">
                  <i className="fa-solid fa-phone-flip"></i>
                  <a href="">Liên hệ</a>
                </div>
              </div>
            </div>
            <div className="user-menu">
              <i className="fa-regular fa-user"></i>
              <div className="user-sub-menu">
                <div className="subcrise-background-button">
                    <span className="subcrise">Đăng nhập</span>
                </div>
                <div className="sub-title">Đăng ký gói</div>
                <div className="option1">
                <motion.button 
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgb(190, 156, 249)",
                      boxShadow: "0 0 20px rgb(190, 156, 249), 0 0 40px rgb(190, 156, 249)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="option1-button text-white font-bold py-2 px-6 rounded-full"
                      >
                        <div className="option1-button-detail">
                            <div className="header-option1">
                                <div className="name1-logo">Spytifot</div>
                                <div className="plus">
                                    <p>PLUS</p>
                                </div>
                            </div>
                            <div className="price">Chỉ từ 13.000đ/tháng</div>
                            <div className="describe">Nghe nhạc với chất lượng cao nhất</div>
                            <div className="find-more-option1">Tìm hiểu thêm</div>
                        </div>
                    </motion.button>
                </div>
                <div className="option2">
                    <motion.button 
                        whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgb(245, 223, 153)",
                        boxShadow: "0 0 20px rgb(245, 223, 153), 0 0 40px rgb(245, 223, 153)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="option2-button text-white font-bold py-2 px-6 rounded-full"
                    >
                        <div className="option2-button-detail">
                            <div className="header-option2">
                                <div className="name2-logo">Spytifot</div>
                                <div className="premium">
                                    <p>PREMIUM</p>
                                </div>
                            </div>
                            <div className="price">Chỉ từ 41.000đ/tháng</div>
                            <div className="describe2">Toàn bộ đặc quyền cùng kho nhạc Premium</div>
                            <div className="find-more-option2">Tìm hiểu thêm</div>
                        </div>
                    </motion.button>
                </div>
              </div>          
            </div>
          </div>
        </div>      
        );
}
export default Header