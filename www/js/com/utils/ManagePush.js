function ManagePush(){

	var self = this;
	var pushNotification;
	this.token = '';
	this.plataform = '';

	this.register_push = function(){
		alert('register_push1')
    	pushNotification = window.plugins.pushNotification;
		alert('register_push2')
    	if ( device.platform == 'android' || device.platform == 'Android' )
		{
		    pushNotification.register(
		        successHandler,
		        errorHandler, {
		            "senderID":"888062220460",
		            "ecb":"onNotificationGCM"
		        });
		    self.plataform = 'android'
		    alert('register_push3')
		}
		else
		{
		    pushNotification.register(
		        tokenHandler,
		        errorHandler, {
		            "badge":"true",
		            "sound":"true",
		            "alert":"true",
		            "ecb":"onNotificationAPN"
		        });
		       self.plataform = 'ios'
		}
		}

	}
	function (){

		sendToken()
	}

	// result contains any message sent from the plugin call
	function successHandler (result) {
	    alert('result = ' + result);
	}
	// result contains any error description text returned from the plugin call
	function errorHandler (error) {
	    alert('error = ' + error);
	}
	function tokenHandler (result) {
	    // Your iOS push server needs to know the token before it can push to this device
	    // here is where you might want to send it the token for later use.
	    alert('device token = ' + result);

	      self.token = result
		  sendToken()
	}
	
	// iOS
	function onNotificationAPN (event) {
	   
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
	function onNotificationGCM(e) {
	   
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
		            var my_media = new Media("/android_asset/www/"+e.soundname);
		            my_media.play();
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