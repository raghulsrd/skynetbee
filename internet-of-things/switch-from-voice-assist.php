<?php
include("rne/raghulsfunctions.php");
// rne_php_log("hi");
include("pdf-essentials/fpdf/fpdf.php");
include("../error-reports/class-wp-http-s-bugreports.php");

$pin = (int)$_POST['pinno'];
$sts = (int)$_POST['sts'];
  global $sql,$dql;
  if($pin>0&&$pin<5)
  {
    dql(1);
    $status=sqls(1,"select devicestatus$pin from iot_skynet_home_automation where todat='0000-00-00'");
    dql(2);
    sqls(2,"update iot_skynet_home_automation set devicestatus$pin='$sts'");
  }
?>