<?php
include 'database.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"));

$playlistName = $data->name;
$isPublic = $data->is_public ? 1 : 0;
$isShuffle = $data->is_shuffle ? 1 : 0;
$user_id = $data->user_id;
// Dùng Prepared Statement để an toàn hơn
$stmt = $conn->prepare("INSERT INTO playlists (name, is_public, is_shuffle, user_id) VALUES (?, ?, ?, ?)");
$stmt->bind_param("siii", $playlistName, $isPublic, $isShuffle, $user_id);
$stmt->execute();
// if ($stmt->execute()) {
//     $playlistId = $conn->insert_id; // lấy id playlist mới tạo

//     // Các bài hát mẫu
//     $sampleSongs = [1, 2, 3, 4];

//     // Thêm từng bài hát vào playlist_songs
//     foreach ($sampleSongs as $songId) {
//         $insertSongStmt = $conn->prepare("INSERT INTO playlist_songs (playlist_id, song_id) VALUES (?, ?)");
//         $insertSongStmt->bind_param("ii", $playlistId, $songId);
//         $insertSongStmt->execute();
//         $insertSongStmt->close();
//     }

//     echo json_encode(["status" => "success", "message" => "Playlist created successfully with sample songs"]);
// } else {
//     echo json_encode(["status" => "error", "message" => "Error: " . $conn->error]);
// }

$stmt->close();
$conn->close();
?>
