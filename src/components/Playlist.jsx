import { useParams } from "react-router-dom";
import { getPlaylistFromId, formatAuthors } from "../../backend/data/list-song.js";
import "../assets/styles/Playlist.css"
import { getSongFromId } from "../../backend/data/list-song.js";
import { FaStar } from "react-icons/fa";
import DurationDisplay from "./DurationDisplay.jsx";
export function generateSongWithId (id) {
  const music = getSongFromId(id)
  console.log(music)
  return (
     <div className="song-item">
      <img
        src={music.img}
        alt="No Image"
        className="song-image"
      />
      <div className="song-infos" style={{width: '300px'}}>
        <div className="song-title">{music.song_name}</div>
        <div className="song-artist">
          {formatAuthors(music.author)} <FaStar className="star-icon" />
        </div>
      </div>
    </div>
  )
}
function getAlbumNameFromId (id) {
  const music = getSongFromId(id)
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
                <div className=" d-flex align-items-center main-dt" style={{marginBottom : '5px'}}>
                  <div style={{textAlign: 'left',width: '375px'}}><h5>Danh sách bài hát</h5></div>
                  <div style={{textAlign: 'left'}}><h5>Album</h5></div>
                  <div  style={{flex: 1, textAlign: 'right'}}><h5>Thời gian</h5></div>
                </div>
                  <ul className="list-songs-container">
                    {playlist.id_songs.map((id, index) => (
                      <li key={index} className="lists-group-item ">
                        <div className="d-flex w-100 align-items-center">
                          <div className=""> {generateSongWithId(id)} </div>
                          <div className="" >{formatAuthors(getAlbumNameFromId(id))}</div>
                          <div style={{flex: 1, textAlign: 'right', marginRight: '20px'}}>
                           <DurationDisplay id={id} />
                          </div>
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
