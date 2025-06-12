import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSongFromId } from "../../backend/data/list-song.js";
import KaraokePlayer from "../components/KaraokePlayer.jsx";
const fetchSongById = async (song_id) => {
  try {
    const response = await fetch("http://localhost/get-single-song.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
      },
      body: JSON.stringify({ id: song_id })
    });

    const result = await response.json();

    if (result.success) {
      return result.song; // Trả về dữ liệu bài hát
    } else {
      console.error("Không tìm thấy bài hát:", result.message);
      return null;
    }
  } catch (error) {
    console.error("Lỗi khi fetch bài hát:", error);
    return null;
  }
};
export default function KaraokePage() {
  const { id_song } = useParams();
  const [song, setSong] = useState(null);
  const [lyric, setLyric] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load từ local hoặc fetch
  useEffect(() => {
    const localSong = getSongFromId(id_song);
    if (localSong) {
      setSong(localSong);
    } else {
      fetchSongById(id_song).then(result => {
        if (result) setSong(result);
      });
    }
  }, []);

  // Load lyric khi đã có song
  useEffect(() => {
    if (!song?.lyric) return;

    import(`../../backend/data/${song.lyric}`)
      .then((mod) => {
        setLyric(mod.default);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Không load được lyric:", err);
        setLyric("Không tìm thấy lời bài hát.");
        setLoading(false);
      });
  }, [song]);

  if (!song) return <div>Bài hát không tồn tại</div>;
  if (loading) return <div>Đang tải lời bài hát...</div>;

  return (
    <KaraokePlayer
      audioSrc={song}
      lrcText={lyric}
    />
  );
}
