<?php
// CORS headers
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With");

// Xử lý preflight request (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Tiếp tục xử lý logic playlist
include("database.php");
$userID = $_GET['userID'];

$query = "SELECT * FROM playlists WHERE user_id = '$userID'";
$data = mysqli_query($conn, $query);
$list = [];

while ($row = mysqli_fetch_assoc($data)) {
    $id_playlist = $row['playlist_id'];
    $song_ids = [];

    $songQuery = "SELECT song_id FROM playlist_songs WHERE playlist_id = '$id_playlist'";
    $songData = mysqli_query($conn, $songQuery);
    
    while ($songRow = mysqli_fetch_assoc($songData)) {
        $song_ids[] = $songRow['song_id'];
    }

    $list[] = [
        'id_playlist' => $id_playlist,
        'name' => $row['name'],
        'id_songs' => $song_ids
    ];
}

echo json_encode($list);
?>
