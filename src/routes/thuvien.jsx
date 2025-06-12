import "../assets/styles/thuvien.css"
import { list_album, initMusic } from "../../backend/data/list-song.js";
import { getMyPlaylist } from "../../backend/data/list-song.js";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Thuvien() {
    const [myPlaylist, setmyPlaylist] = useState([]);
    useEffect(() => {
        (async () => {
            await initMusic();
            const data = getMyPlaylist();
            setmyPlaylist(data); 
        })();
    }, []);
const navigate = useNavigate();
const handleClick = (id) => {
    navigate(`/thuvien/${id}`);
};
    return (
        <>
        <div className=" thuvien-container text-white min-vh-100 p-4">
            <div className="d-flex align-items-center gap-2 mb-4">
            <h1 className="me-2">Thư viện</h1>
            </div>
  

            <div>
                <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="singer-album-title">
                        <h2 className="h5 fw-bold">MY PLAYLIST</h2>
                        <i class="plus-icon fa-solid fa-plus"></i>
                    </div>
                </div>
                <div className="row playlist-container">
                    {myPlaylist.map((playlist, index) => (
                        <div key={index} className="col-6 col-md-3 mb-4">
                            <div className=" p-2 album-item">
                                {playlist.img ? (
                                <img
                                    src={playlist.img}
                                    onClick={() => handleClick(playlist.id_playlist)}
                                    className="img-fluid rounded mb-2"
                                    style={{ height: '200px', objectFit: 'cover', width: '100%' }}
                                />
                                ) : (
                                <div className="bg-dark rounded mb-2" style={{ height: '200px', width: '100%' }} />
                                )}
                                <h5 className="mb-1 album-style text-truncate">{playlist.name}</h5>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </>
    )
}
export default Thuvien