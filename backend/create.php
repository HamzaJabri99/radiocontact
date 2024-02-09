<?php
// Set CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");


require 'db_config.php';

function checkClaimedReward($ip_address, $device_fingerprint)
{
    $database = new Connection();
    $db = $database->openConnection();
    $stmtCheck = $db->prepare("SELECT id FROM claimed_vouchers WHERE ip_address = ? OR device_fingerprint = ?");
    $stmtCheck->execute([$ip_address, $device_fingerprint]);
    $existingClaim = $stmtCheck->fetch();

    if ($existingClaim) {
        return true;
    } else {
        return false;
    }
}

try {
    // Get the request body
    $requestData = $_POST;
    $database = new Connection();
    $db = $database->openConnection();

    if (!isset($requestData['ip_address']) || !isset($requestData['device_fingerprint'])) {
        http_response_code(400);
        echo json_encode(array("error" => "Invalid request data"));
        exit();
    }
    if (isset($requestData['claim_reward'])) {
        if (checkClaimedReward($requestData['ip_address'], $requestData['device_fingerprint'])) {
            // User has already claimed a voucher, prevent them from claiming another one
            http_response_code(400);
            echo json_encode(array("error" => "You have already claimed a voucher", "alreadyClaimed" => true));
            exit();
        }
        $stmtSelect = $db->prepare("SELECT id,code FROM vouchers WHERE value=? AND claimed=?");
        $stmtSelect->execute([$requestData['claim_reward']['prize'], 0]);
        $resultSelect = $stmtSelect->fetch();

        if ($resultSelect) {
            // Update the claimed status for the voucher
            $stmtInsert = $db->prepare('INSERT INTO claimed_vouchers(ip_address,device_fingerprint,voucher_code,claimed_at) values (?,?,?,?)');
            $stmtInsert->execute([$requestData['ip_address'], $requestData['device_fingerprint'], $resultSelect['code'], date('Y-m-d H:i:s')]);
            $stmtUpdateUser = $db->prepare("UPDATE participation_records SET voucher_id=? WHERE ip_address=? AND device_fingerprint=?");
            $stmtUpdateUser->execute([$resultSelect['id'], $requestData['ip_address'], $requestData['device_fingerprint']]);
            $stmtUpdate = $db->prepare("UPDATE vouchers SET claimed=? WHERE code=?");
            $stmtUpdate->execute([1, $resultSelect['code']]);
            http_response_code(200);
            echo json_encode(array("message" => $resultSelect['code']));
            exit();
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "No Code Found For This"));
            exit();
        }
    }
    if (isset($requestData['insertUser'])) {
        // Insert the participation record into the database
        $stmt = $db->prepare("INSERT INTO participation_records (ip_address, device_fingerprint,voucher_id) VALUES (?, ?, ?)");
        $stmt->execute([$requestData['ip_address'], $requestData['device_fingerprint'], $resultSelect['id']]);

        // Respond with success
        http_response_code(200);
        echo json_encode(array("message" => "Participation recorded successfully"));
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(array("error" => "Internal server error"));
    exit();
}
