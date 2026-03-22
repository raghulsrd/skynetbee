<?php
// include("../skynet/rne-php/raghuls-neural-engine.php");
// include("../skynet/pdf-essentials/fpdf/fpdf.php");
// include("../error-reports/class-wp-http-s-bugreports.php");
 global $databbse,$athbtchte;
    $pdo = connectddbase($databbse);
   
try {
    // Check if 'status' is set in the POST request
    if (isset($_POST['status'])) {
        // Sanitize the input to avoid malicious data
        $status = filter_input(INPUT_POST, 'status', FILTER_SANITIZE_NUMBER_INT);

        // Check if the sanitized value is 1 or 0
        if ($status === '1' || $status === '0') {
            // Prepare the SQL statement with placeholders
            $stmt = $pdo->prepare("INSERT INTO iot_device_appliance_onoff_status (status) VALUES (:status)");
            
            // Bind the sanitized status value to the placeholder
            $stmt->bindParam(':status', $status, PDO::PARAM_INT);

            // Execute the statement
            $stmt->execute();

            echo "Status value inserted successfully.";
        } else {
            echo "Invalid status value.";
        }
    } else {
        echo "No status provided.";
    }
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}

// Close the PDO instance
$pdo = null;
//echo "hii";
?>