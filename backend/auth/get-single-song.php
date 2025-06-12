<?php

// Cho phép gọi từ React hoặc trình duyệt
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json");

// Xử lý preflight của CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Kết nối cơ sở dữ liệu
include("database.php");

// Lấy dữ liệu từ body (POST dạng JSON)
$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'] ?? null;

if ($id) {
    $stmt = $conn->prepare("SELECT * FROM song WHERE id = ?");
    $stmt->bind_param("s", $id); // ID là dạng chuỗi

    if ($stmt->execute()) {
        $result = $stmt->get_result();
        $song = $result->fetch_assoc();

        if ($song) {
            echo json_encode([
                "success" => true,
                "song" => $song
            ]);
        } else {
            echo json_encode([
                "success" => false,
                "message" => "Không tìm thấy bài hát"
            ]);
        }
    } else {
        echo json_encode([
            "success" => false,
            "error" => $stmt->error
        ]);
    }

    $stmt->close();
} else {
    echo json_encode([
        "success" => false,
        "error" => "Thiếu ID"
    ]);
}
