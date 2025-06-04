import { useState, useEffect } from "react";
import { music_option } from "../data/list-song.js";
import { useNavigate } from "react-router-dom";
import "../../src/assets/styles/MusicOption.css"
function MusicOption() {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        setSongs(music_option); // Cập nhật danh sách nhạc
    }, []);
    const navigate = useNavigate();
    const handleClick = (id) => {
        navigate(`/main/${id}`);
    };
    const handleClickAuthor = (author) => {
        navigate(`/thuvien/album/${author}`)
    }
    return (
        <div className="music-list">
            {songs.map((music) => (
                <div key={music.id} className="music-item" onClick={() => {localStorage.setItem("currentSong", JSON.stringify(music))}} style={{cursor: 'pointer'}}>
                    <img src={music.img} alt={music.song_name} />
                    <div className="music-info">
                        <h3>
                            <span className="music-op-name" onClick={() => { 
                                localStorage.setItem("currentSong", JSON.stringify(music));
                                handleClick(music.id);
                                }}>
                                {music.song_name} </span>
                            {music.premium === 1 && <span className="premium">PREMIUM</span>}
                        </h3>
                        <span className="d-flex list-author">
                                {music.author.map((author, index) => (
                                <p key={index} onClick={() => handleClickAuthor(author)}>
                                    {author}{index < music.author.length - 1 && " ," }
                                </p>
                                ))}
                        </span>
                                
                        {/* <p onClick={() => {handleClickAuthor(music.author)}}>{formatAuthors(music.author)}</p> */}
                        <p>{music.time} năm trước</p>
                    </div>
                    <div className="feature-container">
                        <i className="fa-regular fa-heart" style={{ color: '#B197FC' }}></i>
                        <span className="tooltip">Thêm vào thư viện</span>
                        <span className="more">...</span>
                        <span className="tt2">Khác</span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MusicOption;
