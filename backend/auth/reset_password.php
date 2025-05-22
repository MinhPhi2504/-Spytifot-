<?php
include 'database.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$response = ["success" => false, "message" => ""];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"] ?? '';
    $code = $_POST["code"] ?? '';
    $password = $_POST["new_password"] ?? '';

    if (!$email || !$code || !$password) {
        $response["message"] = "Vui lòng nhập đầy đủ thông tin!";
        echo json_encode($response);
        exit();
    }

    // Kiểm tra mã xác nhận hợp lệ
    $stmt = $conn->prepare("SELECT id FROM users WHERE Email = ? AND reset_code = ?");
    $stmt->bind_param("ss", $email, $code);
    $stmt->execute();
    $res = $stmt->get_result();

    if ($res->num_rows > 0) {
        // Mã hợp lệ => cập nhật mật khẩu mới
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
        $stmt = $conn->prepare("UPDATE users SET Password = ?, reset_code = NULL WHERE Email = ?");
        $stmt->bind_param("ss", $hashedPassword, $email);
        $stmt->execute();

        $response["success"] = true;
        $response["message"] = "Mật khẩu đã được cập nhật!";
    } else {
        $response["message"] = "Mã xác nhận không hợp lệ!";
    }
} else {
    $response["message"] = "Phương thức không hợp lệ";
}

echo json_encode($response);
exit();
