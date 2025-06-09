import React from "react";
import "../assets/styles/AdminPage_QLBH.css";

function AdminPage_QLBH() {
  const songs = [
    { id: 1, title: "Bài Hát 1", artist: "Ca Sĩ A", genre: "Pop" },
    { id: 2, title: "Bài Hát 2", artist: "Ca Sĩ B", genre: "Rock" },
    { id: 3, title: "Bài Hát 3", artist: "Ca Sĩ C", genre: "Jazz" },
  ];

  return (
    <div className="song-manager">
      <h2>🎵 Quản Lý Bài Hát</h2>
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
          {songs.map((song, index) => (
            <tr key={song.id}>
              <td>{index + 1}</td>
              <td>{song.title}</td>
              <td>{song.artist}</td>
              <td>{song.genre}</td>
              <td>
                <button className="edit-btn">Sửa</button>
                <button className="delete-btn">Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage_QLBH;
