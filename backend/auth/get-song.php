<?php
require_once("database.php"); // Kết nối CSDL

// ✅ CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // hỗ trợ cả GET nếu dùng fetch mặc định
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json"); // Đặt một lần duy nhất

// ✅ Truy vấn dữ liệu
$sql = "SELECT * FROM song";
$result = $conn->query($sql);

$songs = [];
while ($row = $result->fetch_assoc()) {
    $songs[] = $row;
}

// ✅ Trả JSON
echo json_encode($songs);
?>
