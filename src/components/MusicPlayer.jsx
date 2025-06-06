import React, { useState, useRef, useEffect } from "react";
import { formatTime } from "../../backend/data/list-song";
import { useNavigate } from "react-router-dom";
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaRandom,
  FaRedoAlt,
  FaVolumeMute,
  FaVolumeUp,
} from "react-icons/fa";
import "../assets/styles/MusicPlayer.css";
import { formatAuthors } from "../../backend/data/list-song";
export default function MusicPlayer({ song, fullScreen = false, onTimeUpdate}) {
  console.log("Song:" ,song)
  useEffect(() => {
    localStorage.setItem("currentSong", JSON.stringify(song));
  }, [song]);

  const audioRef = useRef(null);
  const seekRef = useRef(false);
  const delayTimeoutRef = useRef(null);
  const preVolume = useRef(1);

  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const toggleRepeat = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(0);
    setIsPlaying(true);
    setProgress(0);
    audio.currentTime = 0;
    if (!isPlaying) {
      audio.play();
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.muted) {
      setVolume(preVolume.current);
    }
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (seekRef.current) {
      seekRef.current = false;
      clearTimeout(delayTimeoutRef.current);
      delayTimeoutRef.current = setTimeout(() => {
        audio.play();
      }, 210);
    } else {
      setCurrentTime(audio.currentTime);
      if (onTimeUpdate) {
        onTimeUpdate(audio.currentTime);
      }
      const percent = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
      setProgress(percent);
    }
  };

  const handleProgressChange = (e) => {
    const audio = audioRef.current;
    if (!audio) return;

    seekRef.current = true;
    audio.pause();

    const newVal = e.target.value;
    const newTime = (newVal / 100) * audio.duration;

    audio.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress(newVal);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updatePlayState = () => setIsPlaying(!audio.paused);
    const updateDuration = () => {
      const dur = audio.duration;
      if (!isNaN(dur)) {
        setDuration(dur);
      }
    };

    const handleTimeUpdateWrapper = () => {
      handleTimeUpdate();
      if (audio.currentTime === audio.duration) {
        setIsPlaying(false);
         window.dispatchEvent(new Event("songEnded")); // 🔥 Gửi sự kiện
      }
    };

    audio.addEventListener("play", updatePlayState);
    audio.addEventListener("pause", updatePlayState);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("timeupdate", handleTimeUpdateWrapper);

    return () => {
      audio.removeEventListener("play", updatePlayState);
      audio.removeEventListener("pause", updatePlayState);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("timeupdate", handleTimeUpdateWrapper);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
      preVolume.current = volume;
      setIsMuted(audio.volume === 0);
    }
  }, [volume]);

  useEffect(() => {
    if (!song || !audioRef.current) return;

    const audio = audioRef.current;
    audio.pause();
    audio.currentTime = 0;

    setProgress(0);
    setCurrentTime(0);
    setDuration(audio.duration || 0);

    const playNewSong = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn("Không thể tự động phát nhạc:", err);
        setIsPlaying(false);
      }
    };

    playNewSong();
  }, [song]);

  const playerStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '0',
    position: 'fixed',
    bottom: '0',
    right: '0',
    left: fullScreen ? '0' : '240px',
    backgroundColor: '#170F23',
    height: fullScreen ? '100px' : '80px',
    color: 'aliceblue'
  };

  const navigate = useNavigate();

  return (
    <div className="music-player-container" style={playerStyle}>
      <div className="song-profile">
        <img src={song.img} alt="song-cover" />
        <div className="song-profile-details">
          <div className="song-name" onClick={() => navigate(`/karaoke/${song.id}`)}>
            {song.song_name}
          </div>
          <div className="song-author">{formatAuthors(song.author)}</div>
        </div>
      </div>

      <div className="main-tools-container">
        <div className="play-music-tool">
          <FaRandom />
          <FaStepBackward />
          <button onClick={togglePlay} className="play-btn">
            {isPlaying ? (
              <FaPause style={{ color: "white", border: "1px solid white", borderRadius: "50%", width: '25px', height: '25px', padding: '5px' }} />
            ) : (
              <FaPlay style={{ color: "white", border: "1px solid white", borderRadius: "50%", width: '25px', height: '25px', padding: '5px' }} />
            )}
          </button>
          <FaStepForward />
          <FaRedoAlt className="reload-music" onClick={toggleRepeat} style={{ cursor: "pointer" }} />
        </div>
        <div className="range-change-time-container">
          <span className="text-xs">{formatTime(currentTime)}</span>
          <input
            type="range"
            value={isNaN(progress) ? 0 : progress}
            onChange={handleProgressChange}
            className="w-full changeTime"
            min="0"
            max="100"
            style={{ cursor: "pointer" }}
          />
          <span className="text-xs">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="music-play-option">
        <button onClick={toggleMute} className="option-btn">
          {isMuted ? (
            <FaVolumeMute style={{ color: "white", border: "1px solid white", borderRadius: "50%", width: '25px', height: '25px', padding: '5px' }} />
          ) : (
            <FaVolumeUp style={{ color: "white", border: "1px solid white", borderRadius: "50%", width: '25px', height: '25px', padding: '5px' }} />
          )}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          style={{ width: "100px", marginLeft: "10px" }}
        />
      </div>

      <audio ref={audioRef} src={song.audio} preload="auto" />
    </div>
  );
}
