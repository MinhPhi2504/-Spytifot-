import { useEffect, useRef, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import "../assets/styles/KaraokePlayer.css"
import MusicPlayer from './MusicPlayer';
function parseLyrics(text) {
  const lines = text.split('\n');
  return lines.map(line => {
    const match = line.match(/^\[(\d+):(\d+\.\d+)\]\s*(.*)$/);
    if (!match) return null;
    const [, min, sec, content] = match;
    return {
      time: parseInt(min) * 60 + parseFloat(sec),
      text: content,
    };
  }).filter(Boolean);
}

export default function KaraokePlayer({ audioSrc, lrcText }) {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [lyrics, setLyrics] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    setLyrics(parseLyrics(lrcText));
  }, [lrcText]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const index = lyrics.findIndex((line, i) => {
      return currentTime >= line.time && (i === lyrics.length - 1 || currentTime < lyrics[i + 1].time);
    });
    if (index !== -1 && index !== currentIndex) {
      setCurrentIndex(index);
    }
  }, [currentTime, lyrics]);

  return (
    <div className="karaoke-container">
      <Row>
        <Col md={4} className="text-center">
          <img
            src= {audioSrc.img}
            className="img-fluid rounded"
          />
          <h4 style={{ marginTop: "20px", fontWeight: "bold" }}>
            {audioSrc.song_name}
          </h4>
          <p style={{ margin: "5px 0" }}>{audioSrc.author}</p>
        </Col>
        <Col md={8} className="lyrics-section">
        <div className="lyrics-fixed-window">
            <div
                className="lyrics-scrolling-wrapper"
                style={{
                transform: `translateY(-${Math.max(0, currentIndex - 2) * 71}px)`,
                transition: 'transform 0.5s ease-in-out'
                }}
            >
                {lyrics.map((line, i) => (
                <div
                    key={i}
                    className={`lyric-line ${i === currentIndex ? 'active' : ''}`}
                >
                    {line.text}
                </div>
                ))}
            </div>
        </div>

        </Col>
      </Row>
    <MusicPlayer song={audioSrc} fullScreen onTimeUpdate={(time) => setCurrentTime(time)} />
    </div>
  );
} 
