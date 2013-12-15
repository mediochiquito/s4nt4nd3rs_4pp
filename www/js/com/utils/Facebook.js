function Facebook(){

	var self = this;
	

	 this.conectar = function(){

		
	  }

	function sendToken(){
		alert('sendToken')
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
	        navigator.notification.alert(event.alert);
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
		      
		        if ( e.foreground )
		        {
		            alert('notificacion en primer plano')
		         /*   var my_media = new Media("/android_asset/www/"+e.soundname);
		            my_media.play();*/
		        }
		        else
		        { 
		            if ( e.coldstart )
		            {
		                alert('COLDSTART NOTIFICATIO')
		            }
		            else
		            {
		                alert('BACKGROUND NOTIFICATIO');
		            }
		        }

		         alert('MESSAGE -> MSG: ' + e.payload.message);
		         alert('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt);
		    break;

		    case 'error':
		       alert('ERROR -> MSG:' + e.msg);
		    break;

		    default:
		    	alert('EVENT -> Unknown, an event was received and we do not know what it is');
		     
		 	   break;
		  }

	}
}