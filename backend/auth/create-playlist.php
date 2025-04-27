<?php
include 'database.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
// Kiểm tra kết nối
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Nhận dữ liệu từ request
$data = json_decode(file_get_contents("php://input"));

$playlistName = $data->name;
$isPublic = $data->is_public ? 1 : 0;
$isShuffle = $data->is_shuffle ? 1 : 0;

// Chèn dữ liệu vào database
$sql = "INSERT INTO playlists (name, is_public, is_shuffle) VALUES ('$playlistName', '$isPublic', '$isShuffle')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "success", "message" => "Playlist created successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error: " . $conn->error]);
}

$conn->close();
?>
