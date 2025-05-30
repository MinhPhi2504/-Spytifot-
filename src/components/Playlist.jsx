import { useParams } from "react-router-dom";
import { getPlaylistFromId } from "../../backend/data/list-song.js";
import "../assets/styles/Playlist.css"
import { getSongFromId } from "../../backend/data/list-song.js";
import { FaStar } from "react-icons/fa";
import DurationDisplay from "./DurationDisplay.jsx";
function generateSongWithId (id) {
  const music = getSongFromId(Number(id))
  return (
     <div className="song-item">
      <img
        src={music.img}
        alt="No Image"
        className="song-image"
      />
      <div className="song-infos">
        <div className="song-title">{music.song_name}</div>
        <div className="song-artist">
          {music.author} <FaStar className="star-icon" />
        </div>
      </div>
    </div>
  )
}
function getAlbumNameFromId (id) {
  const music = getSongFromId(Number(id))
  if (music)
    return music.album
  return "No Album"
}
export function getDurationFromId (id) {
  const music = getSongFromId(id);
  if (!music) return;

  const audio = new Audio(music.audio);
  return new Promise((resolve) => {
    audio.addEventListener("loadedmetadata", () => {
      resolve(audio.duration); // thời lượng bài hát (giây)
    });
  });
}
function PlaylistDetail() {
    const { id_playlist } = useParams();
    const playlist = getPlaylistFromId(Number(id_playlist))

    return (
        <>
          <div className="playlist-container text-white" style={{ minHeight: '100vh' }}>
            <div className="row"> 
              <div className="col-md-3 d-flex flex-column justify-content-center align-items-center" style={{marginLeft : '20px', marginTop: '30px'}}>
                <img src={playlist.img} alt="Playlist" className="shadow img-playlist" />
                <h3 className="mt-3">{playlist.name}</h3>
                <p>ID Playlist: {playlist.id_playlist}</p>
                <button className="btn btn-play btn-primary mt-2">Phát từ đầu</button>
              </div>
              <div className="col-md-8">
                <div className="row text-center d-flex justify-content-between align-items-center main-dt" style={{marginBottom : '5px'}}>
                  <div className="col" style={{textAlign: 'left'}}><h5>Danh sách bài hát</h5></div>
                  <div className="col"><h5>Album</h5></div>
                  <div className="col"><h5>Thời gian</h5></div>
                </div>
                  <ul className="list-songs-container">
                    {playlist.id_songs.map((id, index) => (
                      <li key={index} className="lists-group-item ">
                        <div className="row w-100">
                          <div className="col"> {generateSongWithId(id)} </div>
                          <div className="col d-flex justify-content-center align-items-center" >{getAlbumNameFromId(id)}</div>
                          <DurationDisplay id={id} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
            </div>
          </div>
        </>
    );
}

export default PlaylistDetail;
