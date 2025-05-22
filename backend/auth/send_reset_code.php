<?php
require 'vendor/autoload.php'; // load Composer autoload

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

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

    if (empty($email)) {
        $response["message"] = "Email không được để trống!";
        echo json_encode($response);
        exit();
    }

    // Kiểm tra email có tồn tại trong DB không
    $stmt = $conn->prepare("SELECT id FROM users WHERE Email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $res = $stmt->get_result();

    if ($res->num_rows === 0) {
        $response["message"] = "Email không tồn tại!";
        echo json_encode($response);
        exit();
    }

    // Tạo mã xác nhận 6 ký tự in hoa + số
    $code = strtoupper(substr(str_shuffle("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 6));

    // Lưu mã vào DB
    $stmt = $conn->prepare("UPDATE users SET reset_code = ? WHERE Email = ?");
    $stmt->bind_param("ss", $code, $email);
    $stmt->execute();

    // Gửi mail qua SMTP Gmail
    // Gửi mail qua SMTP Gmail
$mail = new PHPMailer(true);

try {
    $mail->ErrorInfo; // Bật debug trước khi gọi send
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;

    $mail->Username = 'luudangthanh43@gmail.com';        // Gmail của bạn
    $mail->Password = 'vudfymwooxakhlct';                // App Password của bạn
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    $mail->setFrom('luudangthanh43@gmail.com', 'Admin');
    $mail->addAddress($email);

    $mail->isHTML(true);
    $mail->Subject = 'Mã xác nhận đổi mật khẩu';
    $mail->Body = "<h3>Mã xác nhận đổi mật khẩu của bạn là: <strong>$code</strong></h3>";

    $mail->send();

    $response["success"] = true;
    $response["message"] = "Mã xác nhận đã được gửi qua email!";
    $response["code"] = $code; // Debug, nên xóa dòng này khi lên production
} catch (Exception $e) {
    $response["message"] = "Không gửi được email. Lỗi: " . $mail->ErrorInfo;
}

} else {
    $response["message"] = "Phương thức không hợp lệ";
}

echo json_encode($response);
exit();
