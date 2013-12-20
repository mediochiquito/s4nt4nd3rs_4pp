<?
include dirname(__FILE__) . '/_init.php';
$rs_ofertas = mysql_query('SELECT * FROM ofertas ORDER BY ofertas_id ASC');
	
	/*<categorias>
		<item></item>
	</categorias>*/
	

	echo '<ofertas><![CDATA[';
	$rows_ofertas = array();
	while($row_ofertas =  mysql_fetch_assoc($rs_ofertas)){
		 $rows_ofertas[] = $row_ofertas;
	}
	echo json_encode($rows_ofertas);
	echo ']]></ofertas>';

?>
