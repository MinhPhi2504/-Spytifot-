import React from "react";
import a from "../../public/img/am-tham-ben-em.jpg"
import { useParams } from "react-router-dom";
import { getSongFromId } from "../../backend/data/list-song";
const AlbumCard = () => {
    const urlSong = useParams()
    const id = Number(urlSong.id_song)
    const song = getSongFromId(id)
  return (
    <div
      className="container"
      style={{
        backgroundColor: "#1e1b2e",
        color: "#fff",
        padding: "40px 20px",
        fontFamily: "sans-serif",
        minHeight: "100vh",
      }}
    >
      <div className="row">
        {/* Ảnh Album và thông tin bên trái */}
        <div className="col-md-4 text-center">
          <img
            src={song.img}
            style={{
              width: "100%",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
            }}
          />
          <h4 style={{ marginTop: "20px", fontWeight: "bold" }}>
            {song.song_name}
          </h4>
          <p style={{ margin: "5px 0" }}>{song.author}</p>
          <p style={{ color: "#aaa", marginBottom: "20px" }}>
            632 người yêu thích
          </p>
          <button
            className="btn"
            style={{
              backgroundColor: "#a259ff",
              color: "#fff",
              padding: "10px 20px",
              fontWeight: "bold",
              borderRadius: "999px",
            }}
          >
            ▶ TIẾP TỤC PHÁT
          </button>
        </div>

        {/* Thông tin bài hát bên phải */}
        <div className="col-md-8 mt-5 mt-md-0">
          <h5 style={{ color: "#bbb" }}>BÀI HÁT</h5>
          <div
            className="d-flex justify-content-between align-items-center"
            style={{
              backgroundColor: "#2e2b3f",
              padding: "15px 20px",
              borderRadius: "8px",
              marginBottom: "30px",
            }}
          >
            <div className="d-flex align-items-center">
              <img
                src={song.img}
                alt="Phượng Buồn"
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "6px",
                  marginRight: "15px",
                }}
              />
              <div>
                <div style={{ fontWeight: "bold" }}>{song.song_name}</div>
                <div style={{ fontSize: "14px", color: "#bbb" }}>
                  {song.album}
                </div>
              </div>
            </div>
            <div style={{ textAlign: "right", fontSize: "14px", color: "#ccc" }}>
              <span style={{ color: "#a259ff", marginRight: "10px" }}>💜</span>
              02:41
            </div>
          </div>

          <h5 style={{ color: "#bbb" }}>THÔNG TIN</h5>
          <ul style={{ listStyle: "none", paddingLeft: 0, fontSize: "15px" }}>
            <li>
              <strong>Số bài hát:</strong> 1
            </li>
            <li>
              <strong>Tên tác giả:</strong> {song.author} 
            </li>
            <li>
              <strong>Album:</strong> {song.album}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;
