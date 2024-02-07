<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
$to = "jabri.oldd@gmail.com";
$subject = "Test Email";
$message = "This is a test email.";
$headers = "From: jabri.ballid@gmail.com";

// Send email
if (mail($to, $subject, $message, $headers)) {
    echo "Email sent successfully.";
} else {
    echo "Email sending failed.";
}
?>