import { useParams } from "react-router-dom"
import { getSongFromAuthorName } from "../../backend/data/list-song"
import { FaStar } from "react-icons/fa";
import { getAlbumFromAuthorName } from "../../backend/data/list-song";
import DurationDisplay from "../components/DurationDisplay";
function Author () {
    const url = useParams()
    const author = url.author_name
    const listSongofAuthor = getSongFromAuthorName(author)
    const album = getAlbumFromAuthorName(author)
    console.log(album)
    return (
        <>
            <div className="playlist-container text-white" style={{ minHeight: '100vh' }}>
            <div className="row"> 
              <div className="col-md-3 d-flex flex-column justify-content-center align-items-center" style={{marginLeft : '20px', marginTop: '30px'}}>
                <img src={album.img} alt="Playlist" className="shadow img-playlist" />
                <h3 className="mt-3">{album.author}</h3>
                <p>Album Name: {album.song_name}</p>
                <button className="btn btn-play btn-primary mt-2">Phát từ đầu</button>
              </div>
              <div className="col-md-8">
                <div className="row text-center d-flex justify-content-between align-items-center main-dt" style={{marginBottom : '5px'}}>
                  <div className="col" style={{textAlign: 'left'}}><h5>Danh sách bài hát</h5></div>
                  <div className="col"><h5>Album</h5></div>
                  <div className="col"><h5>Thời gian</h5></div>
                </div>
                  <ul className="list-songs-container">
                    {listSongofAuthor.map((song, index) => (
                      <li key={index} className="lists-group-item ">
                        <div className="row w-100">
                          <div className="col"> 
                                 <div className="song-item">
                                  <img
                                    src={song.img}
                                    alt="No Image"
                                    className="song-image"
                                  />
                                  <div className="song-infos">
                                    <div className="song-title">{song.song_name}</div>
                                    <div className="song-artist">
                                      {song.author} <FaStar className="star-icon" />
                                    </div>
                                  </div>
                                </div> </div>
                          <div className="col d-flex justify-content-center align-items-center" >{song.album}</div>
                          <DurationDisplay id={song.id} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
            </div>
          </div>
        </>
    )
}
export default Author