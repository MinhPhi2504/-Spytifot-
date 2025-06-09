import React, { useState, useEffect } from "react";
import "../assets/styles/AdminPage_QLBH.css";

function AdminPage_QLND() {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editForm, setEditForm] = useState({ First_name: "", Email: "", account_type: "user" });

  useEffect(() => {
    fetch("http://localhost/get_users.php")
      .then(res => res.json())
      .then(setUsers)
      .catch(err => console.error("Lỗi tải user:", err));
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Bạn chắc chắn muốn xóa?")) return;

    fetch("http://localhost/delete_user.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          setUsers(users.filter(u => u.id !== id));
        } else {
          alert("Xóa thất bại");
        }
      });
  };

  const handleEdit = (user) => {
    setEditUserId(user.id);
    setEditForm({ First_name: user.First_name, Email: user.Email, account_type: user.account_type });
  };

  const handleUpdate = () => {
    fetch("http://localhost/update_user.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editUserId, ...editForm }),
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          setUsers(users.map(u => u.id === editUserId ? { id: editUserId, ...editForm } : u));
          setEditUserId(null);
        } else {
          alert("Cập nhật thất bại");
        }
      });
  };

  return (
    <div className="song-manager">
      <h2>👤 Quản Lý Người Dùng</h2>
      <table className="song-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên người dùng</th>
            <th>Email</th>
            <th>Loại tài khoản</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={user.id}>
              <td>{i + 1}</td>
              <td>{editUserId === user.id ? (
                <input value={editForm.First_name} onChange={e => setEditForm({ ...editForm, First_name: e.target.value })} />
              ) : user.First_name}</td>
              <td>{editUserId === user.id ? (
                <input value={editForm.Email} onChange={e => setEditForm({ ...editForm, Email: e.target.value })} />
              ) : user.Email}</td>
              <td>{editUserId === user.id ? (
                <select value={editForm.account_type} onChange={e => setEditForm({ ...editForm, account_type: e.target.value })}>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              ) : user.account_type}</td>
              <td>
                {editUserId === user.id ? (
                  <>
                    <button className="edit-btn" onClick={handleUpdate}>Lưu</button>
                    <button className="delete-btn" onClick={() => setEditUserId(null)}>Hủy</button>
                  </>
                ) : (
                  <>
                    <button className="edit-btn" onClick={() => handleEdit(user)}>Sửa</button>
                    <button className="delete-btn" onClick={() => handleDelete(user.id)}>Xóa</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage_QLND;
