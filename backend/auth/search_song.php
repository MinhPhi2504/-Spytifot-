<?php
// search_songs.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // hỗ trợ cả GET nếu dùng fetch mặc định
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json"); // Đặt một lần duy nhất

require_once("database.php");

$query = isset($_GET['query']) ? $_GET['query'] : '';

if (empty($query)) {
    echo json_encode([]);
    exit;
}

$stmt = $conn->prepare("SELECT id, song_name, author FROM song WHERE song_name LIKE CONCAT('%', ?, '%') LIMIT 10");
$stmt->bind_param("s", $query);
$stmt->execute();
$result = $stmt->get_result();

$songs = [];
while ($row = $result->fetch_assoc()) {
    $songs[] = $row;
}

echo json_encode($songs);

$stmt->close();
$conn->close();
