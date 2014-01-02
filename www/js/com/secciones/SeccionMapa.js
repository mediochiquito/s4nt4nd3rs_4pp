function SeccionMapa()
{
	
	this.main.id = 'SeccionMapa';
	this.ocultar(0);
	
	var holder_blanco_secciones = document.createElement('div')
	holder_blanco_secciones.className = 'holder_blanco_secciones'
	$(this.main).append(holder_blanco_secciones)
	$(holder_blanco_secciones).css({	width: app.ancho-20, height: app.alto-60})


		$(this.main).append('<div id="SeccionMapa_txt_filtrar">Filtrar:</div>')
	$(this.main).append('<div id="SeccionMapa_txt_eventos">Eventos</div>')
	$(this.main).append('<div id="SeccionMapa_txt_ofertas">Descuentos:</div>')

	var chk_eventos = new BotonToogle("img/mapa/checkbox.svg", 'eventos' , 30, 60, doCheckEventos)
	chk_eventos.main.id = 'Mapa_chk_eventos'
	$(this.main).append(chk_eventos.main);


	var chk_oferta = new BotonToogle("img/mapa/checkbox.svg", 'eventos' , 30, 60, doCheckOfertas)
	chk_oferta.main.id = 'Mapa_chk_oferta'
	$(this.main).append(chk_oferta.main)

	var holdermap_canvas = document.createElement('div')
	holdermap_canvas.id = 'SeccionMapa_holdermap_canvas'
	$(holder_blanco_secciones).append(holdermap_canvas)

	var map_canvas = document.createElement('div')
	map_canvas.id = 'SeccionMapa_map_canvas'
	$(holdermap_canvas).append(map_canvas)


	$(holdermap_canvas).css({	width: app.ancho-20, height: app.alto-120})


	if (!navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
	
		var esquina_si = new Image()
		esquina_si.src = 'img/mapa/esquina_izq.svg';
		esquina_si.id = 'SeccionMapa_esquina_si';
		$(this.main).append(esquina_si);

		var esquina_der = new Image()
		esquina_der.src = 'img/mapa/esquina_der.svg';
		esquina_der.id = 'SeccionMapa_esquina_der';
		$(this.main).append(esquina_der);
		$(esquina_der).css('left',app.ancho-25);
	}

	var my_marker;

	var array_markers_eventos;
	var array_markers_ofertas;
	var map;
/*
	setTimeout(_construct, 0);*/
	$(document).bind('LISTAR_EVENTOS', do_LISTAR_EVENTOS);

	
	var mostrando_mi_pos = false
	var ultima_pos;
	var  config_gps = {
		minAccuracy : 150,
		highAccuracy : true,
		maximumAge : 3000,
		readTimeout : 5000
		};
	var gps_locator;
	var gps_intervalo;

	var imposible =   document.createElement('div')
	imposible.id = 'SeccionMapa_imposible';
	$(imposible).append('IMPOSIBLE OBTENER SU POSICION GLOBAL');
	$(imposible).hide()
	$(this.main).append(imposible)

	var ya_me_localizo_una_vez = false;
	var cargo_mapa = false;
	function doCheckEventos(){

		mostrar_elementos('eventos', chk_eventos.getSelected())

	}
	function doCheckOfertas(){

		mostrar_elementos('ofertas', chk_oferta.getSelected())
	}

	function onLocation(position){
			
			
	 		ultima_pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	 		
	 		if(mostrando_mi_pos){
				ya_me_localizo_una_vez = true;
				my_marker.setPosition(ultima_pos);
				$(imposible).hide()
			}

	}
	function errorLocation(error) {
		

			if(!ya_me_localizo_una_vez){
					  $(imposible).show();
					  setTimeout(function(){
							$(imposible).hide()
					  }, 3000);
			}
		
	}
	
	if(app.hay_internet() && !cargo_mapa)
		$.getScript("http://maps.google.com/maps/api/js?callback=app.secciones.seccionmapa.googleMapsLoaded&sensor=false", function(){});

	this.googleMapsLoaded = function (){
		cargo_mapa = true;
		_construct()

	}
	function _construct() {
		
			
			
		    if(navigator.geolocation) {


		    		gps_locator = navigator.geolocation.watchPosition(
											onLocation, 
											errorLocation, 
											{
												timeout: 30000
											}
					);




			}
	

		  var mapOptions = {
		    zoom: 15,
		    mapTypeControl: false,
		    zoomControl: true,
		    mapTypeId: google.maps.MapTypeId.ROADMAP,
		    zoomControlOptions: {
		        style: google.maps.ZoomControlStyle.LARGE,
		        position: google.maps.ControlPosition.LEFT_CENTER
		    },

		     streetViewControl: false,
		     styles:[
					    {
					        featureType: "poi",
					        elementType: "labels",
					        stylers: [
					              { visibility: "off" }
					        ]
					    }
					]
		  };
		
		  map = new google.maps.Map(map_canvas,  mapOptions);

		 var pos = new google.maps.LatLng(-34.965311,-54.94985);
		  map.setCenter(pos);

		 my_marker = new google.maps.Marker(
		           				{
								  icon: {url:'img/mapa/mypoint.png', scaledSize: new google.maps.Size(20, 20), size: new google.maps.Size(20, 20)}
								  
								});
		 my_marker.setMap(map);


		 listar_ofertas()



		setTimeout(function() {
		     google.maps.event.trigger(map,'resize');
		 
		   }, 200);
	

		

		

	}
	
	/*this.setMarcadores = function(xml){
			
		arr_marcadores = new Array();
			
		
		}
	}
	*/

	this._set = function (obj){
		
		if(!app.hay_internet()) app.alerta("Debes conectarte a internet para ver el mapa.");

		if(app.hay_internet() && !cargo_mapa)
			$.getScript("http://maps.google.com/maps/api/js?callback=app.secciones.seccionmapa.googleMapsLoaded&sensor=false", function(){});

				try{
				  mostrando_mi_pos = false
					  map.setCenter(new google.maps.LatLng(obj.center[0], obj.center[1]));
					  map.setZoom(16)

				}catch(e){
				
	 				mostrando_mi_pos = true;
	 				try{
							map.setCenter(ultima_pos);
							my_marker.setPosition(ultima_pos);
	 				}catch(e){}
						        	
			
				}



			
			var solo_ver = '';
			try{
				solo_ver = obj.solo_ver;
			}catch(e){}

			
			

		


			switch(solo_ver){

				case 'eventos':
					mostrar_elementos('ofertas', false)
					mostrar_elementos('eventos', true)
					chk_eventos.setSelected(true)
					chk_oferta.setSelected(false)
				break;
				case 'ofertas':
					mostrar_elementos('ofertas', true)
					mostrar_elementos('eventos', false)
					chk_eventos.setSelected(false)
					chk_oferta.setSelected(true)

				break;
			    default:
					mostrar_elementos('ofertas', true)
					mostrar_elementos('eventos', true)
					chk_eventos.setSelected(true)
					chk_oferta.setSelected(true)
				break;


		}




	}

	function mostrar_elementos($que_elmentos, $visiblildad){

		switch($que_elmentos){

				case 'eventos':

						for(var i in array_markers_eventos){
							array_markers_eventos[i].setVisible($visiblildad)
						}
						
						
				break;
				case 'ofertas':

						for(var i in array_markers_ofertas){
							array_markers_ofertas[i].setVisible($visiblildad)
						}
						
				break;
				case 'todo':
					for(var i in array_markers_eventos){
							array_markers_eventos[i].setVisible($visiblildad)
					}
					for(var i in array_markers_ofertas){
							array_markers_ofertas[i].setVisible($visiblildad)
					}
				break;
		}

	}

	function listar_ofertas(){

		array_markers_ofertas = new Array();
		app.db.transaction(function (tx) {
			
			
			tx.executeSql("SELECT * FROM ofertas" , [], function (tx, resulato_ofertas) {
		    	
		    	var cant_ofertas = resulato_ofertas.rows.length;
		        for(var i=0; i<cant_ofertas; i++){
				
		           array_markers_ofertas[i] = new google.maps.Marker(
		           				{
								  position: new google.maps.LatLng(resulato_ofertas.rows.item(i).ofertas_lat, resulato_ofertas.rows.item(i).ofertas_lon),
								  title:resulato_ofertas.rows.item(i).ofertas_nombre,

								  icon: {url:'img/markers/oferta.png', scaledSize: new google.maps.Size(19, 30), size: new google.maps.Size(19, 30)},
								  row: resulato_ofertas.rows.item(i)
								});

					array_markers_ofertas[i].setMap(map);

					google.maps.event.addListener(array_markers_ofertas[i], 'click', function() {
					   	mostrar_una_oferta(this.row)
					});
		        }
		    });


		});

	}
	function do_LISTAR_EVENTOS(e){


		array_markers_eventos = new Array();
		

		app.db.transaction(function (tx) {
			//TODO agregar el estado
			tx.executeSql("SELECT * FROM eventos WHERE eventos_estado=1" , [], function (tx, resultado) {
		    	
		    	var cant_eventos = resultado.rows.length;
		        for(var i=0; i<cant_eventos; i++){
	
		           array_markers_eventos[i] = new google.maps.Marker(
		           				{
								  position: new google.maps.LatLng(resultado.rows.item(i).eventos_lat,resultado.rows.item(i).eventos_lon),
								  title:resultado.rows.item(i).eventos_nombre,
								  icon: {url:'img/markers/evento.png', scaledSize: new google.maps.Size(19, 30), size: new google.maps.Size(19, 30)},
								  row: resultado.rows.item(i)
								});

					array_markers_eventos[i].setMap(map);

					google.maps.event.addListener(array_markers_eventos[i], 'click', function() {
					   	mostrar_un_evento(this.row)
					});
		        }
		    });

		});

	}

	function mostrar_una_oferta($row){
	
		app.secciones.go(app.secciones.seccioneventosofertas, 300, {solapa:'una_oferta', row: $row})

	}

	function mostrar_un_evento($row){
		app.secciones.go(app.secciones.seccioneventosofertas, 300, {solapa:'un_evento', row: $row})
	}

	

}

SeccionMapa.prototype = new Base_Seccion();