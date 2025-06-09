import { useParams } from "react-router-dom";
import { getSongFromId } from "../../backend/data/list-song.js";
import KaraokePlayer from "../components/KaraokePlayer.jsx";
import lyric from "../../backend/data/lyrics/ChuaPhaiLaYeu.js";
export default function KaraokePage() {
  const { id_song } = useParams();
  const song = getSongFromId(id_song)
  if (!song) return <div>Bài hát không tồn tại</div>;

  return (
    <KaraokePlayer
     audioSrc={song}
    lrcText={lyric}
    />
  );
}
