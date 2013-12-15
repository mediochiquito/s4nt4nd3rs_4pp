<?php
	session_start();
	session_cache_expire(360);
	ob_start("ob_gzhandler");
	ignore_user_abort ( true );
	error_reporting( E_ALL ^ E_NOTICE);

	if($_SERVER['HTTP_HOST'] == '127.0.0.1' || $_SERVER['HTTP_HOST'] == '192.168.0.2' || $_SERVER['HTTP_HOST'] == 'localhost') 	
	{
		
		
	}else{

		define("DB_HOST", "localhost");
		define("DB_USER", "");
		define("DB_PASS", "vespa");
		define("DB_NAME", "");

		
	}

    
    
//DATE
	if(function_exists("date_default_timezone_set") and function_exists("date_default_timezone_get"))
    	@date_default_timezone_set(@date_default_timezone_get());

//SQL

	$conexion_mysql = mysql_connect( DB_HOST, DB_USER, DB_PASS) or die('Could not connect to mysql server. ' . mysql_error() );
	mysql_select_db(DB_NAME) or die('Could not select database.' . DB_NAME);
	mysql_query("SET NAMES utf8");
	
	
//LOAD DE FUNCIONES
	function libLoader($dir)
    {
        $fp = opendir($dir);
        while(false !== ($file = readdir($fp)))
        {
            if($file != '.' && $file != '..')
            {
                if(is_file($dir.$file) && preg_match('~php$~i', $file))
                    require_once($dir.$file);
                if(is_dir($dir.$file))
                    libLoader($dir.$file.'/');
            }
        }
    }
	
	libLoader(ROOT.'/_lib/_funciones/');

//LOAD DE CLASSES
	set_include_path( dirname(__FILE__) . "/_lib/_clases");
	
	function __autoload($class_name) 
	{
		$include_path = get_include_path();
		$include_path_tokens = explode(':', $include_path);	
		foreach($include_path_tokens as $prefix)
		{

		  $path[0] = $prefix . '/' . $class_name . '.php';
		  $path[1]= $prefix . '/' . $class_name . '.class.php';
		  $path[2]= $prefix . '/' . 'class.' . $class_name . '.php';
		  
		  foreach($path as $thisPath)
		  {	  
			if(file_exists($thisPath))
			{
				  require_once $thisPath;
				  return;
			}
		  }
	   }
	}
	

	

    
if( !function_exists('json_encode') ) {
    function json_encode($data) {
        $json = new Services_JSON();
        return( $json->encode($data) );
    }
}

if (!function_exists('file_get_contents'))
{
    function file_get_contents($filename)
    {

        $fhandle = fopen($filename, "r");
        $fcontents = fread($fhandle, filesize($filename));
        fclose($fhandle);
    }
   
    return $fcontents;
    
}

function stripmagicchuku(&$a)
	{
		if(is_array($a))
		{
			foreach ($a as $key => $value)
			{
				if(is_array($a[$key]))
					stripmagicchuku($a[$key]);
				else
					$a[$key] = trim(stripslashes(html_entity_decode($value, ENT_QUOTES, 'UTF-8')));
			}
		}
		else
		{
			$a = trim(stripslashes(html_entity_decode($a, ENT_QUOTES, 'UTF-8')));
		}
	}
	
if(get_magic_quotes_gpc())
		stripmagicchuku($_POST);


// LOGS
    if(sizeof($_POST) || sizeof($_GET))
    {
        
		$data = "\r\n".date('H:i:s').' - '.$_SERVER['REQUEST_URI'].' - |POST| <$POST$>';

        foreach($_POST as $key => $value)
            $rpl .=' '.$key.'='.$value.' &';
        
        $data = str_replace('<$POST$>', $rpl, $data);        
        
        file_put_contents(dirname(__FILE__).'/_logs/'.date('Y_m_d').'.txt', $data, FILE_APPEND);
        @chmod(dirname(__FILE__).'/_logs/'.date('Y_m_d').'.txt', 0777);
		
        
    }
    

   
	
	
?>