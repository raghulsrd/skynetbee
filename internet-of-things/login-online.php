<?php
// Database connection parameters
// $servername = "localhost"; // Assuming your MySQL server is on the same machine as Apache
// $dbname = "skybase";
// $username = "root";
// $password = "";
    include("../skynetbee/rne/raghulsfunctions.php");
    include("../skynetbee/pdf-essentials/fpdf/fpdf.php");
    include("../error-reports/class-wp-http-s-bugreports.php");
    global $databbse,$athbtchte;
    $pdo = connectddbase($databbse);
    // $conn = connectddbase($databbse);
    // sqlsi("all_iot_online_logs","deviceid:<-:jndj");
    // global $athbtchte;
    // $pdo = $conn;
    // if($conn)
    //     die("good");
    // else
    //     die("bad ");
try {
//     // Create a PDO instance
//     // $dsn = "mysql:host=$servername;dbname=$dbname";
//     // $options = [
//     //     PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
//     //     PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
//     //     PDO::ATTR_EMULATE_PREPARES   => false,
//     // ];
    // $pdo = new PDO($dsn, $username, $password, $options);

    // Sample data to insert (retrieve from GET parameters)
    $deviceid = $_GET['deviceid'];
    $logtype = $_GET['logtype'];
    $logid = $_GET['logid'];
    $project = $_GET['project'];
    $classname = $_GET['classname'];
    $methodname = $_GET['methodname'];
    $line = $_GET['line'];
    $message = $_GET['message'];
    $area = $_GET['area'];
    $fromdat = $_GET['fromdat'];
    $ftodat = $_GET['ftodat'];
    $ftotim = $_GET['ftotim'];
    $ftovername = $_GET['ftovername'];
    $ftover = $_GET['ftover'];
    $ftopid = $_GET['ftopid'];
    $todat = $_GET['todat'];
    $totim = $_GET['totim'];
    $tover = $_GET['tover'];
    $tovername = $_GET['tovername'];
    $topid = $_GET['topid'];
    $deviceanduserainfo = $_GET['deviceanduserainfo'];
    $ipmac = $_GET['ipmac'];
    $basesite = $_GET['basesite'];
    $owncomcode = $_GET['owncomcode'];
    $testeridentity = $_GET['testeridentity'];
    $testcontrol = $_GET['testcontrol'];
    $adderpid = $_GET['adderpid'];
    $addername = $_GET['addername'];
    $adder = $_GET['adder'];
    $doe = date("Y-m-d");
    $toe = date("H:i:s");

    // SQL statement with placeholders
    $sql = "INSERT INTO all_iot_online_logs (deviceid, logtype, logid, project, classname, methodname, line, message,area,fromdat,ftodat,ftotim,ftovername,ftover,ftopid,todat,totim,tovername,tover,topid,ipmac,deviceanduserainfo,basesite,owncomcode,testeridentity,testcontrol,adderpid,addername,adder,doe,toe) VALUES (:deviceid, :logtype, :logid, :project, :classname, :methodname, :line, :message, :area, :fromdat, :ftodat, :ftotim, :ftovername, :ftover, :ftopid, :todat, :totim, :tovername, :tover, :topid, :ipmac, :deviceanduserainfo, :basesite, :owncomcode, :testeridentity, :testcontrol, :adderpid, :addername, :adder, :doe, :toe)";
    // $sql = "INSERT INTO all_iot_online_logs (deviceid, logtype, logid, project, classname, methodname, line, message,area,fromdat,ftodat,ftotim,ftovername,ftover,ftopid,todat,totim,tovername,tover,topid,ipmac,deviceanduserainfo,basesite,owncomcode,testeridentity,testcontrol,adderpid,addername,adder,doe,toe) VALUES ($deviceid,$logtype,$logid, $project,$classname,$methodname,$line,$message,$area, $fromdat, $ftodat, $ftotim, $ftovername, $ftover, $ftopid, $todat, $totim, $tovername, $tover, $topid, $ipmac, $deviceanduserainfo, $basesite, $owncomcode, $testeridentity, $testcontrol, $adderpid, $addername, $adder, $doe, $toe)";
    // Prepare the SQL statement
    $stmt = $pdo->prepare($sql);
    // Bind values to the statement
    $stmt->bindParam(':deviceid', $deviceid);
    $stmt->bindParam(':logtype', $logtype);
    $stmt->bindParam(':logid', $logid);
    $stmt->bindParam(':project', $project);
    $stmt->bindParam(':classname', $classname);
    $stmt->bindParam(':methodname', $methodname);
    $stmt->bindParam(':line', $line, PDO::PARAM_INT);
    $stmt->bindParam(':message', $message);
    $stmt->bindParam(':area', $area);
    $stmt->bindParam(':fromdat', $fromdat);
    $stmt->bindParam(':ftodat', $ftodat);
    $stmt->bindParam(':ftotim', $ftotim);
    $stmt->bindParam(':ftovername', $ftovername);
    $stmt->bindParam(':ftover', $ftover);
    $stmt->bindParam(':ftopid', $ftopid);
    $stmt->bindParam(':todat', $todat);
    $stmt->bindParam(':totim', $totim);
    $stmt->bindParam(':tover', $tover);
    $stmt->bindParam(':tovername', $tovername);
    $stmt->bindParam(':topid', $topid);
    $stmt->bindParam(':ipmac', $ipmac);
    $stmt->bindParam(':deviceanduserainfo', $deviceanduserainfo);
    $stmt->bindParam(':basesite', $basesite);
    $stmt->bindParam(':owncomcode', $owncomcode);
    $stmt->bindParam(':testeridentity', $testeridentity);
    $stmt->bindParam(':testcontrol', $testcontrol);
    $stmt->bindParam(':adderpid', $adderpid);
    $stmt->bindParam(':addername', $addername);
    $stmt->bindParam(':adder', $adder);
    $stmt->bindParam(':doe', $doe);
    $stmt->bindParam(':toe', $toe);
  
    // Execute the statement
    $scounti = $stmt->execute();
    $counti = $pdo->lastInsertId();
    // echo "Data inserted successfully!";
    echo $counti;
} 
catch (PDOException $e) {
    echo "Error";//: " . $e->getMessage();
}

// Close the PDO instance
$pdo = null;
?>
