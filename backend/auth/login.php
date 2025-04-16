<?php
include 'database.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$response = ["success" => false, "message" => "", "user" => null];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Nhận dữ liệu từ frontend
    $Email = isset($_POST['Email']) ? trim($_POST['Email']) : '';
    $Password = isset($_POST['Password']) ? $_POST['Password'] : '';
    
    // Kiểm tra dữ liệu đầu vào
    if (empty($Email) || empty($Password)) {
        $response["message"] = "Vui lòng nhập email và mật khẩu!";
        echo json_encode($response);
        exit();
    }
    
    // Kiểm tra email có tồn tại trong database không
    $query = $conn->prepare("SELECT id, First_name, Email, Password FROM users WHERE Email = ?");
    $query->bind_param("s", $Email);
    $query->execute();
    $result = $query->get_result();
    
    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        
        // Kiểm tra mật khẩu
        if (password_verify($Password, $user['Password'])) {
            // Xóa mật khẩu trước khi trả về thông tin người dùng
            unset($user['Password']);
            
            $response["success"] = true;
            $response["message"] = "Đăng nhập thành công!";
            $response["user"] = $user;
        } else {
            $response["message"] = "Mật khẩu không chính xác!";
        }
    } else {
        $response["message"] = "Email không tồn tại!";
    }
    
    $query->close();
    $conn->close();
    
    echo json_encode($response);
    exit();
}
?>