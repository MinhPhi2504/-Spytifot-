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
import { audio } from "framer-motion/client";
export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const seekRef = useRef(false);
  const delayTimeoutRef = useRef(null); // Lưu ID của timeout tránh bị mất khi re-render

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
        console.log("Phát lại sau khi tua");
      }, 100);
    } else {
      setCurrentTime(audio.currentTime);
      const percent = (audio.currentTime / audio.duration) * 100;
      setProgress(percent);
      // console.log("handleTimeUpdate");
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
  
    console.log("handleProgressChange");
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

  return (
    <div className="music-player-container">
      <div className="song-profile">
        <img
          src="../../public/img/exit-sign.jpg"
          alt="song-cover"
        />
        <div className="song-profile-details">
          <div className="song-name">Exit Sign</div>
          <div className="song-author">HIEUTHUHAI</div>
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
          <FaRedoAlt />
        </div>
        <div className="range-change-time-container">
          <span className="text-xs">{formatTime(currentTime)}</span>
          <input
            type="range"
            value={progress}
            onChange={handleProgressChange}
            className="w-full changeTime"
            min="0" max="100"
          />
          <span className="text-xs">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="music-play-option">
        <button onClick={toggleMute} className="text-xl">
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
      </div>

      <audio ref={audioRef} src="../../backend/data/mp3/WrongTimes.mp3" preload="auto"/>
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

  React tự động re-render giao diện mỗi khi state hoặc props thay đổi.
  Chỉ cập nhật phần UI cần thiết, không cần reload toàn bộ trang


*/