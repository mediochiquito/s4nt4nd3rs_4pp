function App(){
	//
	this.main = document.createElement('div');
	this.main.id = 'app'
	this.ancho = 320;
	this.alto = 640
	this.secciones = null;
	this.lightbox = null;
	this.header = null;
	this.usuario = {
		uid:'1234567890',
		access_token:''
	};
	this.redirigiendo_una_push = false;
	this.cargo_mapa = false;
	this.server = 'http://192.168.2.2/s4nt4nd3rs_4pp/server/'
	//this.server = 'http://192.168.235.140:8888/s4nt4nd3rs_4pp/server/';
	//this.server = 'http://santander.crudo.com.uy/';
	
	this.db = openDatabase('santanders_app_punta', '1.0', 'santanders_app_punta', 2000000);
	this._ManagePush;
	this._Facebook;
	var self = this;
	var tablas_creadas = 0;
	var xml_default_db;
	var primera_vez_que_instala = false;
	var array_tablas_a_crear;
	var sync_value = 0;
	var new_sync_value = 0;
	var btn_connect;

	this.categorias_eventos = new Array("Deportes","Moda", "Música", "Culturales", "Gastronómico");


	this.initialize = function(){

		document.addEventListener('deviceready', deviceready, false);
		$(document).bind('touchmove', doPrevent);

	}

	this.get_xml_default_db = function (){

		return xml_default_db
	}

	function doPrevent(event) {
		//event.preventDefault();
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
	          

	            if(networkState == Connection.NONE ){
	 				return false;
	            }else{
	            	return true;
	            }

			}catch(e){


				return true
	        }
     
    }

	
	function deviceready(){


	
		try{
					//	navigator.device.overrideBackButton();
				}catch(e){}
		if(app.is_phonegap()){

			if ((typeof cordova == 'undefined') && (typeof Cordova == 'undefined')) alert('Cordova variable does not exist. Check that you have included cordova.js correctly');
			if (typeof CDV == 'undefined') alert('CDV variable does not exist. Check that you have included cdv-plugin-fb-connect.js correctly');
			if (typeof FB == 'undefined') alert('FB variable does not exist. Check that you have included the Facebook JS SDK file.');
			  
            FB.Event.subscribe('auth.login', function(response) {
                               //alert('auth.login event');
                               });
            
            FB.Event.subscribe('auth.logout', function(response) {
                             //  alert('auth.logout event');
                               });
            
            FB.Event.subscribe('auth.sessionChange', function(response) {
                              // alert('auth.sessionChange event');
                               });
            
            FB.Event.subscribe('auth.statusChange', function(response) {
                             //  alert('auth.statusChange event');
                               });
            
	    	self._ManagePush = new ManagePush();

	    	

	    	self._Facebook = new Facebook()
	    	self._Facebook.init() 


		    if ( device.platform == 'android' || device.platform == 'Android' ) { }
			else {
			   StatusBar.hide();
			}


			
   		}
   		
        self.ancho = window.innerWidth;
		self.alto = window.innerHeight;
		if(self.alto<480)self.alto = 480;
		/*
		if( self.ancho<320) self.ancho = 320;
		if( self.alto<640) self.alto = 640;
		*/
		/*if(window.innerWidth<640){

			$(self.main).css('transform-origin', '0 0');
			$(self.main).transition({scale: [(window.innerWidth/640)]}, 0);

		}
*/
		$(self.main).css({width:self.ancho, height:self.alto})

		self.secciones = new Secciones()
		$(self.main).append(self.secciones.main)
		
		self.header =  new Header();
		$(self.main).append(self.header.main)

		/*var fpo_320 = document.createElement('div')
		fpo_320.id= 'fpo_320'
		$(self.main).append(fpo_320)*/
		

       	$(self.main).append('<div id="loading"><div id="txt_loading"></div><div class="spinner"><div class="bar1"></div><div class="bar2"></div><div class="bar3"></div><div class="bar4"></div><div class="bar5"></div><div class="bar6"></div><div class="bar7"></div><div class="bar8"></div><div class="bar9"></div><div class="bar10"></div><div class="bar11"></div><div class="bar12"></div></div></div>');
		

		$('body').append(self.main)
        
        app.db.transaction(function (tx) {
			crear_db(tx)	
		});
      

	}




	function start(){
		 
		setTimeout(function(){
			
			if(app.secciones.get_obj_seccion_actual()==null)
				app.secciones.go(app.secciones.seccionhome);


			if(app.is_phonegap()){
		    	app.db.transaction(function (tx) {
					tx.executeSql("SELECT push FROM app" , [], function (tx, resultado) {
		    				
		    				if(String(resultado.rows.item(0).push) == '0' || String(resultado.rows.item(0).push) == '1' ) 
		    						self._ManagePush.registrar();
		    					
					})
				});
	    	}



			if(app.hay_internet()) setTimeout(verfificar_sync, 2000);
			else $(document).trigger('LISTAR_EVENTOS');

		}, 100);

	}


	function verfificar_sync(){
    		
    		$.ajax({
				type: "GET",
				url: app.server + "sync_value.php",
				dataType: 'text',
				cache:false, 
				success: function($int) {
					new_sync_value = Number($int);
					
					if(new_sync_value>Number(sync_value)){
						
						app.cargando(true, 'Sincronizando eventos...')
						$.ajax({

							type: "GET",
							url: app.server + "xml.eventos.php",
							dataType: 'xml',
							cache: false, 
							data:{sync_value: sync_value},

							success: function($xml) {
								
								app.cargando(false);
								actualizar_db($xml);
							},
							error: function(){ 
								$(document).trigger('LISTAR_EVENTOS'); 
								app.cargando(false)
								
							}
						});	
					}else{
						
						$(document).trigger('LISTAR_EVENTOS');
					}
				},
				error: function() {
					$(document).trigger('LISTAR_EVENTOS');

					 }
			});

    }

	//C:\Users\Mateo\AppData\Local\Google\Chrome\User Data\Default\databases\http_localhost_0
	function actualizar_db($xml){
	
		var obj = $.parseJSON($($xml).find('eventos').text())
		app.db.transaction(function (tx) {

			for(var item_evento in obj){
					tx.executeSql('INSERT OR IGNORE INTO "eventos" ("eventos_id","eventos_nombre","eventos_fecha_hora","eventos_categoria_id","eventos_lugar","eventos_desc","eventos_lat","eventos_lon","eventos_uid","eventos_tags","eventos_estado","eventos_header_img","eventos_fecha_hora_creado") VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', 
													  [
													  obj[item_evento].eventos_id, 
													  obj[item_evento].eventos_nombre, 
													  obj[item_evento].eventos_fecha_hora, 
													  obj[item_evento].eventos_categoria_id, 
													  obj[item_evento].eventos_lugar, 
													  obj[item_evento].eventos_desc, 
													  obj[item_evento].eventos_lat, 
													  obj[item_evento].eventos_lon, 
													  obj[item_evento].eventos_uid, 
													  obj[item_evento].eventos_tags, 
													  obj[item_evento].eventos_estado, 
													  obj[item_evento].eventos_header_img, 
													  obj[item_evento].eventos_fecha_hora_creado


													  ]);

			}
			
		},  app.db_errorGeneral);

		app.db.transaction(function (tx) {
			
			for(var item_evento in obj){
					tx.executeSql('UPDATE "eventos" SET "eventos_nombre"=?,"eventos_fecha_hora"=?,"eventos_categoria_id"=?,"eventos_lugar"=?,"eventos_desc"=?,"eventos_lat"=?,"eventos_lon"=?,"eventos_uid"=?,"eventos_tags"=?,"eventos_estado"=?,"eventos_header_img"=?, "eventos_fecha_hora_creado"=? WHERE "eventos_id"=?', 
														  [
														
														  obj[item_evento].eventos_nombre, 
														  obj[item_evento].eventos_fecha_hora, 
														  obj[item_evento].eventos_categoria_id, 
														  obj[item_evento].eventos_lugar, 
														  obj[item_evento].eventos_desc, 
														  obj[item_evento].eventos_lat, 
														  obj[item_evento].eventos_lon, 
														  obj[item_evento].eventos_uid, 
														  obj[item_evento].eventos_tags, 
														  obj[item_evento].eventos_estado, 
														  obj[item_evento].eventos_header_img, 
														  obj[item_evento].eventos_fecha_hora_creado,
														  obj[item_evento].eventos_id
														  ]);


				

			}

			tx.executeSql('UPDATE app SET sync_value=?', [new_sync_value]);
			$(document).trigger('LISTAR_EVENTOS');

		},  app.db_errorGeneral);

		

	}


	function crear_db($tx) {
		 
		   $.ajax({
				type: "GET",
				url: "xml/default_db.xml",
				dataType: 'xml',
				async : false,
			}).success(function(xml) {

					xml_default_db = xml;
					tablas_creadas = 0;
					//crearTabla_Categorias, 
					array_tablas_a_crear = new Array(crearTabla_Eventos,
													 crearTabla_Participaciones,
													 crearTabla_Ofertas, 
													 crearTabla_App);

					for(var func in array_tablas_a_crear){
						array_tablas_a_crear[func]($tx);
					}
			});
	}



	function comprobacion_total_tablas_creadas(e){

    	tablas_creadas++;
    	if(tablas_creadas == array_tablas_a_crear.length) start();

    }



    function crearTabla_App($tx){

			la_tala_fue_creada($tx, 'app', function($bool){
				
				$tx.executeSql('CREATE TABLE IF NOT EXISTS app ("sync_value" INTEGER, "push" INTEGER)', [], comprobacion_total_tablas_creadas);

				if(!$bool) {
					$tx.executeSql('INSERT INTO app (sync_value, push) VALUES (?,?)', [0,0]);

				} else {

					$tx.executeSql("SELECT sync_value FROM app" , [], function (tx, resultado) {
	    					sync_value = resultado.rows.item(0).sync_value
					})


				} 
			});	
    }

    
    function crearTabla_Eventos($tx){
			//$tx.executeSql('DROP TABLE IF EXISTS eventos');
			$tx.executeSql('CREATE TABLE IF NOT EXISTS eventos ("eventos_id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL , ' +
						  '"eventos_nombre" VARCHAR, ' +
						  '"eventos_fecha_hora" DATETIME, ' +
						  '"eventos_categoria_id" INTEGER, ' +
						  '"eventos_lugar" VARCHAR, ' +
						  '"eventos_desc" VARCHAR, ' +
						  '"eventos_lat" VARCHAR, ' +
						  '"eventos_lon" VARCHAR, ' +
						  '"eventos_uid" VARCHAR, ' +
						  '"eventos_tags" VARCHAR, ' +
						  '"eventos_estado" INTEGER, ' +
						  '"eventos_header_img" VARCHAR, ' +
						  '"eventos_fecha_hora_creado" DATETIME)', [], comprobacion_total_tablas_creadas);



			var obj = $.parseJSON($(xml_default_db).find('eventos').text())
		
			for(var item_evento in obj){
					

				$tx.executeSql('INSERT OR IGNORE INTO "eventos" ("eventos_id","eventos_nombre","eventos_fecha_hora","eventos_categoria_id","eventos_lugar","eventos_desc","eventos_lat","eventos_lon","eventos_uid","eventos_tags","eventos_estado","eventos_header_img","eventos_fecha_hora_creado") VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', 
													  [
													  obj[item_evento].eventos_id, 
													  obj[item_evento].eventos_nombre, 
													  obj[item_evento].eventos_fecha_hora, 
													  obj[item_evento].eventos_categoria_id, 
													  obj[item_evento].eventos_lugar, 
													  obj[item_evento].eventos_desc, 
													  obj[item_evento].eventos_lat, 
													  obj[item_evento].eventos_lon, 
													  obj[item_evento].eventos_uid, 
													  obj[item_evento].eventos_tags, 
													  obj[item_evento].eventos_estado, 
													  obj[item_evento].eventos_header_img, 
													  obj[item_evento].eventos_fecha_hora_creado


													  ]);

			}
    }


    function crearTabla_Ofertas($tx){
		
			$tx.executeSql('CREATE TABLE IF NOT EXISTS ofertas ("ofertas_id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL , ' +
						  '"ofertas_nombre" VARCHAR, ' +
						  '"ofertas_tel" VARCHAR, ' +
						  '"ofertas_dir" VARCHAR, ' +
						  '"ofertas_descuento" VARCHAR, ' +
						  '"ofertas_cutoas" VARCHAR, ' +
						  '"ofertas_dias" VARCHAR, ' +
						  '"ofertas_desc" TEXT, ' +
						  '"ofertas_lat" VARCHAR, ' +
						  '"ofertas_lon" VARCHAR, ' +
						  '"ofertas_tags" VARCHAR, ' +
						  '"ofertas_tipo" VARCHAR, ' +
						  '"ofertas_header_img" VARCHAR )', [], comprobacion_total_tablas_creadas);


			var obj = $.parseJSON($(xml_default_db).find('ofertas').text())
		
			for(var item_ofeta in obj){
					
					$tx.executeSql('INSERT OR IGNORE INTO "ofertas" ("ofertas_id","ofertas_nombre","ofertas_tel","ofertas_dir","ofertas_descuento","ofertas_cutoas","ofertas_dias","ofertas_desc","ofertas_lat","ofertas_lon","ofertas_tags","ofertas_tipo","ofertas_header_img") VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', 
													  [
													  obj[item_ofeta].ofertas_id, 
													  obj[item_ofeta].ofertas_nombre, 
													  obj[item_ofeta].ofertas_tel, 
													  obj[item_ofeta].ofertas_dir, 
													  obj[item_ofeta].ofertas_descuento, 
													  obj[item_ofeta].ofertas_cutoas, 
													  obj[item_ofeta].ofertas_dias, 
													  obj[item_ofeta].ofertas_desc, 
													  obj[item_ofeta].ofertas_lat, 
													  obj[item_ofeta].ofertas_lon, 
													  obj[item_ofeta].ofertas_tags, 
													  obj[item_ofeta].ofertas_tipo, 
													  obj[item_ofeta].ofertas_header_img
													  ], function(){}, app.db_errorGeneral);

			}

    }
    function crearTabla_Participaciones($tx){
		

			$tx.executeSql('CREATE  TABLE  IF NOT EXISTS "participaciones" ("participaciones_id" INTEGER PRIMARY KEY AUTOINCREMENT  NOT NULL , "participaciones_id_evento" VARCHAR, "participaciones_uid" VARCHAR) ', [], comprobacion_total_tablas_creadas);

		
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
      		app.alerta("Error processing SQL: " + err.message);
		}catch(e){
			app.alerta("Error processing SQL: " + tx.message);

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
