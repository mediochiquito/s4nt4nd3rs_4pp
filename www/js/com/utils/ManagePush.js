function ManagePush(){

	var self = this;
	var pushNotification;
	this.token = '';
	this.plataform = '';



	 this.registrar = function(){

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

	function sendToken(){
		
		$.ajax({

							type: "POST",
							url: app.server + "void.set_push_token.php",
							dataType: 'text',
							cache: false, 
							data:{plataform: self.plataform, token:self.token}
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
	        navigator.notification.alert('id_evento: ' + event.idevento + ' - ' + event.alert);

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
		      	
		  		alert('id_evento: ' + e.payload.idevento + ' - ' + e.payload.message)

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
}