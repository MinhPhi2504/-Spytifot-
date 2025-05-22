import { useState, useEffect } from "react";
import { music_option } from "../data/list-song.js";

function MusicOption() {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        setSongs(music_option); // Cập nhật danh sách nhạc
    }, []);

    return (
        <div className="music-list">
            {songs.map((music) => (
                <div key={music.id} className="music-item" onClick={() => {localStorage.setItem("currentSong", JSON.stringify(music))}} style={{cursor: 'pointer'}}>
                    <img src={music.img} alt={music.song_name} />
                    <div className="music-info">
                        <h3>
                            {music.song_name}
                            {music.premium === 1 && <span className="premium">PREMIUM</span>}
                        </h3>
                        <p>{music.author}</p>
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
