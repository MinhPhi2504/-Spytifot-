<?php
include 'database.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$response = ["success" => false, "message" => ""];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Nhận dữ liệu từ frontend
    $First_name = $_POST['First_name'] ?? '';
    $Email = $_POST['Email'] ?? '';
    $Password = $_POST['Password'] ?? '';
    $Confirm_password = $_POST['Confirm_password'] ?? '';

    // Kiểm tra dữ liệu đầu vào
    if (empty($First_name) || empty($Email) || empty($Password) || empty($Confirm_password)) {
        $response["message"] = "Vui lòng nhập đầy đủ thông tin!";
        echo json_encode($response);
        exit();
    }

    if ($Password !== $Confirm_password) {
        $response["message"] = "Mật khẩu nhập lại không khớp!";
        echo json_encode($response);
        exit();
    }

    // Kiểm tra email đã tồn tại chưa
    $check_email = $conn->prepare("SELECT id FROM users WHERE Email = ?");
    $check_email->bind_param("s", $Email);
    $check_email->execute();
    $check_email->store_result();

    if ($check_email->num_rows > 0) {
        $response["message"] = "Email đã tồn tại!";
        echo json_encode($response);
        exit();
    }
    $check_email->close();

    // Mã hóa mật khẩu và lưu vào database
    $hashed_password = password_hash($Password, PASSWORD_BCRYPT);
    $query = $conn->prepare("INSERT INTO users (First_name, Email, Password) VALUES (?, ?, ?)");
    $query->bind_param("sss", $First_name, $Email, $hashed_password);

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
