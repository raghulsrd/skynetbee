<?php
include("../skynet/rne-php/raghuls-neural-engine.php");
include("../skynet/pdf-essentials/fpdf/fpdf.php");
include("../error-reports/class-wp-http-s-bugreports.php");
  global $sql,$dql;
    dql(1);
    $status=sqls(1,"select devicestatus1,devicestatus2,devicestatus3,devicestatus4 from iot_skynet_home_automation where todat='0000-00-00'");
    dql(2);
    if($status[0]==0)
        sqls(2,"update iot_skynet_home_automation set devicestatus1='1'");
    else
        sqls(2,"update iot_skynet_home_automation set devicestatus1='0'");
    if($status[1]==0)
        sqls(2,"update iot_skynet_home_automation set devicestatus2='1'");
    else
        sqls(2,"update iot_skynet_home_automation set devicestatus2='0'");
    if($status[1]==0)
        sqls(2,"update iot_skynet_home_automation set devicestatus3='1'");
    else
        sqls(2,"update iot_skynet_home_automation set devicestatus3='0'");
    if($status[1]==0)
        sqls(2,"update iot_skynet_home_automation set devicestatus4='1'");
    else
        sqls(2,"update iot_skynet_home_automation set devicestatus4='0'");
?>