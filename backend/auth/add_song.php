<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
include 'database.php';

$data = json_decode(file_get_contents("php://input"), true);

$id = uniqid(); // Tạo ID đơn giản
$song_name = $data["title"];
$author = $data["artist"];
$style = $data["genre"];

// Giá trị mặc định cho các cột khác
$album = $author;
$premium = 0;
$time = 3;
$img = "/img/default.jpg";
$audio = "/mp3/default.mp3";
$lyric = null;

$sql = "INSERT INTO song (id, song_name, author, album, style, premium, time, img, audio, lyric)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssiisss", $id, $song_name, $author, $album, $style, $premium, $time, $img, $audio, $lyric);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "song" => [
            "id" => $id,
            "title" => $song_name,
            "artist" => $author,
            "genre" => $style
        ]
    ]);
} else {
    echo json_encode(["success" => false, "error" => $stmt->error]);
}

$stmt->close();
?>
