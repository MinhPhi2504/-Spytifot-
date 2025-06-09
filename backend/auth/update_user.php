<?php
include 'database.php';

// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Trả về ngay nếu là preflight request (CORS check)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Nhận và xử lý dữ liệu JSON
$data = json_decode(file_get_contents("php://input"), true);

$id = intval($data["id"] ?? 0);
$name = $data["First_name"] ?? "";
$email = $data["Email"] ?? "";
$type = $data["account_type"] ?? "";

if ($id > 0 && $name && $email && $type) {
    $stmt = $conn->prepare("UPDATE users SET First_name = ?, Email = ?, account_type = ? WHERE id = ?");
    $stmt->bind_param("sssi", $name, $email, $type, $id);
    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Không thể cập nhật"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["error" => "Dữ liệu không hợp lệ"]);
}

$conn->close();
