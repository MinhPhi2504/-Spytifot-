import { listSong } from "./list-song";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../src/assets/styles/MusicSuggest.css"
function MusicSuggest({start, end}) {
    const [suggestions, setSuggestions] = useState([]);
    const handleClickAuthor = (author) => {
        navigate(`/thuvien/album/${author}`)
    }
    useEffect(() => {
        setSuggestions(listSong.array); // Cập nhật danh sách nhạc gợi ý
    }, []);
    const navigate = useNavigate();
    const handleClick = (id) => {
        navigate(`/main/${id}`);
    };
    return (
        <div className="list-music-suggest-container">
            {suggestions.slice(start, end).map((music) => (
                <div key={music.id} className="music-option"  
                    onClick={() => {localStorage.setItem("currentSong", JSON.stringify(music));}}
                    style={{cursor: 'pointer'}}>
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
                        {/* <div className="music-author">{formatAuthors(music.author)}</div> */}
                        <span className="d-flex list-author music-author">
                            {music.author.map((author, index) => (
                            <p key={index} onClick={() => handleClickAuthor(author)}>
                                {author}{index < music.author.length - 1 && " ," }
                            </p>
                            ))}
                        </span>
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
