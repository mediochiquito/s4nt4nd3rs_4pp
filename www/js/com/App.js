function App(){

	var self = this

	this.main = document.createElement('div');
	this.main.id = 'app'
	this.ancho = 320;
	this.alto = 640
	this.secciones = null;
	this.lightbox = null;
	this.obj_usuario;
	this.db = openDatabase('santanders_app_punta', '1.0', 'santanders_app_punta', 2000000);
	this._ManagePush;


	this.initialize = function(){
		
		if ((typeof cordova == 'undefined') && (typeof Cordova == 'undefined')) alert('Cordova variable does not exist. Check that you have included cordova.js correctly');
	    if (typeof CDV == 'undefined') alert('CDV variable does not exist. Check that you have included cdv-plugin-fb-connect.js correctly');
	    if (typeof FB == 'undefined') alert('FB variable does not exist. Check that you have included the Facebook JS SDK file.');
		
		document.addEventListener('deviceready', deviceready, false);

	}
	
	this.alerta = function($str){
		try{
    		navigator.notification.alert($str, function(){}, 'ALERTA')
		}catch(e){
    		alert($str)
    	}
	}
	
	this.is_phonegap =  function (){
		
		try {
		    if(device.platform == ''){}
		    return true;  
		} catch (e) {  
		    return false;  
		}

	}

	this.es_touch = function(){
		  try {  
		    document.createEvent("TouchEvent");  
		    return true;  
		  } catch (e) {  
		    return false;  
		  }  
	}

	this.hay_internet = function() {

     		try{
            	var networkState = navigator.connection.type;
	        }catch(e){
				return true
	        }

            var states = {};
            states[Connection.UNKNOWN]  = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI]     = 'WiFi connection';
            states[Connection.CELL_2G]  = 'Cell 2G connection';
            states[Connection.CELL_3G]  = 'Cell 3G connection';
            states[Connection.CELL_4G]  = 'Cell 4G connection';
            states[Connection.CELL]     = 'Cell generic connection';
            states[Connection.NONE]     = 'No network connection';

            if(networkState == Connection.WIFI ||  networkState == Connection.CELL_3G || networkState == Connection.CELL_4G || networkState == Connection.WIFI){
 				return true;
            }

        return false;
    }

	function onErrorFile(e){
		app.alerta('Error file sistem')
    }
   
    function crearTabla_Usuarios(){
		
		app.db.transaction(function (tx) {
		
			tx.executeSql('CREATE TABLE IF NOT EXISTS usuarios ("usuarios_id" INTEGER PRIMARY KEY AUTOINCREMENT  NOT NULL , "usuarios_nombre" VARCHAR NOT NULL, "usuarios_apellido" VARCHAR NOT NULL, "usuarios_ci" VARCHAR NOT NULL, "usuarios_fecha_nac" VARCHAR NOT NULL, "usuarios_email" VARCHAR NOT NULL, "usuarios_archivo" VARCHAR NOT NULL, "usuarios_lugar" VARCHAR NOT NULL, "usuarios_recibe_info" INTEGER NOT NULL, "usuarios_fecha_hora" DATETIME)', [], function(e){});
		
		}, app.db_errorGeneral);
				
    }


    this.db_errorGeneral = function(tx, err) {
		
		try{
      		alert("Error processing SQL: " + err.message);
		}catch(e){
			alert("Error processing SQL: " + tx.message);

		}

    }

   

	function deviceready(){

    	crearTabla_Usuarios()

    	_ManagePush = new _ManagePush();
    	_ManagePush.register_push();

        self.ancho = window.innerWidth;
		self.alto = window.innerHeight;

		if( self.ancho<320) self.ancho = 320;
		if( self.alto<640) self.alto = 640;

		if(window.innerWidth<320 || window.innerHeight<640){

			$(self.main).css('transform-origin', '0 0');
			$(self.main).transition({scale: [(window.innerWidth/320), (window.innerHeight/640)]}, 0);

		}

		$(self.main).css({width:self.ancho, height:self.alto})

		self.secciones = new Secciones()
		$(self.main).append(self.secciones.main)

       	$(self.main).append('<div id="loading"><div id="txt_loading"></div><div class="spinner"> <div class="bar1"></div><div class="bar2"></div><div class="bar3"></div><div class="bar4"></div><div class="bar5"></div><div class="bar6"></div><div class="bar7"></div><div class="bar8"></div><div class="bar9"></div><div class="bar10"></div><div class="bar11"></div><div class="bar12"></div></div></div>');
		
		self.lightbox = new LightBox()
		$(self.main).append(self.lightbox.main);

        $('body').append(self.main)

        //app.secciones.go(app.secciones.seccioninicio)
	}

	this.cargando = function ($bool, $txt){
		if($bool){
			$('#txt_loading').html($txt);
			$('#loading').show();
		}else{
			$('#loading').hide();
		}

	}

	
	

}
