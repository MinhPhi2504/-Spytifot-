import "../assets/styles/thuvien.css"
import React from "react";
import { list_album } from "../../backend/data/list-song.js";
import Header from "../components/MainPage_header.jsx"
import Sidebar from "../components/MainPage_Sidebar.jsx"
import { my_playlist } from "../../backend/data/list-song.js";
import { useNavigate } from "react-router-dom";

function Thuvien() {
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
                        <h2 className="h5 fw-bold">MY SINGER ALBUMS</h2>
                        <i class="plus-icon fa-solid fa-plus"></i>
                    </div>
                </div>
                <div className="row">
                    {list_album.map((album, index) => (
                        <div key={index} className="col-6 col-md-3 mb-4">
                            <div className=" p-2 album-item">
                                {album.img ? (
                                <img
                                    src={album.img}
                                    alt={album.style}
                                    onClick={() => handleClick(album.id)}
                                    className="img-fluid rounded mb-2"
                                    style={{ height: '200px', objectFit: 'cover', width: '100%' }}
                                />
                                ) : (
                                <div className="bg-dark rounded mb-2" style={{ height: '200px', width: '100%' }} />
                                )}
                                <h5 className="mb-1 album-style text-truncate">{album.style}</h5>
                                <small className="album-author">{album.author}</small>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="singer-album-title">
                        <h2 className="h5 fw-bold">MY PLAYLIST</h2>
                        <i class="plus-icon fa-solid fa-plus"></i>
                    </div>
                </div>
                <div className="row">
                    {my_playlist.map((playlist, index) => (
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