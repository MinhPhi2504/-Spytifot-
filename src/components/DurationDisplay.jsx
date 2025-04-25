import { useEffect, useState } from "react";
import { getDurationFromId } from "./Playlist.jsx";

function DurationDisplay({ id }) {
  const [duration, setDuration] = useState(null);

  useEffect(() => {
    getDurationFromId(id).then((time) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60).toString().padStart(2, '0');
      setDuration(`${minutes}:${seconds}`);
    });
  }, [id]);

  return (
    <div className="col d-flex justify-content-center align-items-center">
      {duration ?? "Loading..."}
    </div>
  );
}

export default DurationDisplay;
