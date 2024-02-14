<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');

require_once('./db_config.php');
$database = new Connection();
$db = $database->openConnection();
$sql = "SELECT voucher_value,winners_count from winners_tracking";
$stmtSelectWinnersCount = $db->prepare($sql);
$stmtSelectWinnersCount->execute();
$result = $stmtSelectWinnersCount->fetchAll();
$response = array(
    "success" => true,
    "message" => $result,
);
echo json_encode($response);
