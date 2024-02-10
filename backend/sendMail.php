<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

$mail = new PHPMailer(true);
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    $code = $_POST['code'];
    $lang = $_POST['lang'];
    $msg = "";
    if ($lang === "fr") {
        $msg = "Profitez de votre code promo !";
    } else if ($lang === "deu") {
        $msg = "Geniet van uw vouchercode!";
    }
    if (isset($email)) {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $response = ['error' => true, 'message' => 'Invalid email address'];
            echo json_encode($response);
            exit();
        }
        try {
            //Server settings
            $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
            $mail->isSMTP();                                            //Send using SMTP
            $mail->Host       = 'smtp.yesy.com';                     //Set the SMTP server to send through
            $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
            $mail->Username   = 'email';                     //SMTP username
            $mail->Password   = 'password';                               //SMTP password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
            $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

            //Recipients
            $mail->setFrom('email', 'Becharge Mailer');
            $mail->addAddress($email, explode('@', $email)[0]);     //Add a recipient
            $mail->addReplyTo('info@example.com', 'Information');

            //Content
            $mail->isHTML(true);                                  //Set email format to HTML
            $mail->Subject = 'Here is the subject';
            $mail->Body    = "$msg  <b>$code</b>";
            $mail->AltBody = "$msg  $code";

            $mail->send();
            http_response_code(200);
            $response = ['success' => true, 'message' => 'Message has been sent!'];
            echo json_encode($response);
            exit();
        } catch (Exception $e) {
            http_response_code(400);
            $response = ['error' => true, 'message' => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"];
            echo json_encode($response);
            exit();
        }
    } else {
        http_response_code(400);
        $response = ['error' => true, 'message' => 'Invalid email address'];
        echo json_encode($response);
        exit();
    }
} else {
    echo ':)';
    exit();
}
