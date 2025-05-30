import { useEffect, useState } from "react";
import { getDurationFromId } from "./Playlist.jsx";
import { formatTime } from "../../backend/data/list-song.js";
function DurationDisplay({ id }) {
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    getDurationFromId(id).then((time) => {
      setDuration(time);
    });
  }, [id]);

  return (
    <div className="col d-flex justify-content-center align-items-center">
      {formatTime(duration) ?? "Loading..."}
    </div>
  );
}

export default DurationDisplay;
