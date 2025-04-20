import React, { useState } from "react";
import "../assets/styles/CreatePlaylistModal.css";

const CreatePlaylistModal = ({ onClose }) => {
  const [playlistName, setPlaylistName] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [isShuffle, setIsShuffle] = useState(true);

  const handleCreate = () => {
    console.log({
      name: playlistName,
      public: isPublic,
      shuffle: isShuffle,
    });
    onClose(); // đóng modal sau khi tạo
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2 className="modal-title">Tạo playlist mới</h2>
        <input
          type="text"
          placeholder="Nhập tên playlist"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          className="playlist-input"
        />

        <div className="option-row">
          <div className="option-text">
            <p className="option-title">Công khai</p>
            <p className="option-subtitle">Mọi người có thể nhìn thấy playlist này</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={() => setIsPublic(!isPublic)}
            />
            <span className="slider round"></span>
          </label>
        </div>

        <div className="option-row">
          <div className="option-text">
            <p className="option-title">Phát ngẫu nhiên</p>
            <p className="option-subtitle">Luôn phát ngẫu nhiên tất cả bài hát</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={isShuffle}
              onChange={() => setIsShuffle(!isShuffle)}
            />
            <span className="slider round"></span>
          </label>
        </div>

        <button className="create-button" onClick={handleCreate}>
          TẠO MỚI
        </button>
      </div>
    </div>
  );
};

export default CreatePlaylistModal;
