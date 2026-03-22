<?php

//header("Location: https://www.skynetbee.com/skynetbee/?fingerprint=sign-in&code=" . $_POST['code']);
//exit; // Always call exit after a header redirect to stop further code execution.
$file = 'sign-in-with-apple-logs.txt';

// Current date and time
$dateTime = date("Y-m-d H:i:s");

// JSON encoded POST data
$stringRepresentation = json_encode($_POST);

// Log format
$logEntry = "--------------------------------------------\n" .
            "$dateTime\n" .
            "$stringRepresentation\n" .
            "--------------------------------------------\n";

// Prepend log to the file
$currentLogs = file_exists($file) ? file_get_contents($file) : '';
file_put_contents($file, $logEntry . $currentLogs);

// Decode the JSON payload from $_POST
$appleData = json_decode($_POST['user'], true);

// Check if name exists and then extract first and last names
if (isset($appleData['name'])) {
    $firstName = $appleData['name']['firstName'];
    $lastName = $appleData['name']['lastName'];
    $fullname = $firstName . ' ' . $lastName;
    header("Location: https://www.skynetbee.com/skynetbee/?fingerprint=sign-in&code=" . $_POST['code'] ."&applename=".$fullname);
} else {
    header("Location: https://www.skynetbee.com/skynetbee/?fingerprint=sign-in&code=" . $_POST['code']);
}

exit;

// Get email if provided
//$email = isset($appleData['email']) ? $appleData['email'] : "";
?>