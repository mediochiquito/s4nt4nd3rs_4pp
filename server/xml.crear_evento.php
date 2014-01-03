<?
include dirname(__FILE__) . '/_init.php';
$fecha_array = explode('/', $_POST['fecha']);
$array_lat_lon =explode(',', $_POST['lat_lon']);
$rs_eventos = mysql_query("INSERT INTO `eventos` (`eventos_nombre`, `eventos_fecha_hora`, 
												  `eventos_lugar`, `eventos_desc`, `eventos_lat`, `eventos_lon`, 
												  `eventos_uid`, `eventos_tags`, `eventos_fecha_hora_creado`, 
												  `eventos_categoria_id`, `eventos_sync_value`, `eventos_estado` 
												  ) VALUES 
													('".$_POST['titulo']."', '".$fecha_array[2]."-".$fecha_array[1]."-".$fecha_array[0]." ".$_POST['hora']."', 
													 '".$_POST['lugar']."', '".$_POST['desc']."', 
													 '".$array_lat_lon[0]."', '".$array_lat_lon[1]."', 
													 '".$_POST['uid']."', '', NOW(), '".$_POST['id_categoria']."', 
													 '0000-00-00 00:00:00', '0');");
	

if($rs_eventos){
echo '<root>1</root>';

}else{

	echo '<root>0</root>';
}
	

?>
