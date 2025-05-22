// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import "swiper/css/effect-coverflow";
import "../assets/styles/MainPage_Body.css";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import MusicSuggest from "../../backend/data/MusicSuggest.jsx";
import MusicOption from "../../backend/data/MusicOption.jsx";
import Albums from "../../backend/data/Album.jsx";
import sh from "../../public/img/shhhh.jpg"
import wt from "../../public/img/tran-bo-nho.jpg"
import MusicPlayer from "./MusicPlayer.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import { list_song } from "../../backend/data/list-song.js";
function Body({ className }) {
  const [currentSong, setCurrentSong] = useState(null);
  return (
    <div className={className}>
      <Swiper
        effect="slide"
        centeredSlides={true}
        slidesPerView={3}
        initialSlide={1}
        spaceBetween={3}
        loop={true}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide><img src={sh} alt="Slide 1" /></SwiperSlide>
        <SwiperSlide><img src={wt} alt="Slide 2" /></SwiperSlide>
        <SwiperSlide><img src={sh} alt="Slide 3" /></SwiperSlide>
        <SwiperSlide><img src={wt} alt="Slide 4" /></SwiperSlide>
        <SwiperSlide><img src={sh} alt="Slide 5" /></SwiperSlide>
      </Swiper>

      <div className="music-suggest">
        <div className="music-suggest-title">Gợi ý cho bạn</div>
        <button className="refresh-suggest">
          <i className="fa-solid fa-spinner"></i>
          <div className="refresh-suggest-text">LÀM MỚI</div>
        </button>
      </div>

        <MusicSuggest />
      <div className="Chill ">
        <h3 className="Chill-title">Chill Place</h3>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
          <div>
            <img src="https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/9/b/e/6/9be6f892a7f95ef25632752dd2a319c2.jpg" alt="" style={{ width: '240px', height: '260px', borderRadius: '15px'}} />
            <p className="text-white" style={{opacity: 0.6, margin: '5px 0 0 3px', fontFamily: "sans-serif", width: 240}}>Lắng nghe những giai điệu nhạc Hoa lời Việt chữa lành</p>
          </div>
          <div>
            <img src="https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/2/9/5/d/295d1acf510893079a8d92cc0bc92120.jpg" alt="" style={{ width: '240px', height: '260px', borderRadius: '15px' }}/>
            <p className="text-white" style={{opacity: 0.6, margin: '5px 0 0 3px', fontFamily: "sans-serif" , width: 240}}>Nghe V-POP cực chill trên từng giai điệu</p>
          </div>
          <div>
            <img src="https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/2/4/5/3/24538985249cd4d3b324b4a4a09ad288.jpg" alt="" style={{ width: '240px', height: '260px', borderRadius: '15px' }}/>
            <p className="text-white" style={{opacity: 0.6, margin: '5px 0 0 3px', fontFamily: "sans-serif", width: 240}}>Một chút thôi...Nhớ cả đời</p>
          </div>
          <div>
            <img src="https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/c/d/c/b/cdcba8f6026e4e90e33f2d4d4604d515.jpg" alt="" style={{ width: '240px', height: '260px', borderRadius: '15px' }}/>
            <p className="text-white" style={{opacity: 0.6, margin: '5px 0 0 3px', fontFamily: "sans-serif", width: 240}}>Lãng mạn là khi có bạn...</p>
          </div>
        </div>
      </div>
      <div className="new-music-container">
        <h2 className="music-official-title">Mới Phát Hành</h2>
        <div className="filter-buttons">
          <button className="filter active"><span>TẤT CẢ</span></button>
          <button className="filter"><span>VIỆT NAM</span></button>
          <button className="filter"><span>QUỐC TẾ</span></button>
        </div>
          <MusicOption  onSelectSong = {setCurrentSong}/>
      </div>

      <div className="rank-week-container">
        <h3 className="rank-week-title">Bảng Xếp Hạng Tuần</h3>
        <div className="style-music-container">
          <div className="style-VN">
            <a href="">
              <img src="../../public/img/Nhạc VN.png" alt="" />
            </a>
          </div>
          <div className="style-USUK">
            <a href="">
              <img src="../../public/img/Nhạc VN.png" alt="" />
            </a>
          </div>
          <div className="style-KPOP">
            <a href="">
              <img src="../../public/img/Nhạc VN.png" alt="" />
            </a>
          </div>
        </div>
      </div>

      <div className="album-container">
        <Albums/>
      </div>
      <div className="music-partner-container">
        <h3 className="music-partner-title">ĐỐI TÁC ÂM NHẠC</h3>
        <div className="music-partner">
          <div className="music-partner1">
            <img src="../../public/img/1.jpg" alt="" />
          </div>
          <div className="music-partner2">
            <img src="../../public/img/2.jpg" alt="" />
          </div>
          <div className="music-partner3">
            <img src="../../public/img/3.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default Body;
