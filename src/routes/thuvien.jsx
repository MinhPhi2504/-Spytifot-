import "../assets/styles/thuvien.css"
import { initMusic } from "../../backend/data/list-song.js";
import { getMyPlaylist } from "../../backend/data/list-song.js";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Thuvien() {
    const [myPlaylist, setmyPlaylist] = useState([]);
    const [showDelete, setShowDelete] = useState(false);
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

    useEffect(() => {
        const handleClickOutside = (e) => {
            // nếu click vào bên ngoài .list-delete-playlist hoặc vào icon thì ẩn
            if (
            !e.target.closest(".list-delete-playlist") &&
            !e.target.closest(".fa-eraser")
            ) {
            setShowDelete(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
        }, []);

    const deletePlaylist = async (playlist_id) => {
    try {
      const response = await fetch("http://localhost/delete_playlist.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify({ playlist_id}),
      });
        const result = await response.json(); 
        if (result.success) {
            alert("Xoá thành công!");
            const newList = myPlaylist.filter((pl) => pl.id_playlist !== playlist_id);
            setmyPlaylist(newList);
        } else {
            alert("Xoá thất bại: " + result.message);
        }
    } catch (error) {
      console.log("Lỗi khi gửi request:", error);
      alert("Đã xảy ra lỗi khi xóa.");
    }
  };
  
  if (myPlaylist.length === 0) {
    return (<>
            <div className=" thuvien-container text-white min-vh-100 p-4">
                <div className="d-flex align-items-center gap-2">
                    <h1 className="me-2">Thư viện</h1>
                </div>
                <div className="no-playlist-title">
                    Bạn chưa có playlist nào
                </div>
            </div>
            </>)
            }
    return (
        <>
        <div className=" thuvien-container text-white min-vh-100 p-4">
            <div className="d-flex align-items-center gap-2 mb-4">
            <h1 className="me-2">Thư viện</h1>
            </div>
            <div>
                <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="singer-album-title d-flex align-items">
                        <h2 className="h5 fw-bold">MY PLAYLIST</h2>
                        <i class="fa-solid fa-eraser" style={{cursor: "pointer"}} onClick={() => setShowDelete(true)}></i>
                        {showDelete && (
                            <span className="list-delete-playlist">
                                <h3 className="delete-title">Chọn playlist để xóa</h3>
                                <div className="d-flex flex-column">
                                {myPlaylist.map((pl, index) => (
                                    <p
                                    key={index}
                                    className="delete-playlist-item"
                                    onClick={() => deletePlaylist(pl.id_playlist)}
                                    >
                                    {pl.name}
                                    </p>
                                ))}
                                </div>
                            </span>
                        )}
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