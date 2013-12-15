<?
include dirname(__FILE__) . '/_init.php';
mysql_query("INSERT IGNORE INTO push SET push_token='".$_POST['token']."',  
										 push_platform='".$_POST['plataform']."', 
										 push_fecha_hora_creado=NOW();");
die('1')
