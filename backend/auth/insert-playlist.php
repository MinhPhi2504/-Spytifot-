<?php

// Cho phép mọi nguồn (origin) gửi request tới
header("Access-Control-Allow-Origin: *");

// Cho phép các method HTTP (quan trọng với fetch)
header("Access-Control-Allow-Methods: POST, OPTIONS");

// Cho phép các header cụ thể (cho JSON)
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With");

// Nếu là request "preflight" (OPTIONS), thì chỉ cần trả 200 OK
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Phần xử lý POST bắt đầu từ đây ↓↓↓

$host = 'localhost';
$user = 'root';
$password = '';
$database = 'music_website'; // 🛠 đổi tên database tại đây

$conn = new mysqli($host, $user, $password, $database);

// Kiểm tra kết nối
if ($conn->connect_error) {
    http_response_code(500);
    echo "Lỗi kết nối: " . $conn->connect_error;
    exit;
}

// Lấy dữ liệu từ request
$data = json_decode(file_get_contents("php://input"), true);

// Kiểm tra dữ liệu
if (!isset($data['playlist_id']) || !isset($data['song_id'])) {
    http_response_code(400);
    echo "Thiếu dữ liệu playlist_id hoặc song_id";
    exit;
}

$playlist_id = intval($data['playlist_id']);
$song_id = $conn->real_escape_string($data['song_id']);

// Chuẩn bị câu lệnh SQL
$sql = "INSERT INTO playlist_songs (playlist_id, song_id) VALUES (?, ?)";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    http_response_code(500);
    echo "Lỗi prepare: " . $conn->error;
    exit;
}

$stmt->bind_param("is", $playlist_id, $song_id);

if ($stmt->execute()) {
    echo "Đã thêm bài hát vào playlist thành công!";
} else {
    http_response_code(500);
    echo "Lỗi khi thêm: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
