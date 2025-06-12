import {  getLSong, initMusic, getMyPlaylist } from "./list-song.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../src/assets/styles/MusicSuggest.css";

function MusicSuggest({ start, end }) {
  const [suggestions, setSuggestions] = useState([]);
  const [playlist, setplaylist] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      await initMusic(); 
    const list = getLSong().array || [];
    const fullList = list.filter(Boolean);
    console.log("✅ Tổng bài:", fullList.length);
    console.log("🎯 slice:", start, end);
    console.log("🎵 sliced:", fullList.slice(start, end));
    setSuggestions(fullList.slice(start, end));
    setplaylist(getMyPlaylist());
    })();
  }, [start, end]); // nếu props thay đổi thì chạy lại

  const addSongToPlaylist = async (playlist_id, song_id) => {
    try {
      const response = await fetch("http://localhost/insert-playlist.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify({ playlist_id, song_id }),
      });

      const result = await response.text();
      alert(result);
    } catch (error) {
      console.error("Lỗi khi gửi request:", error);
      alert("Đã xảy ra lỗi khi thêm bài hát.");
    }
  };

  const handlePlay = (music) => {
    const userLevel = parseInt(localStorage.getItem("user_premium_level") || "0");

    if (music.premium > userLevel) {
      alert("Bạn cần nâng cấp tài khoản để nghe bài hát này.");
      return;
    }

    localStorage.setItem("currentSong", JSON.stringify(music));
  };

  const handleClickName = (e, music) => {
    e.stopPropagation();
    const userLevel = parseInt(localStorage.getItem("user_premium_level") || "0");

    if (music.premium > userLevel) {
      alert("Bạn cần nâng cấp tài khoản để nghe bài hát này.");
      return;
    }

    localStorage.setItem("currentSong", JSON.stringify(music)); // Optional: preload
    navigate(`/main/${music.id}`);
  };

  const handleClickAuthor = (e, author) => {
    e.stopPropagation();
    navigate(`/thuvien/album/${author}`);
  };

  const handleMoreClick = (e) => {
    e.stopPropagation();
    alert("Tùy chọn khác!");
  };

  return (
    <div className="list-music-suggest-container">
      {suggestions.map((music) => (
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

            <div className="d-flex music-author">
              {music.author.map((author, index) => (
                <p
                  key={index}
                  onClick={(e) => handleClickAuthor(e, author)}
                  style={{ cursor: "pointer", margin: 0, padding: 0 }}
                >
                  {author}{index < music.author.length - 1 && " ,"}
                </p>
              ))}
            </div>
          </div>
          <div className="feature-container">
            <div className="icon-wrapper">
              <i
                className="fa-regular fa-heart"
                style={{ color: "#B197FC" }}
                onClick={(e) => e.stopPropagation()}
              ></i>
              <span className="tooltips">
                <h3>Thêm vào thư viện</h3>
                <div className="d-flex flex-column">
                  {playlist.map((pl, index) => (
                    <p
                      key={index}
                      className="playlist-item-detail"
                      onClick={(e) => {
                        e.stopPropagation();
                        addSongToPlaylist(pl.id_playlist, music.id);
                      }}
                    >
                      {pl.name}
                    </p>
                  ))}
                </div>
              </span>
            </div>
            <span className="more" onClick={handleMoreClick}>...</span>
            <span className="tt2">Khác</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MusicSuggest;
