<?php
include 'database.php';

header("Access-Control-Allow-Origin: *"); // Cho phép mọi nguồn truy cập (CORS)
header("Content-Type: application/json"); // Trả về JSON
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$response = ["success" => false, "message" => ""];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $first_name = $_POST['first_name'] ?? '';
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';
    $confirm_password = $_POST['confirm_password'] ?? '';

    if (empty($first_name) || empty($email) || empty($password) || empty($confirm_password)) {
        $response["message"] = "Vui lòng nhập đầy đủ thông tin!";
        echo json_encode($response);
        exit();
    }

    if ($password !== $confirm_password) {
        $response["message"] = "Mật khẩu nhập lại không khớp!";
        echo json_encode($response);
        exit();
    }

    // Kiểm tra email đã tồn tại chưa
    $check_email = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $check_email->bind_param("s", $email);
    $check_email->execute();
    $check_email->store_result();

    if ($check_email->num_rows > 0) {
        $response["message"] = "Email đã tồn tại!";
        echo json_encode($response);
        exit();
    }
    $check_email->close();

    // Lưu vào database
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);
    $query = $conn->prepare("INSERT INTO users (first_name, email, password) VALUES (?, ?, ?)");
    $query->bind_param("sss", $first_name, $email, $hashed_password);

    if ($query->execute()) {
        $response["success"] = true;
        $response["message"] = "Đăng ký thành công!";
    } else {
        $response["message"] = "Lỗi khi đăng ký, thử lại!";
    }

    $query->close();
    $conn->close();

    echo json_encode($response);
    exit();
}
?>
