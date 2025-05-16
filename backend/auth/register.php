<?php
// register.php
include 'database.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$response = ["success" => false, "message" => ""];

// Nhận dữ liệu từ frontend (được gửi qua JSON)
$data = json_decode(file_get_contents("php://input"), true);

// Lấy giá trị từ dữ liệu gửi về
$First_name = isset($data['First_name']) ? trim($data['First_name']) : '';
$Email = isset($data['Email']) ? trim($data['Email']) : '';
$Password = isset($data['Password']) ? $data['Password'] : '';
$Confirm_password = isset($data['Confirm_password']) ? $data['Confirm_password'] : '';

// Kiểm tra dữ liệu đầu vào
if (empty($First_name) || empty($Email) || empty($Password) || empty($Confirm_password)) {
    $response["message"] = "Vui lòng nhập đầy đủ thông tin!";
    echo json_encode($response);
    exit();
}

// Kiểm tra độ dài mật khẩu
if (strlen($Password) < 6) {
    $response["message"] = "Mật khẩu phải có ít nhất 6 ký tự!";
    echo json_encode($response);
    exit();
}

// Kiểm tra email hợp lệ
if (!filter_var($Email, FILTER_VALIDATE_EMAIL)) {
    $response["message"] = "Email không hợp lệ!";
    echo json_encode($response);
    exit();
}

// Kiểm tra mật khẩu và xác nhận mật khẩu
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

// Câu truy vấn để lưu thông tin người dùng mới vào database
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
?>