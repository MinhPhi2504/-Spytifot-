import { useParams } from "react-router-dom"
import { getSongFromAuthorName } from "../../backend/data/list-song"
import { FaStar } from "react-icons/fa";
import { getAlbumFromAuthorName } from "../../backend/data/list-song";
import { formatAuthors } from "../../backend/data/list-song";
import DurationDisplay from "../components/DurationDisplay";
import { useState, useRef, useEffect } from "react";
function Author() {
  const url = useParams();
  const author = url.author_name;
  const listSongofAuthor = getSongFromAuthorName(author);
  const album = getAlbumFromAuthorName(author);
  const currentSongIndex = useRef("null")
  const [currentSong, setCurrentSong] = useState(null);
    useEffect(() => {
      localStorage.setItem("currentSong", JSON.stringify(currentSong))
    }, [currentSong]);
    
    useEffect(() => {
    const handleSongEndEvent = () => {
      console.log("Đã có sự thay đổi")
      handleSongEnd();
    };

    window.addEventListener("songEnded", handleSongEndEvent);

    return () => {
      window.removeEventListener("songEnded", handleSongEndEvent);
    };
  }, []);

  const handleSongEnd = () => {
    console.log("Index trước đó", currentSongIndex.current)
    if (currentSongIndex.current !== null && currentSongIndex.current + 1 < listSongofAuthor.length) {
      const nextIndex = currentSongIndex.current + 1;
      currentSongIndex.current = nextIndex
      setCurrentSong(listSongofAuthor[nextIndex]);
          console.log("Index now", currentSongIndex.current)
    }

  };
  const playAllSongs = () => {
    currentSongIndex.current = 0;
    setCurrentSong(listSongofAuthor[0]);
  };

  return (
    <>
      <div className="playlist-container text-white" style={{ minHeight: '100vh' }}>
        <div className="row">
          <div className="col-md-3 d-flex flex-column justify-content-center align-items-center" style={{ marginLeft: '20px', marginTop: '30px' }}>
            <img src={album ? album.img : listSongofAuthor[0].img} alt="Playlist" className="shadow img-playlist" />
            <h3 className="mt-3">{author}</h3>
            <p>{album ? album.name : ''}</p>
            <button className="btn btn-play btn-primary mt-2" onClick={playAllSongs}>Phát từ đầu</button>
          </div>

          <div className="col-md-8">
            <div className="text-center d-flex align-items-center main-dt" style={{ marginBottom: '5px' }}>
              <div style={{ textAlign: 'left', width: '375px' }}><h5>Danh sách bài hát</h5></div>
              <div style={{ textAlign: 'left' }}><h5>Album</h5></div>
              <div style={{ flex: 1, textAlign: 'right' }}><h5>Thời gian</h5></div>
            </div>

            <ul className="list-songs-container">
              {listSongofAuthor.map((song, index) => (
                <li key={index} className="lists-group-item" onClick={() => { localStorage.setItem("currentSong", JSON.stringify(song)) }}>
                  <div className="d-flex w-100 align-items-center">
                    <div>
                      <div className="song-item">
                        <img src={song.img} alt="No Image" className="song-image" />
                        <div className="song-infos" style={{ width: '300px' }}>
                          <div className="song-title">{song.song_name}</div>
                          <div className="song-artist">
                            {formatAuthors(song.author)} <FaStar className="star-icon" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ width: 'auto' }}>{song.album}</div>
                    <div style={{ flex: 1, textAlign: 'right', marginRight: '20px' }}>
                      <DurationDisplay id={song.id} />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* Audio element to play songs */}
    </>
  );
}

export default Author;
