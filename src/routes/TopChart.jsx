import "../assets/styles/TopChart.css";
import { FaPlay } from "react-icons/fa";
import { getTopList, initMusic } from "../../backend/data/list-song";
import { useNavigate } from "react-router-dom";
import DurationDisplay from "../components/DurationDisplay";
import { formatAuthors } from "../../backend/data/list-song";
import { useState, useEffect } from "react";

const TopChartItem = () => {
  const navigate = useNavigate();
  const [topList, setTopList] = useState([]);

  useEffect(() => {
    (async () => {
      await initMusic();
      const data = await getTopList();
      setTopList(data);
    })();
  }, []);

  const accountType = localStorage.getItem("account_type") || "normal";
  const canListen = (accountType, songPremiumLevel) => {
    const levels = { normal: 0, plus: 1, premium: 2 };
    return levels[accountType] >= songPremiumLevel;
  };

  return (
    <div className="text-white p-4">
      <div className="d-flex align-items-center mb-4">
        <h2 className="mb-0 me-2 fw-bold">BXH Nhạc Mới</h2>
        <button className="btn btn-light btn-circle">
          <FaPlay />
        </button>
      </div>
      <div className="list-top-rank">
        {topList.map((song, index) => (
          <div
            key={song.id}
            className="d-flex align-items-center justify-content-between chart-item p-2 w-75"
            onClick={() => {
              if (!canListen(accountType, song.premium)) {
                alert("Bạn cần nâng cấp tài khoản để xem bài hát này.");
                return;
              }
              localStorage.setItem("currentSong", JSON.stringify(song));
              navigate(`/main/${song.id}`);
            }}
          >
            <div className="d-flex align-items-center song-inf">
              <span className="rank-number text-primary fs-3 fw-bold me-3">{index + 1}</span>
              <span className="text-secondary me-3">-</span>
              <img src={song.img} className="song-img me-3" />
              <div>
                <div className="fw-bold name-music">{song.song_name}</div>
                <div className="name-author">{formatAuthors(song.author)}</div>
              </div>
            </div>
            <div className="d-none d-md-block me-3">
              {formatAuthors(song.album)}
            </div>
            <div className="text-light me-2">
              <DurationDisplay id={song.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopChartItem;
