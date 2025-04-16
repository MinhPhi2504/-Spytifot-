<?php
$servername = "localhost";
$username = "root";  // XAMPP mặc định user là root
$password = "";      // Không có mật khẩu mặc định
$database = "music_website";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Lỗi kết nối database: " . $conn->connect_error);
}
?>
