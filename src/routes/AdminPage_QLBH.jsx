import React, { useState, useEffect } from "react";
import "../assets/styles/AdminPage_QLBH.css";

function AdminPage_QLBH() {
  const [songs, setSongs] = useState([]);
  const [newSong, setNewSong] = useState({ title: "", artist: "", genre: "" });

  useEffect(() => {
    fetch("http://localhost/get_songs.php")
      .then(res => res.json())
      .then(setSongs)
      .catch(err => console.error("Lỗi tải bài hát:", err));
  }, []);

  const handleDelete = (id, title) => {
    if (!window.confirm(`Bạn chắc chắn muốn xóa bài hát "${title}"?`)) return;

    fetch("http://localhost/delete_song.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          setSongs(songs.filter(s => s.id !== id));
        } else {
          alert("Xóa thất bại");
        }
      });
  };

  const handleAdd = () => {
    if (!newSong.title || !newSong.artist || !newSong.genre) {
      alert("Vui lòng nhập đầy đủ thông tin bài hát.");
      return;
    }

    fetch("http://localhost/add_song.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSong),
    })
      .then(res => res.json())
      .then(res => {
        if (res.success && res.song) {
          setSongs([...songs, res.song]);
          setNewSong({ title: "", artist: "", genre: "" });
        } else {
          alert("Thêm thất bại");
        }
      });
  };

  return (
    <div className="song-manager">
      <br />
      <br />
      <h2>🎵 Quản Lý Bài Hát</h2>

      <div className="add-form">
        <h4>Thêm Bài Hát Mới</h4>
        <input placeholder="Tên bài hát" value={newSong.title} onChange={e => setNewSong({ ...newSong, title: e.target.value })} />
        <input placeholder="Ca sĩ" value={newSong.artist} onChange={e => setNewSong({ ...newSong, artist: e.target.value })} />
        <input placeholder="Thể loại" value={newSong.genre} onChange={e => setNewSong({ ...newSong, genre: e.target.value })} />
        <button className="add-btn" onClick={handleAdd}>Thêm</button>
      </div>

      <table className="song-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên bài hát</th>
            <th>Ca sĩ</th>
            <th>Thể loại</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song, i) => (
            <tr key={song.id}>
              <td>{i + 1}</td>
              <td>{song.title}</td>
              <td>{song.artist}</td>
              <td>{song.genre}</td>
              <td>
                <button className="delete-btn" onClick={() => handleDelete(song.id, song.title)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage_QLBH;