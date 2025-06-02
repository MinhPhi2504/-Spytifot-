import { useParams } from "react-router-dom"
import { getSongFromAuthorName } from "../../backend/data/list-song"
import { FaStar } from "react-icons/fa";
import { getAlbumFromAuthorName } from "../../backend/data/list-song";
import { formatAuthors } from "../../backend/data/list-song";
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
                <p>{album.song_name}</p>
                <button className="btn btn-play btn-primary mt-2">Phát từ đầu</button>
              </div>
              <div className="col-md-8">
                <div className="text-center d-flex  align-items-center main-dt" style={{marginBottom : '5px'}}>
                  <div className="" style={{textAlign: 'left',width: '375px'}}><h5>Danh sách bài hát</h5></div>
                  <div className="" style={{textAlign: 'left'}}><h5>Album</h5></div>
                  <div className="" style={{flex: 1, textAlign: 'right'}}><h5>Thời gian</h5></div>
                </div>
                  <ul className="list-songs-container">
                    {listSongofAuthor.map((song, index) => (
                      <li key={index} className="lists-group-item" onClick={() => {localStorage.setItem("currentSong", JSON.stringify(song))}}>
                        <div className="d-flex w-100 align-items-center  ">
                          <div className=""> 
                                 <div className="song-item" >
                                  <img
                                    src={song.img}
                                    alt="No Image"
                                    className="song-image"
                                  />
                                  <div className="song-infos" style={{width: '300px'}}>
                                    <div className="song-title">{song.song_name}</div>
                                    <div className="song-artist">
                                      {formatAuthors(song.author)} <FaStar className="star-icon" />
                                    </div>
                                  </div>
                                </div> 
                          </div>
                          <div className="" style={{width: 'auto'}}>{formatAuthors(song.album)}</div>
                          <div style={{flex: 1, textAlign: 'right', marginRight: '20px'}}>
                              <DurationDisplay id={song.id} />
                          </div>
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