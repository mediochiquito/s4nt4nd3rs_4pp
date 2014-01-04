<?
include dirname(__FILE__) . '/_init.php';
	
	$rs_ofertas = mysql_query('SELECT * FROM ofertas ORDER BY ofertas_id ASC');
	echo '<ofertas><![CDATA[';
	$rows_ofertas = array();
	while($row_ofertas =  mysql_fetch_assoc($rs_ofertas)){
		 $rows_ofertas[] = $row_ofertas;
	}
	echo json_encode($rows_ofertas);
	echo ']]></ofertas>';


	$rs_eventos = mysql_query('SELECT * FROM eventos ORDER BY eventos_id WHERE eventos_estado=1 ASC');
	echo '<eventos><![CDATA[';
	$rows_eventos = array();
	while($row_eventos =  mysql_fetch_assoc($rs_eventos)){
		 $rows_eventos[] = $row_eventos;
	}
	echo json_encode($rows_eventos);
	echo ']]></eventos>';



?>
