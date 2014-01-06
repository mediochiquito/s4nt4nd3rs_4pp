function Facebook(){

	var self = this;
	
	this.init = function(){

		FB.init({
			  appId: '381248932009498',
			  nativeInterface: CDV.FB,
			  useCachedDialogs: false
		});

	}


	this.conectar = function($callback){
		
     	/* FB.getLoginStatus(function(response) {
     	
	          	if (response.status == 'connected') {

	             		if ( device.platform == 'android' || device.platform == 'Android' ){
								app.usuario.uid = response.authResponse.userId;
								app.usuario.access_token = response.authResponse.accessToken;
						}else {
							 	app.usuario.uid = response.authResponse.userID;
							 	app.usuario.access_token = response.authResponse.accessToken;
						}
						$callback();

					} else {
						*/
			             FB.login(function(response2) {
					 		  console.log(response2)
							  if (response2.authResponse) {
							    	
							    	if ( device.platform == 'android' || device.platform == 'Android' ){
											app.usuario.uid = response2.authResponse.userId;
											app.usuario.access_token = response2.authResponse.accessToken;
									}else {
										 	app.usuario.uid = response2.authResponse.userID;
										 	app.usuario.access_token = response2.authResponse.accessToken;
									}
							    	$callback();

							   } else {
 
							     alert('User cancelled login or did not fully authorize.');

							   }
						}, {scope: 'publish_stream, email'})
	         	/*	}
         });
*/
		
	}

	
}