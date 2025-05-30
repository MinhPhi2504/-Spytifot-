import "../assets/styles/TopChart.css";
import { FaPlay } from "react-icons/fa";
import { top_list } from "../../backend/data/list-song";
import { useNavigate } from "react-router-dom";
import DurationDisplay from "../components/DurationDisplay";
const TopChartItem = () => {
  const navigate = useNavigate()
  return (
    <div className="text-white p-4">
      <div className="d-flex align-items-center mb-4">
        <h2 className="mb-0 me-2 fw-bold">BXH Nhạc Mới</h2>
        <button className="btn btn-light btn-circle">
          <FaPlay />
        </button>
      </div>
      <div className="list-top-rank">
        {
          top_list.map((song, index) => (
            <div className="d-flex align-items-center justify-content-between chart-item p-2 w-75" onClick={() => {
                                                                                            localStorage.setItem("currentSong", JSON.stringify(song))
                                                                                            navigate(`/main/${song.id}`)}}>
              <div className="d-flex align-items-center song-inf">
                <span className="rank-number text-primary fs-3 fw-bold me-3">{index + 1}</span>
                <span className="text-secondary me-3">-</span>
                <img
                  src={song.img}
                  className="song-img me-3"
                />
                <div>
                  <div className="fw-bold name-music">{song.song_name}</div>
                  <div className="name-author">{song.author}</div>
                </div>
              </div>
              <div className="d-none d-md-block me-3">
                {song.album}
              </div>
              <div className="text-light me-2"><DurationDisplay id = {song.id} /></div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default TopChartItem;
