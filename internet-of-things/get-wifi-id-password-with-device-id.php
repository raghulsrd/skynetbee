<?php
    include("../skynet/rne-php/raghuls-neural-engine.php");
    include("../skynet/pdf-essentials/fpdf/fpdf.php");
    include("../error-reports/class-wp-http-s-bugreports.php");
try{
    global $athbtchte;
    $athbtchte = connectddbase("kuhg");
    
    dql(1);
    $status = sqls(1,"select devicestatus1,devicestatus2,devicestatus3,devicestatus4 from iot_skynet_home_automation where todat='0000-00-00'");
    echo (int)$status[0].",".(int)$status[1].",".(int)$status[2].",".(int)$status[3];
}
catch(Exception $e)
{
    echo("exception ".$e);
}
?>