import { list_song} from "../data/list-song.js"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../src/assets/styles/MusicSuggest.css"
function MusicSuggest() {
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        setSuggestions(list_song); // Cập nhật danh sách nhạc gợi ý
    }, []);
    const navigate = useNavigate();
    const handleClick = (id) => {
        navigate(`/main/${id}`);
    };
    return (
        <div className="list-music-suggest-container">
            {suggestions.slice(0, 9).map((music) => (
                <div key={music.id} className="music-option"  
                    onClick={() => {localStorage.setItem("currentSong", JSON.stringify(music));}}>
                    <div className="thumbnail">
                        <img className="thumbnail-song" src={music.img} alt={music.song_name} />
                    </div>
                    <div className="music-title-container">
                        <div className="music-name"   
                            onClick={() => {
                                            localStorage.setItem("currentSong", JSON.stringify(music));
                                            handleClick(music.id);
                                            }}>
                            {music.song_name}
                        </div>
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
