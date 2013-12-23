<?
include dirname(__FILE__) . '/_init.php';
$id_evento = $_POST['id_evento'];
$rs_eventos = mysql_query('SELECT * FROM participaciones WHERE participaciones_eventos_id="' . $id_evento . '" ORDER BY participaciones_id DESC');
	

	$rows_eventos = array();
	while($row_eventos =  mysql_fetch_assoc($rs_eventos)){
		 $rows_eventos[] = $row_eventos;
	}
	echo 
?>
