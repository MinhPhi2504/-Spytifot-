<?php
require_once("database.php"); 

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json"); 

$sql = "SELECT * FROM song";
$result = $conn->query($sql);

$songs = [];
while ($row = $result->fetch_assoc()) {
    $songs[] = $row;
}

echo json_encode($songs);
?>
