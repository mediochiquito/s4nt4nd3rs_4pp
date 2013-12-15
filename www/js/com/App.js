function App(){
	//
	this.main = document.createElement('div');
	this.main.id = 'app'
	this.ancho = 320;
	this.alto = 640
	this.secciones = null;
	this.lightbox = null;
	this.obj_usuario;
	this.server = 'http://192.168.0.2/s4nt4nd3rs_4pp/server/'
	this.db = openDatabase('santanders_app_punta', '1.0', 'santanders_app_punta', 2000000);
	this._ManagePush;

	var self = this
	var tablas_creadas = 0
	var xml_default_db;
	var primera_vez_que_instala = false;
	var array_tablas_a_crear;
	var sync_value = 0;
	var new_sync_value = 0
	var btn_connect;
	this.initialize = function(){
		document.addEventListener('deviceready', deviceready, false);
		$(document).bind('touchmove', doPrevent);

	}

	function doPrevent(event) {
		event.preventDefault();
	}

	this.alerta = function($str){
		try{
    		navigator.notification.alert($str, function(){}, 'ALERTA')
		}catch(e){
    		alert($str)
    	}
	}
	
	this.is_phonegap =  function (){

		//alert('device.platform: ' +  device.platform)
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

			}catch(e){


				return true
	        }
     
    }

	
	function deviceready(){
		
		if(app.is_phonegap()){
			if ((typeof cordova == 'undefined') && (typeof Cordova == 'undefined')) alert('Cordova variable does not exist. Check that you have included cordova.js correctly');
			if (typeof CDV == 'undefined') alert('CDV variable does not exist. Check that you have included cdv-plugin-fb-connect.js correctly');
			if (typeof FB == 'undefined') alert('FB variable does not exist. Check that you have included the Facebook JS SDK file.');
			
	    	self._ManagePush = new ManagePush();
	    	self._ManagePush.registrar();
   		}

        self.ancho = window.innerWidth;
		self.alto = window.innerHeight;
		
/*
		if( self.ancho<320) self.ancho = 320;
		if( self.alto<640) self.alto = 640;

		if(window.innerWidth<320 || window.innerHeight<640){

			$(self.main).css('transform-origin', '0 0');
			$(self.main).transition({scale: [(window.innerWidth/320), (window.innerHeight/640)]}, 0);

		}*/

		$(self.main).css({width:self.ancho, height:self.alto})

		self.secciones = new Secciones()
		$(self.main).append(self.secciones.main)

		btn_connect = new Boton('fb connect', doConnect)
		btn_connect.main.id = 'fpo_fb_connect'
		$(self.main).append(btn_connect.main)

       	$(self.main).append('<div id="loading"><div id="txt_loading"></div><div class="spinner"> <div class="bar1"></div><div class="bar2"></div><div class="bar3"></div><div class="bar4"></div><div class="bar5"></div><div class="bar6"></div><div class="bar7"></div><div class="bar8"></div><div class="bar9"></div><div class="bar10"></div><div class="bar11"></div><div class="bar12"></div></div></div>');
		
		/*self.lightbox = new LightBox()
		$(self.main).append(self.lightbox.main);*/
		$('body').append(self.main)
        
        app.db.transaction(function (tx) {
			crear_db(tx)	

		});
      

	}

	function doConnect(){
	
		 FB.login(function(response) {
		   if (response.authResponse) {
		     console.log('Welcome!  Fetching your information.... ');
		     app.alerta(response.authResponse.userID)
		     FB.api('/me', function(response) {
		       console.log('Good to see you, ' + response.name + '.');
		     });
		   } else {
		     console.log('User cancelled login or did not fully authorize.');
		   }
		 });

	}

	function start(){
		 
		setTimeout(function(){

			if(app.hay_internet())  verfificar_sync();
			app.secciones.go(app.secciones.seccionmapa)


		}, 100)
	}

	function verfificar_sync(){
    	
    		$.ajax({
				type: "GET",
				url: app.server + "sync_value.txt",
				dataType: 'text',
				cache:false, 
				success: function($int) {
					new_sync_value = Number($int);
					if(new_sync_value>Number(sync_value)){

						$.ajax({

							type: "POST",
							url: app.server + "xml.eventos.php",
							dataType: 'xml',
							cache: false, 
							data:{sync_value: sync_value},
							success: function($xml) {
								
								actualizar_db($xml)

							}
						});	
					}
				}
			});
    }

	//C:\Users\Mateo\AppData\Local\Google\Chrome\User Data\Default\databases\http_localhost_0

	function actualizar_db($xml){
		app.db.transaction(function (tx) {
		
			tx.executeSql('UPDATE app SET sync_value='+new_sync_value);
		});
	}

	function crear_db($tx) {
		 
		   $.ajax({
				type: "GET",
				url: "xml/default_db.xml",
				dataType: 'xml',
				async : false,
			}).success(function(xml) {

					xml_default_db = xml
					tablas_creadas = 0
					array_tablas_a_crear = new Array(crearTabla_Eventos,
													 crearTabla_App)
					for(var func in array_tablas_a_crear){
						array_tablas_a_crear[func]($tx)
					}
			});
	}


	function comprobacion_total_tablas_creadas(e){

    	tablas_creadas++

    	if(tablas_creadas == array_tablas_a_crear.length) start()

    }

     function crearTabla_App($tx){

			la_tala_fue_creada($tx, 'app', function($bool){
				
				$tx.executeSql('CREATE TABLE IF NOT EXISTS app ("sync_value" INTEGER)', [], comprobacion_total_tablas_creadas);

				if(!$bool) {
					$tx.executeSql('INSERT INTO app (sync_value) VALUES (?)', [0]);

				} else {

					$tx.executeSql("SELECT sync_value FROM app" , [], function (tx, resultado) {
	    					sync_value = resultado.rows.item(0).sync_value
					})


				} 
			});	
    }

    /* function crearTabla_Ofertas($tx){
		
	  
			$tx.executeSql('CREATE TABLE IF NOT EXISTS ofertas ("ofertas_id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL , ' +
						  '"ofertas_nombre" VARCHAR, ' +
						  '"ofertas_categoria_ofertas_id" INTEGER, ' +
						  '"ofertas_descuento" VARCHAR, ' +
						  '"ofertas_intereses" VARCHAR, ' +
						  '"ofertas_dias" VARCHAR, ' +
						  '"ofertas_locales" TEXT, ' +
						  '"ofertas_observaciones" TEXT, ' +
						  '"usuarios_lon" VARCHAR, ' +
						  '"usuarios_uid" VARCHAR, ' +
						  '"usuarios_fecha_creado" DATETIME)', [], comprobacion_total_tablas_creadas);
		
				
    }*/

    function crearTabla_Eventos($tx){
		
			$tx.executeSql('CREATE TABLE IF NOT EXISTS eventos ("eventos_id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL , ' +
						  '"eventos_nombre" VARCHAR, ' +
						  '"eventos_fecha" DATETIME, ' +
						  '"eventos_categoria_eventos_id" INTEGER, ' +
						  '"eventos_lugar" VARCHAR, ' +
						  '"eventos_desc" VARCHAR, ' +
						  '"eventos_lat" VARCHAR, ' +
						  '"eventos_lon" VARCHAR, ' +
						  '"eventos_uid" VARCHAR, ' +
						  '"eventos_fecha_hora_creado" DATETIME)', [], comprobacion_total_tablas_creadas);
    }


    function la_tala_fue_creada($tx, $table_name, $callback){
    	$tx.executeSql("SELECT name FROM sqlite_master WHERE name='"+$table_name+"'" , [],	
		function (tx, resultado) {
					if(resultado.rows.length==0) $callback(false);
					else $callback(true);
		},  app.db_errorGeneral);
    }

    this.db_errorGeneral = function(tx, err) {
		
		try{
      		alert("Error processing SQL: " + err.message);
		}catch(e){
			alert("Error processing SQL: " + tx.message);

		}

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
