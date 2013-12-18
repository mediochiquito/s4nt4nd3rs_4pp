<?
include dirname(__FILE__) . '/_init.php';
$rs = mysql_query('SELECT sync_value FROM sync LIMIT 1');
$row = mysql_fetch_object($rs);
echo $row->sync_value;
	