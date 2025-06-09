
import { useParams } from "react-router-dom";
import { getSongFromId } from "../../backend/data/list-song";
import { useNavigate } from "react-router-dom";
import { formatAuthors } from "../../backend/data/list-song";
import DurationDisplay from "../components/DurationDisplay";
const AlbumCard = () => {
    const urlSong = useParams()
    const id = urlSong.id_song
    const song = getSongFromId(id)
    const navigate = useNavigate()
  return (
    <div
      className="container"
      style={{
        backgroundColor: "#1e1b2e",
        color: "#fff",
        paddingLeft: "15px",
        fontFamily: "sans-serif",
        minHeight: "100vh",
      }}
    >
      <div className="row align-items-center">
        {/* Ảnh Album và thông tin bên trái */}
        <div className="col-md-4 text-center">
          <img
            src={song.img}
            style={{
              width: "100%",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
              marginTop: '20px'
            }}
          />
          <h4 style={{ marginTop: "20px", fontWeight: "bold" }}>
            {song.song_name}
          </h4>
          <p style={{ margin: "5px 0" }}>{formatAuthors(song.author)}</p>
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
            onClick={() => navigate(`/karaoke/${id}`)}
          >
            ▶ KARAOKE
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
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "6px",
                  marginRight: "15px",
                }}
              />
              <div>
                <div style={{ fontWeight: "bold"}}>{song.song_name}</div>
                <div style={{ fontSize: "14px", color: "#bbb" }}>
                  {formatAuthors(song.author)}
                </div>
              </div>
            </div>
            <div style={{ textAlign: "right", fontSize: "14px", color: "#ccc" }}>
              <span style={{ color: "#a259ff", marginRight: "10px" }}>💜</span>
              <DurationDisplay id={id}/>
            </div>
          </div>

          <h5 style={{ color: "#bbb" }}>THÔNG TIN</h5>
          <ul style={{ listStyle: "none", paddingLeft: 0, fontSize: "15px" }}>
            <li>
              <strong>Số bài hát:</strong> 1
            </li>
            <li>
              <strong>Tên tác giả:</strong> {formatAuthors(song.author)} 
            </li>
            <li>
              <strong>Album:</strong> {formatAuthors(song.album)}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;
