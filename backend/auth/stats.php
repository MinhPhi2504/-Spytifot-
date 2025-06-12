<?php
// stats.php

// 1) Hiển thị lỗi lên trình duyệt (DEV)  
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);


// 2) CORS (cho phép mọi origin dev gọi được)  
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// 3) Thiết lập header JSON  
header('Content-Type: application/json; charset=utf-8');

// 4) Kết nối database trực tiếp (không include để tránh đường dẫn sai)  
$servername = "localhost";
$username   = "root";
$password   = "";
$dbname     = "music_website";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Kết nối CSDL thất bại: ' . $conn->connect_error
    ]);
    exit;
}
$conn->set_charset('utf8mb4');

// 5) Debug: kiểm tra bảng có tồn tại không  
$check = $conn->query("SHOW TABLES LIKE 'song'");
if (!$check || $check->num_rows === 0) {
    http_response_code(500);
    echo json_encode([
        'error' => "Bảng 'song' không tồn tại trong database `{$dbname}`."
    ]);
    exit;
}

try {
    // 6.1) Đếm tổng số bài hát  
    $res = $conn->query("SELECT COUNT(*) AS totalSongs FROM song");
    if (!$res) throw new Exception($conn->error);
    $totalSongs = (int)$res->fetch_assoc()['totalSongs'];

    // 6.2) Đếm tổng số nghệ sĩ (tách theo dấu phẩy)  
    $artists = [];
    $res = $conn->query("SELECT author FROM song");
    if (!$res) throw new Exception($conn->error);
    while ($row = $res->fetch_assoc()) {
        foreach (explode(',', $row['author']) as $name) {
            $name = trim($name);
            if ($name !== '') {
                $artists[] = $name;
            }
        }
    }
    $totalArtists = count(array_unique($artists));

    // 6.3) Đếm tổng số playlist/album  
    $res = $conn->query("SELECT COUNT(*) AS totalPlaylists FROM playlists");
    if (!$res) throw new Exception($conn->error);
    $totalPlaylists = (int)$res->fetch_assoc()['totalPlaylists'];

    // 7) Trả về JSON thống kê  
    echo json_encode([
        'songs'     => $totalSongs,
        'artists'   => $totalArtists,
        'playlists' => $totalPlaylists
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Lỗi truy vấn: ' . $e->getMessage()
    ]);
}

$conn->close();
