function ManagePush(){

	var self = this;
	var pushNotification;
	this.token = '';
	this.plataform = '';



	 this.registrar = function($callback){

		pushNotification = window.plugins.pushNotification;
	
    	if ( device.platform == 'android' || device.platform == 'Android' )
		{
		    pushNotification.register(
		        successHandler,
		        errorHandler, {
		            "senderID":"888062220460",
		            "ecb":"app._ManagePush.onNotificationGCM"
		        });
		    self.plataform = 'android'
		 
		}
		else
		{
		    pushNotification.register(
		        tokenHandler,
		        errorHandler, {
		            "badge":"true",
		            "sound":"true",
		            "alert":"true",
		            "ecb":"app._ManagePush.onNotificationAPN"
		        });
		       self.plataform = 'ios'
		}
		
	}

	this.unregistrar = function (){
		 try  {
	        pushNotification.unregister(
	        function(e) {
	            //unRegister Success!!!
	            alert('unRegister Success');
	        }, 
	        function(e) {
	            //unRegister Failed!!!
	            alert('unRegister Failed');
	        });
	    }
	    catch(err) {
	        //Handle errors here
	        alert(err.message);
	    }
		
	}


	function sendToken(){
		
		$.ajax({

							type: "POST",
							url: app.server + "void.set_push_token.php",
							dataType: 'text',
							cache: false, 
							data:{plataform: self.plataform, token:self.token},
							success:function(){

								 app.db.transaction(function (tx) {
									 tx.executeSql('UPDATE app SET push=?', [1]);
								 });

							}
						});	
	}

	// result contains any message sent from the plugin call
	function successHandler (result) {
	  
	}
	
	function errorHandler (error) {
	  
	}

	function tokenHandler (result) {
	  
 		self.token = result
		sendToken()
	}
	
	// iOS
	this.onNotificationAPN = function (event) {
	   
	    if ( event.alert )
	    {
	       
	        objeto_recibido(event.idevento)
	    }

	    if ( event.sound )
	    {
	        var snd = new Media(event.sound);
	        snd.play();
	    }

	    if ( event.badge )
	    {
	        pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
	    }
	}

	// Android
	this.onNotificationGCM = function (e) {
	   
	    switch( e.event )
	    {
		    case 'registered':
		        if ( e.regid.length > 0 )
		        {
			          self.token =  e.regid
			          sendToken()
		        }
		    break;

		    case 'message':
		      	
		  		//alert('id_evento: ' + e.payload.idevento + ' - ' + e.payload.message)
		  		objeto_recibido(e.payload.idevento)
		        /*if ( e.foreground )
		        {
		            app.alerta('notificacion en primer plano')
		         
		        }
		        else
		        { 
		            if ( e.coldstart )
		            {
		                app.alerta('COLDSTART NOTIFICATIO')
		            }
		            else
		            {
		                app.alerta('BACKGROUND NOTIFICATIO');
		            }
		        }

		         app.alerta('MESSAGE -> MSG: ' + e.payload.message);
		         app.alerta('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt);*/
		    break;

		    case 'error':
		       app.alerta('ERROR -> MSG:' + e.msg);
		    break;

		    default:
		    	app.alerta('EVENT -> Unknown, an event was received and we do not know what it is');
		     
		 	   break;
		  }

	}


	function objeto_recibido($obj_id_evento){

		if(typeof($obj_id_evento) !='undefined'){

			if($obj_id_evento > 0){

				app.db.transaction(function (tx) {
				
						tx.executeSql("SELECT * FROM eventos WHERE eventos_id='" + $obj_id_evento + "'  AND  eventos_estado=1" , [], 
							function (tx, resultado) {
								
								if(resultado.rows.length == 1)
				    				app.secciones.go(app.secciones.seccioneventosofertas, 300, {solapa:'un_evento', row: resultado.rows.item(0)});
				    		}
				    	);

				});	
			}
		}
	}
}
