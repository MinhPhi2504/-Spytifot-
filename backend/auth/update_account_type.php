<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Trả lời request OPTIONS (preflight) ngay
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'database.php';

$response = ["success" => false, "message" => ""];

// Đọc dữ liệu JSON từ frontend
$data = json_decode(file_get_contents("php://input"), true);

// Kiểm tra dữ liệu đầu vào
if (!isset($data["id"]) || !isset($data["account_type"])) {
    $response["message"] = "Thiếu thông tin!";
    echo json_encode($response);
    exit();
}

$id = intval($data["id"]);
$account_type = $data["account_type"];
$valid_types = ["normal", "plus", "premium"];

if (!in_array($account_type, $valid_types)) {
    $response["message"] = "Loại tài khoản không hợp lệ!";
    echo json_encode($response);
    exit();
}

// Cập nhật trong cơ sở dữ liệu
$stmt = $conn->prepare("UPDATE users SET account_type = ? WHERE id = ?");
$stmt->bind_param("si", $account_type, $id);

if ($stmt->execute()) {
    $response["success"] = true;
    $response["message"] = "Cập nhật thành công!";
} else {
    $response["message"] = "Cập nhật thất bại!";
}

$stmt->close();
$conn->close();
echo json_encode($response);
?>
