<?
include dirname(__FILE__) . '/_init.php';
$id_evento = $_POST['id_evento'];
$rs = mysql_query('SELECT * FROM participaciones WHERE participaciones_eventos_id="' . $id_evento . '" ORDER BY participaciones_id DESC');
<<<<<<< HEAD
        

        $rows = array();
        while($row =  mysql_fetch_assoc($rs)){
                 $rows[] = $row;
        }
        echo json_encode($rows);
=======
	

	$rows = array();
	while($row =  mysql_fetch_assoc($rs)){
		 $rows[] = $row;
	}
	echo json_encode($rows);
>>>>>>> 5f4096a256e72ee7fd24c0eadb1cb06f8aba01c2
?>

