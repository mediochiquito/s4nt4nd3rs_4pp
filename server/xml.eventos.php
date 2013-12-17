<?
include dirname(__FILE__) . '/_init.php';
$sync_value = $_GET['sync_value'];
$rs_eventos = mysql_query('SELECT * FROM eventos WHERE eventos_sync_value>' . $sync_value . ' ORDER BY eventos_id ASC');
	
	/*<categorias>
		<item></item>
	</categorias>*/
	
echo '<root>';
	echo '<eventos><![CDATA[';
	$rows_eventos = array();
	while($row_eventos =  mysql_fetch_assoc($rs_eventos)){
		 $rows_eventos[] = $row_eventos;
	}
	echo json_encode($rows_eventos);
	echo ']]></eventos>';
echo '</root>';
?>
