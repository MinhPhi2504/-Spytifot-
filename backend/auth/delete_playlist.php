<?php
// Kết nối CSDL
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
include 'database.php';

// Nhận playlist_id từ yêu cầu
$data = json_decode(file_get_contents("php://input"), true);

// Kiểm tra hợp lệ
if (!isset($data['playlist_id'])) {
    http_response_code(400);
    echo "Thiếu dữ liệu playlist_id";
    exit;
}

$playlist_id = intval($data['playlist_id']);
// Xóa các bản ghi liên quan trong bảng playlist_songs trước (tránh lỗi ràng buộc)
$sql_delete_songs = "DELETE FROM playlist_songs WHERE playlist_id = ?";
$stmt_songs = $conn->prepare($sql_delete_songs);
$stmt_songs->bind_param("i", $playlist_id);
$stmt_songs->execute();
$stmt_songs->close();

// Xóa playlist chính
$sql_delete_playlist = "DELETE FROM playlists WHERE playlist_id = ?";
$stmt_playlist = $conn->prepare($sql_delete_playlist);
$stmt_playlist->bind_param("i", $playlist_id);

if ($stmt_playlist->execute()) {
    echo json_encode(["success" => true, "message" => "Đã xóa playlist thành công"]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Lỗi khi xóa playlist"]);
}

$stmt_playlist->close();
$conn->close();
?>
