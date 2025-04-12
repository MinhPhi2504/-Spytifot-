import { list_song} from "../data/list-song.js"
import { useState, useEffect } from "react";
function MusicSuggest() {
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        setSuggestions(list_song); // Cập nhật danh sách nhạc gợi ý
    }, []);

    return (
        <div className="list-music-suggest-container">
            {suggestions.map((music) => (
                <div key={music.id} className="music-option">
                    <div className="thumbnail">
                        <img className="thumbnail-song" src={music.img} alt={music.song_name} />
                    </div>
                    <div className="music-title-container">
                        <div className="music-name">{music.song_name}</div>
                        <div className="music-author">{music.author}</div>
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
export default MusicSuggest;
