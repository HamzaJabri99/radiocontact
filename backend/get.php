<?php
header('Access-Control-Allow-Origin: *'); // Change to your domain
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *'); // Specify allowed methods

require_once('./db_config.php'); // Make sure this file exists and contains necessary configuration for database connection

$device_fingerprint = isset($_GET['device_fingerprint']) ? $_GET['device_fingerprint'] : "";
$ip_address = isset($_GET['ip_address']) ? $_GET['ip_address'] : "";

$response = array(); // Initialize response as an array

if (empty($device_fingerprint) || empty($ip_address)) {
    $response = array(
        "success" => false,
        "message" => "IP address or device fingerprint is invalid"
    );
} else {
    $database = new Connection();
    $db = $database->openConnection();
    $sql = "SELECT * FROM participation_records WHERE ip_address = :ip_address OR device_fingerprint = :device_fingerprint";
    $stmt = $db->prepare($sql);
    $stmt->execute(array(':device_fingerprint' => $device_fingerprint, ':ip_address' => $ip_address));
    if ($stmt->rowCount() > 0) {
        $response = array(
            "success" => false,
            "message" => "This user has Already Participated",
            "participated" => true
        );
    } else {
        $response = array(
            "success" => true,
            "message" => "This user is participating for the first time",
            "participated" => false
        );
    }
}

// Set header before sending output
header('Content-Type: application/json');
echo json_encode($response);
