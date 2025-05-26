import React, { useState, useRef, useEffect } from "react";
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
import "../assets/styles/MusicPlayer.css"
export default function MusicPlayer({ song, fullScreen = false, onTimeUpdate })  {
    // Lưu bài nhạc hiện tại vào localStorage mỗi khi đổi bài
    useEffect(() => {
        localStorage.setItem("currentSong", JSON.stringify(song));
    }, [song]);
  
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(1); // 1 = 100%
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const seekRef = useRef(false);
  const delayTimeoutRef = useRef(null); // Lưu ID của timeout tránh bị mất khi re-render
  const preVolume = useRef(0)
  const toggleRepeat = () => {
    const audio = audioRef.current
    if (!audio) return;
    setCurrentTime(0)
    setIsPlaying(true)
    setProgress(0)
    audio.currentTime = 0
    if (!isPlaying) {
      audio.play()
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
  

  const toggleMute = () => { // Hàm xử lý mute/unmute
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.muted) {
      setVolume(preVolume.current)
    }
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
  
    if (seekRef.current) { // dùng khi vừa nhấn tua nhạc
      seekRef.current = false;
  
      // Dừng lại 200ms trước khi phát tiếp
      clearTimeout(delayTimeoutRef.current); // tránh setTimeout chồng chéo
      delayTimeoutRef.current = setTimeout(() => {
        audio.play();
      }, 210);
    } else {
      setCurrentTime(audio.currentTime);
      onTimeUpdate(audio.currentTime)
      const percent = (audio.currentTime / audio.duration) * 100;
      setProgress(percent);
    }
  };
  
  const handleProgressChange = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
  
    seekRef.current = true;
    audio.pause(); // dừng phát ngay khi tua
  
    const newVal = e.target.value;
    const newTime = (newVal / 100) * audio.duration;
  
    audio.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress(newVal);
    };

  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updatePlayState = () => setIsPlaying(!audio.paused);
    audio.addEventListener("play", updatePlayState);
    audio.addEventListener("pause", updatePlayState);

    const updateDuration = () => setDuration(audio.duration);
    audio.addEventListener("loadedmetadata", updateDuration);

    const handleTimeUpdateWrapper = () => {
      handleTimeUpdate();
      if (audio.currentTime === audio.duration) {
        setIsPlaying(false)
      }}
    audio.addEventListener("timeupdate", handleTimeUpdateWrapper); // vài trăm ms gọi 1 lần --> gọi liên tục

    return () => {
      audio.removeEventListener("play", updatePlayState);
      audio.removeEventListener("pause", updatePlayState);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("timeupdate", handleTimeUpdateWrapper);
    };
  }, []);
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      preVolume.current = volume;
      if (audioRef.current.volume === 0) {
        setIsMuted (true)
      }
      else {
        setIsMuted(false)
      }
    }
  }, [volume]); // chạy khi volume thay đổi

  useEffect(() => {
    if (!song || !audioRef.current) return;
  
    const audio = audioRef.current;
  
    // 1. Dừng bài cũ (nếu đang phát)
    audio.pause();
  
    // 2. Reset thời gian về đầu
    audio.currentTime = 0;
  
    // 3. Reset trạng thái
    setProgress(0);
    setCurrentTime(0);
    setDuration(audio.duration);
  
    // 4. Phát bài mới
    const playNewSong = async () => {
      try {
        await audio.play(); // Có thể bị lỗi nếu chưa tương tác
        setIsPlaying(true);
      } catch (err) {
        console.warn("Không thể tự động phát nhạc:", err);
        setIsPlaying(false);
      }
    };
  
    // Gọi hàm phát bài
    playNewSong();
  
  }, [song]);   
  const playerStyle = fullScreen
    ? {
      display: 'flex',
      alignItems: 'center',
      padding: '0',
      position: 'fixed',
      bottom: '0',
      right: '0',
      left: '0',
      backgroundColor: '#170F23',
      height: '100px',
      color: 'aliceblue'
      }
    : {
      display: 'flex',
      alignItems: 'center',
      padding: '0',
      position: 'fixed',
      bottom: '0',
      right: '0',
      left: '240px',
      backgroundColor: '#170F23',
      height: '80px',
      color: 'aliceblue'
      };
  return (
    <div className="music-player-container" style={playerStyle}>
      <div className="song-profile">
        <img
          src={song.img}
          alt="song-cover"
        />
        <div className="song-profile-details">
          <div className="song-name">{song.song_name}</div>
          <div className="song-author">{song.author}</div>
        </div>
      </div>

      <div className="main-tools-container">
        <div className="play-music-tool">
          <FaRandom />
          <FaStepBackward />
          <button onClick={togglePlay} className="play-btn">
            {isPlaying ? <FaPause style={{ color: "white", border: "1px solid white", borderRadius: "50%", width: '25px', height: '25px', padding: '5px' }}/> : <FaPlay style={{ color: "white", border: "1px solid white", borderRadius: "50%", width: '25px', height: '25px', padding: '5px' }}/>}
          </button>
          <FaStepForward />
          <FaRedoAlt className="reload-music" onClick={toggleRepeat} style={{ cursor: "pointer" }}/>
        </div>
        <div className="range-change-time-container">
          <span className="text-xs">{formatTime(currentTime)}</span>
          <input
            type="range"
            value={progress}
            onChange={handleProgressChange}
            className="w-full changeTime"
            min="0" max="100"
            style={{ cursor: "pointer" }}
          />
          <span className="text-xs">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="music-play-option">
        <button onClick={toggleMute} className="option-btn">
          {isMuted ? <FaVolumeMute  style={{ color: "white", border: "1px solid white", borderRadius: "50%", width: '25px', height: '25px', padding: '5px' }}/> : <FaVolumeUp style={{ color: "white", border: "1px solid white", borderRadius: "50%", width: '25px', height: '25px', padding: '5px' }}/>}
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

      <audio ref={audioRef} src= {song.audio} preload="auto"/>
    </div>
  );
}
/* 
Các hàm liên quan đếu audio
  <audio ref={audioRef} src="../../backend/data/mp3/EXitSign-HIEUTHUHAI.mp3" />
  const audio = audioRef.current -- trỏ vào audio có ref là audioRef
  audio.pause() : dừng nhạc -- không trả về Promise
  audio.play() : phát nhạc -- trả về Promise
  audio.muted: tắt bật tiếng ( true là tắt)
  audio.currentTime: cho biết tgian phát nhạc hiện tại
  audio.duration: cho biết tổng thời lượng bài nhạc
  audio.loop: repeat song
  React tự động re-render giao diện mỗi khi state hoặc props thay đổi.
  Chỉ cập nhật phần UI cần thiết, không cần reload toàn bộ trang
*/