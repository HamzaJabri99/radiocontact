<?php
// Assuming you're using PDO for database access
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');
// Include your database connection configuration file
// require 'db_config.php';

// // Get the IP address of the user
// $ipAddress = $_SERVER['REMOTE_ADDR'];

// // Get the device fingerprint (you may need to adjust this method)
// $deviceFingerprint = $_SERVER['HTTP_USER_AGENT']; // Example, you might want to use a more advanced method

// try {
//     // Find an unclaimed voucher
//     $stmt = $pdo->prepare("SELECT * FROM vouchers WHERE claimed = 0 LIMIT 1");
//     $stmt->execute();
//     $voucher = $stmt->fetch(PDO::FETCH_ASSOC);

//     if (!$voucher) {
//         http_response_code(400);
//         echo json_encode(array("error" => "No available vouchers"));
//         exit();
//     }

//     // Record participation
//     $stmt = $pdo->prepare("INSERT INTO participation_records (ip_address, device_fingerprint, voucher_id) VALUES (?, ?, ?)");
//     $stmt->execute([$ipAddress, $deviceFingerprint, $voucher['id']]);

//     // Mark the voucher as claimed
//     $stmt = $pdo->prepare("UPDATE vouchers SET claimed = 1 WHERE id = ?");
//     $stmt->execute([$voucher['id']]);

//     // Respond with the claimed voucher code
//     http_response_code(200);
//     echo json_encode(array("voucherCode" => $voucher['code']));
// } catch (PDOException $e) {
//     http_response_code(500);
//     echo json_encode(array("error" => "Internal server error"));
//     exit();
// }
echo 'hello';
?>