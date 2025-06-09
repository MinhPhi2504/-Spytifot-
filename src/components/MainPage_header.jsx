import "../assets/styles/MainPage_header.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getRandomSong } from "../../backend/data/list-song";
import { useState, useEffect } from "react";
function playRandomSong () {
  const song = getRandomSong()
  if (song && song !== "") {
    localStorage.setItem("currentSong", JSON.stringify(song))
  } 
}

function Header() {
  const [bgColor, setBgColor] = useState(() => {
    const currentColor = localStorage.getItem("bgColor")
    if (currentColor) {
      return JSON.parse(currentColor)
    }
    else {
      return "#ffffff"
    }
  });
  const handleColorChange = (e) => {
    const color = e.target.value
    localStorage.setItem("bgColor", JSON.stringify(color))
    setBgColor(color)
    document.documentElement.style.backgroundColor = color; // html
    document.body.style.backgroundColor = color;            // body
    document.getElementById("root").style.backgroundColor = color; // #root
  }
    useEffect(() => {
    document.documentElement.style.backgroundColor = bgColor; // html
    document.body.style.backgroundColor = bgColor;            // body
    document.getElementById("root").style.backgroundColor = bgColor; // root
    }, [bgColor]);

    const updateAccountType = async (newType) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Vui lòng đăng nhập trước khi nâng cấp tài khoản!");
      return;
    }

    try {
      const res = await fetch("http://localhost/update_account_type.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user.id, account_type: newType }),
      });

      const data = await res.json();
      if (data.success) {
        alert("Nâng cấp thành công!");

        // Cập nhật localStorage để đồng bộ trạng thái
        user.account_type = newType;
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        alert("Lỗi: " + data.message);
      }
    } catch (err) {
      console.error("Lỗi khi nâng cấp tài khoản:", err);
      alert("Lỗi kết nối đến máy chủ.");
    }
  };

  return (
    <div className="header">
      <div className="left-section">
        <a href="#">
          <i className="fa-solid fa-arrow-left"></i>
        </a>
        <a href="#">
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
          <a href="#" className="text01">Nâng cấp tài khoản</a>
        </div>
        <div className="container-download">
          <i className="fa-solid fa-download"></i>
          <a href="#" className="text02">Tải xuống</a>
        </div>

            <div className="settings-menu">
              <i className="fa-solid fa-gear"></i>
              <div className="sub-menu" >
                <div className="show-menu music-player" onClick={() => {playRandomSong()}}>
                  <i className="fa-regular fa-circle-play"></i>
                  <p>Phát nhạc ngẫu nhiên</p>
                  <i className="fa-solid fa-greater-than"></i>
                </div>
                <div className="show-menu interface">
                  <i className="fa-solid fa-palette"></i>
                  <p>Giao diện</p>
                  <i className="fa-solid fa-greater-than"></i>
                    <div className="interfaceSuggest">
                      <p>Nhấn để chọn màu nền</p>
                      <input type="color" className="colorPicker" onChange={handleColorChange}/>
                    </div>
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
              <Link to="/login" className="subcrise">Đăng nhập</Link>
            </div>
            <div className="sub-title">Đăng ký gói</div>

            <div className="option1">
              <motion.button
                onClick={() => updateAccountType("plus")}
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
                    <div className="plus"><p>PLUS</p></div>
                  </div>
                  <div className="price">Chỉ từ 13.000đ/tháng</div>
                  <div className="describe">Nghe nhạc với chất lượng cao nhất</div>
                  <div className="find-more-option1">Tìm hiểu thêm</div>
                </div>
              </motion.button>
            </div>

            <div className="option2">
              <motion.button
                onClick={() => updateAccountType("premium")}
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
                    <div className="premium"><p>PREMIUM</p></div>
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

export default Header;
