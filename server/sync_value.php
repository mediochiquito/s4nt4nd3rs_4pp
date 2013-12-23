<?
include dirname(__FILE__) . '/_init.php';
$rs = mysql_query('SELECT MAX(eventos_sync_value) as sync_value FROM eventos LIMIT 1');
$row = mysql_fetch_object($rs);
echo strtotime($row->sync_value);
	