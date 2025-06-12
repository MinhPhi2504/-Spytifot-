import { useParams } from "react-router-dom";
import { getPlaylistFromId, formatAuthors, initMusic, getSongFromId } from "../../backend/data/list-song.js";
import "../assets/styles/Playlist.css";
import { FaStar } from "react-icons/fa";
import DurationDisplay from "./DurationDisplay.jsx";
import { useEffect, useRef, useState, useMemo } from "react";

function generateSongWithId(id) {
  const music = getSongFromId(id);
  if (!music) return null;

  return (
    <div className="song-item">
      <img src={music.img} alt="No Image" className="song-image" />
      <div className="song-infos" style={{ width: "300px" }}>
        <div className="song-title">{music.song_name}</div>
        <div className="song-artist">
          {formatAuthors(music.author)} <FaStar className="star-icon" />
        </div>
      </div>
    </div>
  );
}

// function getAlbumNameFromId(id) {
//   const music = getSongFromId(id);
//   return music?.album || "No Album";
// }

export function getDurationFromId(id) {
  const music = getSongFromId(id);
  if (!music) return;

  const audio = new Audio(music.audio);
  return new Promise((resolve) => {
    audio.addEventListener("loadedmetadata", () => {
      resolve(audio.duration);
    });
  });
}

function PlaylistDetail() {
  const { id_playlist } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const currentSongIndex = useRef(null);

  // 🔄 Load dữ liệu playlist
  useEffect(() => {
    const fetchData = async () => {
      await initMusic();
      const thisPlaylist = await getPlaylistFromId(id_playlist);
      console.log("Playlist lấy được:", thisPlaylist);
      setPlaylist(thisPlaylist);
    };
    fetchData();
  }, [id_playlist]);

  // 🧠 Tính danh sách bài hát từ playlist
  const listSongFromPlayList = useMemo(() => {
    if (!playlist?.id_songs) return [];
    const list = playlist.id_songs.map(id => getSongFromId(id)).filter(Boolean);
    console.log("🎵 listSongFromPlayList:", list);
    return list;
  }, [playlist]);

  // 💽 Lưu currentSong vào localStorage
  useEffect(() => {
    if (currentSong) {
      localStorage.setItem("currentSong", JSON.stringify(currentSong));
    }
  }, [currentSong]);

  // 🎧 Xử lý khi bài hát kết thúc
  useEffect(() => {
    const handleSongEndEvent = () => {
      console.log("Đã có sự thay đổi");
      handleSongEnd();
    };
    window.addEventListener("songEnded", handleSongEndEvent);
    return () => {
      window.removeEventListener("songEnded", handleSongEndEvent);
    };
  }, [listSongFromPlayList]);

  const handleSongEnd = () => {
    console.log("Index trước đó", currentSongIndex.current);
    console.log("Tổng số bài hát:", listSongFromPlayList.length);

    if (
      currentSongIndex.current !== null &&
      currentSongIndex.current + 1 < listSongFromPlayList.length
    ) {
      const nextIndex = currentSongIndex.current + 1;
      currentSongIndex.current = nextIndex;
      setCurrentSong(listSongFromPlayList[nextIndex]);
      console.log("Index now", currentSongIndex.current);
    } else {
      console.log("⛔ Không còn bài tiếp theo.");
    }
  };

  const playFromBegin = () => {
    if (listSongFromPlayList.length > 0) {
      currentSongIndex.current = 0;
      setCurrentSong(listSongFromPlayList[0]);
    }
  };

  // ⏳ Loading khi chưa có dữ liệu
  if (!playlist) { // lần render đầu tiên useEffect chưa chạy nên chưa có initMusic-> chưa có data
    return <div className="text-white">Đang tải Playlist...</div>;
  }

  // ✅ UI chính
  return (
    <div className="playlist-container text-white" style={{ minHeight: "100vh" }}>
      <div className="row">
        <div className="col-md-3 d-flex flex-column justify-content-center align-items-center" style={{ marginLeft: "20px", marginTop: "30px" }}>
          <img src={playlist.img} alt="Playlist" className="shadow img-playlist" />
          <h3 className="mt-3">{playlist.name}</h3>
          <p>ID Playlist: {playlist.id_playlist}</p>
          <button className="btn btn-play btn-primary mt-2" onClick={playFromBegin}>
            Phát từ đầu
          </button>
        </div>

        <div className="col-md-8">
          <div className="d-flex align-items-center main-dt" style={{ marginBottom: "5px" }}>
            <div style={{ textAlign: "left", width: "375px" }}>
              <h5>Danh sách bài hát</h5>
            </div>
            <div style={{ textAlign: "left" }}>
              <h5>Album</h5>
            </div>
            <div style={{ flex: 1, textAlign: "right" }}>
              <h5>Thời gian</h5>
            </div>
          </div>

          <ul className="list-songs-container">
            {listSongFromPlayList.map((song, index) => (
              <li
                key={index}
                className="lists-group-item"
                onClick={() => setCurrentSong(song)}
              >
                <div className="d-flex w-100 align-items-center">
                  <div className="">{generateSongWithId(song.id)}</div>
                  <div className="">{formatAuthors(song.author)}</div>
                  <div style={{ flex: 1, textAlign: "right", marginRight: "20px" }}>
                    <DurationDisplay id={song.id} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PlaylistDetail;
