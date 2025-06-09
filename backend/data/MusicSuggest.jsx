import {  getLSong, initMusic } from "./list-song.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../src/assets/styles/MusicSuggest.css";

function MusicSuggest({ start, end }) {
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      await initMusic(); 
      const listSong = getLSong()
      const arr = listSong.array || [];
      setSuggestions(arr.slice(start, end)); // ✅ cắt theo khoảng nếu cần
    })();
  }, [start, end]); // nếu props thay đổi thì chạy lại


  const handlePlay = (music) => {
    const userLevel = parseInt(localStorage.getItem("user_premium_level") || "0");

    if (music.premium > userLevel) {
      alert("Tài khoản của bạn không đủ quyền để nghe bài hát này.");
      return;
    }

    localStorage.setItem("currentSong", JSON.stringify(music));
  };

  const handleClickName = (e, music) => {
    e.stopPropagation();
    const userLevel = parseInt(localStorage.getItem("user_premium_level") || "0");

    if (music.premium > userLevel) {
      alert("Bạn cần nâng cấp tài khoản để xem bài hát này.");
      return;
    }

    localStorage.setItem("currentSong", JSON.stringify(music)); // Optional: preload
    navigate(`/main/${music.id}`);
  };

  const handleClickAuthor = (e, author) => {
    e.stopPropagation();
    navigate(`/thuvien/album/${author}`);
  };

  const handleHeartClick = (e) => {
    e.stopPropagation();
    alert("Thêm vào thư viện!");
  };

  const handleMoreClick = (e) => {
    e.stopPropagation();
    alert("Tùy chọn khác!");
  };

  return (
    <div className="list-music-suggest-container">
      {suggestions.slice(start, end).map((music) => (
        <div
          key={music.id}
          className="music-option"
          onClick={() => handlePlay(music)}
          style={{ cursor: "pointer" }}
        >
          <div className="thumbnail">
            <img className="thumbnail-song" src={music.img} alt={music.song_name} />
          </div>

          <div className="music-title-container">
            <div className="music-name-with-badge d-flex align-items-center gap-2">
              <span
                className="music-name-text hoverable-title"
                onClick={(e) => handleClickName(e, music)}
                style={{ cursor: "pointer" }}
              >
                {music.song_name}
              </span>
              {music.premium === 1 && <span className="badge badge-plus">PLUS</span>}
              {music.premium === 2 && <span className="badge badge-premium">PREMIUM</span>}
            </div>

            <span className="d-flex list-author music-author">
              {music.author.map((author, index) => (
                <p
                  key={index}
                  onClick={(e) => handleClickAuthor(e, author)}
                  style={{ cursor: "pointer" }}
                >
                  {author}{index < music.author.length - 1 && " ,"}
                </p>
              ))}
            </span>


          </div>

          <div className="feature-container">
            <i
              className="fa-regular fa-heart"
              style={{ color: '#B197FC' }}
              onClick={handleHeartClick}
            ></i>
            <span className="tooltip">Thêm vào thư viện</span>
            <span className="more" onClick={handleMoreClick}>...</span>
            <span className="tt2">Khác</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MusicSuggest;
