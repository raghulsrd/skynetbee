<?php
    include("../skynetbee/rne/raghulsfunctions.php");
    include("../skynetbee/pdf-essentials/fpdf/fpdf.php");
    include("../error-reports/class-wp-http-s-bugreports.php");
    global $databbse,$athbtchte;
    $pdo = connectddbase($databbse);
   
try {
    $deviceid = $_GET['deviceid'];
    // SQL statement with placeholders
    $sql = "select device,status from iot_device_appliance_onoff_status where todat='0000-00-00' and device='$deviceid' order by pin";
    // Prepare the SQL statement
    $stmt = $pdo->prepare($sql);
    // Execute the query
    $stmt->execute();
    $gettrim_status="";
    // Check if there are results
            if ($stmt->rowCount() > 0) 
            {
                $get_status="";
                // Fetch and echo data from each row
                while ($row = $stmt->fetch()) 
                {
                    $getstatus.= $row["status"] . "[s~1]";
                }
            } 
            else 
            {
                $getstatus.="No records found";
            }
            $gettrim_status=rtrim($getstatus,"[s~1]");
            echo $gettrim_status;
  
} 
catch (PDOException $e) {
    echo "Error";//: " . $e->getMessage();
}

// Close the PDO instance
$pdo = null;
?>
