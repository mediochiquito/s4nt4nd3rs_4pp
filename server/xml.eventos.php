<?
include dirname(__FILE__) . '/_init.php';
$sync_value = $_GET['sync_value'];	

echo '<root>';

	$rs_eventos_del = mysql_query('SELECT eventos_id FROM eventos WHERE eventos_estado = -1 AND eventos_sync_value>"' . date('Y-m-d H:i:s', strtotime($sync_value)) . '" ORDER BY eventos_id ASC');
	$rows_eventos_del = array();
	while($row_eventos_del =  mysql_fetch_object($rs_eventos_del)){
		array_push($rows_eventos_del, $row_eventos_del->eventos_id);
	}
	echo '<del><![CDATA[' . implode(',' , $rows_eventos_del) . ']]></del>';




	echo '<eventos><![CDATA[';
	$rs_eventos = mysql_query('SELECT * FROM eventos WHERE eventos_estado = 1 AND eventos_sync_value>"' . date('Y-m-d H:i:s', strtotime($sync_value)) . '" ORDER BY eventos_id ASC');
	$rows_eventos = array();
	while($row_eventos =  mysql_fetch_assoc($rs_eventos)){
		 $rows_eventos[] = $row_eventos;
	}
	echo json_encode($rows_eventos);
	echo ']]></eventos>';
echo '</root>';




?>
