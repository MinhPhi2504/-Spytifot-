import { useState, useEffect } from "react";
import { getMusicOption, initMusic, getMyPlaylist } from "../data/list-song.js";
import { useNavigate } from "react-router-dom";
import "../../src/assets/styles/MusicOption.css";

function MusicOption() {
  const [songs, setSongs] = useState([]);
  const [playlist, setplaylist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await initMusic();
      setSongs(getMusicOption());
      setplaylist(getMyPlaylist());
    })();
  }, []);

  const addSongToPlaylist = async (playlist_id, song_id) => {
    try {
      const response = await fetch("http://localhost:8080/insert-playlist.php", {
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

  const handleClickAuthor = (e, author) => {
    e.stopPropagation();
    navigate(`/thuvien/album/${author}`);
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

            <div className="d-flex list-author">
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

export default MusicOption;
