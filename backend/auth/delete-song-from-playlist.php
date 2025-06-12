<?php
// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Xử lý preflight request (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Kết nối CSDL
include 'database.php';

// Nhận dữ liệu JSON
$data = json_decode(file_get_contents("php://input"), true);
$playlist_id = isset($data['playlist_id']) ? (int)$data['playlist_id'] : 0;
$song_id = isset($data['song_id']) ? $data['song_id'] : "";

// Kiểm tra hợp lệ
if (!$playlist_id || !$song_id) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Thiếu playlist_id hoặc song_id"]);
    exit();
}

// Xoá bản ghi trong bảng playlist_songs
$sql = "DELETE FROM playlist_songs WHERE playlist_id = ? AND song_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("is", $playlist_id, $song_id);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Đã xoá bài hát khỏi playlist"]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Xoá thất bại"]);
}

$stmt->close();
$conn->close();
?>
