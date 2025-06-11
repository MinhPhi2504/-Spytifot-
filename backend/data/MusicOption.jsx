import { useState, useEffect } from "react";
import { getMusicOption, initMusic} from "../data/list-song.js";
import { useNavigate } from "react-router-dom";
import "../../src/assets/styles/MusicOption.css";

function MusicOption() {
  const music_option = getMusicOption()
  const [songs, setSongs] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      await initMusic();                 // ✅ Đợi dữ liệu từ server
      const music_option = getMusicOption(); // ✅ Lấy dữ liệu đã sẵn
      setSongs(music_option);           // ✅ Cập nhật vào state
    })();
  }, []);

  useEffect(() => {
    setSongs(music_option);
  }, []);

  const handlePlay = (music) => {
    const userLevel = parseInt(localStorage.getItem("user_premium_level") || "0");
    if (music.premium > userLevel) {
      alert("Bạn cần nâng cấp tài khoản để nghe bài hát này.");
      return;
    }
    localStorage.setItem("currentSong", JSON.stringify(music));
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
    <div className="music-list">
      {songs.map((music) => (
        <div
          key={music.id}
          className="music-item"
          onClick={() => handlePlay(music)}
          style={{ cursor: "pointer" }}
        >
          <img src={music.img} alt={music.song_name} />

          <div className="music-info">
            <div className="d-flex align-items-center gap-2">
              <h3
                className="music-op-name hoverable-title"
                onClick={(e) => {
                  e.stopPropagation();
                  const userLevel = parseInt(localStorage.getItem("user_premium_level") || "0");
                  if (music.premium > userLevel) {
                    alert("Bạn cần nâng cấp tài khoản để nghe bài hát này.");
                    return;
                  }
                  navigate(`/main/${music.id}`);
                }}
                style={{ cursor: "pointer" }}
              >
                {music.song_name}
              </h3>
              {music.premium === 1 && <span className="badge badge-plus">PLUS</span>}
              {music.premium === 2 && <span className="badge badge-premium">PREMIUM</span>}
            </div>

            <span className="d-flex list-author">
              {music.author.map((author, index) => (
                <p
                  key={index}
                  onClick={(e) => handleClickAuthor(e, author)}
                  style={{ cursor: "pointer" }}
                >
                  {author}
                  {index < music.author.length - 1 && " ,"}
                </p>
              ))}
            </span>


          </div>

          <div className="feature-container">
            <i
              className="fa-regular fa-heart"
              style={{ color: "#B197FC" }}
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

export default MusicOption;
