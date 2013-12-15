<?
class Push{

	//ANDROID
	var $apiKey = "AIzaSyDllM585-vFe4q8L-cI4-wntJ_jrcZvHHM";

	
	// IOS
	var $apns;
	var $apns_url = 'gateway.push.apple.com';
	var $apns_cert = 'apns-dev.pem';
	var $apns_port = 2195;
	var $stream_context;
	
	
	
	function __construct(){
		
		/*$this->stream_context = stream_context_create();
		stream_context_set_option($this->stream_context, 'ssl', 'local_cert', $this->apns_cert);
		$this->apns = stream_socket_client('ssl://' . $this->apns_url . ':' . $this->apns_port, $error, $error_string, 2, STREAM_CLIENT_CONNECT, $this->stream_context);*/
		
	}
	
	
	public function enviar_push_ios($token, $titulo, $mensaje){
		
		$payload = array();
		$payload['aps'] = array('alert' => $mensaje, 'badge' => intval(0), 'sound' => 'default');
		$payload = json_encode($payload);

		$apns_message = chr(0) . chr(0) . chr(32) . pack('H*', str_replace(' ', '', $token)) . chr(0) . chr(strlen($payload)) . $payload;
		fwrite($this->apns, $apns_message);

	}
	
	
	public function enviar_push_android($token, $titulo, $mensaje){   
	
	
			$headers = array("Content-Type:" . "application/json", "Authorization:" . "key=" . $this->apiKey);
			$data = array(
				'data' => array('message' => $mensaje, 'title' => $titulo),
				'registration_ids' => array($token)
			);
		 
			$ch = curl_init();
		 
			curl_setopt( $ch, CURLOPT_HTTPHEADER, $headers ); 
			curl_setopt( $ch, CURLOPT_URL, "https://android.googleapis.com/gcm/send" );
			curl_setopt( $ch, CURLOPT_SSL_VERIFYHOST, 0 );
			curl_setopt( $ch, CURLOPT_SSL_VERIFYPEER, 0 );
			curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
			curl_setopt( $ch, CURLOPT_POSTFIELDS, json_encode($data) );
		 
			$response = curl_exec($ch);
			curl_close($ch);
		 
			return $response;

		}
	
	
	
	public function _close(){
		
		@socket_close($this->apns);
		@fclose($this->apns);
		
	}
	
	
}


$p = new Push();
$p->enviar_push_android('APA91bE5RcCsiKgVF0aM2_yGkE9owZhsIsc9Kny2uH1ULrIPfz4M368bwRDBdU_WWQoPvjs5As1caqwS95PNGQ-QgzsRXIatcAH3_H-Q4VjoEDuGHNig2EWEmEyBypAW4DHEwAvFW0B-ZbnKWIdWQqO108twyWaDAw', 'titulo titulo', 'caca caca caca');