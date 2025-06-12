import { useParams } from "react-router-dom";
import {
  getPlaylistFromId,
  formatAuthors,
  initMusic,
  getSongFromId,
} from "../../backend/data/list-song.js";
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
  const [showDeleteList, setShowDeleteList] = useState(false);
  const currentSongIndex = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      await initMusic();
      const thisPlaylist = await getPlaylistFromId(id_playlist);
      setPlaylist(thisPlaylist);
    };
    fetchData();
  }, [id_playlist]);

  const listSongFromPlayList = useMemo(() => {
    if (!playlist?.id_songs) return [];
    return playlist.id_songs
      .map((id) => getSongFromId(id))
      .filter(Boolean);
  }, [playlist]);

  useEffect(() => {
    if (currentSong) {
      localStorage.setItem("currentSong", JSON.stringify(currentSong));
    }
  }, [currentSong]);

  useEffect(() => {
    const handleSongEndEvent = () => {
      handleSongEnd();
    };
    window.addEventListener("songEnded", handleSongEndEvent);
    return () => {
      window.removeEventListener("songEnded", handleSongEndEvent);
    };
  }, [listSongFromPlayList]);

  const handleSongEnd = () => {
    if (
      currentSongIndex.current !== null &&
      currentSongIndex.current + 1 < listSongFromPlayList.length
    ) {
      const nextIndex = currentSongIndex.current + 1;
      currentSongIndex.current = nextIndex;
      setCurrentSong(listSongFromPlayList[nextIndex]);
    }
  };

  const playFromBegin = () => {
    if (listSongFromPlayList.length > 0) {
      currentSongIndex.current = 0;
      setCurrentSong(listSongFromPlayList[0]);
    }
  };

  const removeSongFromPlaylist = async (playlist_id, song_id) => {
    try {
      const response = await fetch(
        "http://localhost/delete-song-from-playlist.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
          },
          body: JSON.stringify({ playlist_id, song_id }),
        }
      );

      const result = await response.json();

      if (result.success) {
        alert("Xóa bài hát thành công!");
        setPlaylist((prev) => ({
          ...prev,
          id_songs: prev.id_songs.filter((id) => id !== song_id),
        }));
      } else {
        alert("Xoá bài hát thất bại: " + result.message);
      }
    } catch (error) {
      console.error("Lỗi khi xoá:", error);
      alert("Đã xảy ra lỗi khi xóa.");
    }
  };

  if (!playlist) return <div className="text-white">Đang tải Playlist...</div>;

  return (
    <div className="playlist-container text-white" style={{ minHeight: "100vh" }}>
      <div className="row">
        <div
          className="col-md-3 d-flex flex-column justify-content-center align-items-center"
          style={{ marginLeft: "20px", marginTop: "30px" }}
        >
          <img
            src={playlist.img}
            alt="Playlist"
            className="shadow img-playlist"
          />
          <h3 className="mt-3">{playlist.name}</h3>
          <p>ID Playlist: {playlist.id_playlist}</p>
          <button className="btn btn-play btn-primary mt-2" onClick={playFromBegin}>
            Phát từ đầu
          </button>
          <button
            className="btn btn-play btn-primary mt-3"
            style={{ backgroundColor: "red" }}
            onClick={() => setShowDeleteList(true)}
          >
            Xóa bài hát
          </button>
        </div>

        <div className="col-md-8">
          <div
            className="d-flex align-items-center main-dt"
            style={{ marginBottom: "5px" }}
          >
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
                  <div>{generateSongWithId(song.id)}</div>
                  <div>{formatAuthors(song.author)}</div>
                  <div style={{ flex: 1, textAlign: "right", marginRight: "20px" }}>
                    <DurationDisplay id={song.id} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {showDeleteList && (
        <div className="modal-overlay" onClick={() => setShowDeleteList(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Chọn bài hát để xóa</h3>
            {listSongFromPlayList.map((song) => (
              <div
                key={song.id}
                className="modal-song-item"
                onClick={() => {
                  removeSongFromPlaylist(id_playlist, song.id);
                  setShowDeleteList(false);
                }}
              >
                {song.song_name} - {formatAuthors(song.author)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PlaylistDetail;