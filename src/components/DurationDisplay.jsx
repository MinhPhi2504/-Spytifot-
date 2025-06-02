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
    <>
      {formatTime(duration) ?? "Loading..."}
    </>
  );
}

export default DurationDisplay;
