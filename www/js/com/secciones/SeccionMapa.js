function SeccionMapa()
{
	
	this.main.id = 'SeccionMapa';
	this.ocultar(0);
	
	var holder_blanco_secciones = document.createElement('div')
	holder_blanco_secciones.className = 'holder_blanco_secciones'
	$(this.main).append(holder_blanco_secciones)
	$(holder_blanco_secciones).css({	width: app.ancho-20, height: app.alto-60})


	var holdermap_canvas = document.createElement('div')
	holdermap_canvas.id = 'SeccionMapa_holdermap_canvas'
	$(holder_blanco_secciones).append(holdermap_canvas)

	var map_canvas = document.createElement('div')
	map_canvas.id = 'SeccionMapa_map_canvas'
	$(holdermap_canvas).append(map_canvas)

	$(holdermap_canvas).css({	width: app.ancho-20, height: app.alto-140})

	/*var esquina_si = new Image()
	esquina_si.src = 'img/mapa/esquina_si.png';
	esquina_si.id = 'SeccionMapa_esquina_si';
	$(this.main).append(esquina_si);*/


	var array_markers_eventos;
	var array_markers_ofertas;
	var map;

	setTimeout(_construct, 0);
	$(document).bind('LISTAR_EVENTOS', do_LISTAR_EVENTOS);

	function _construct() {
		
		  var mapOptions = {
		    zoom: 14,
		    mapTypeControl: false,
		    zoomControl: true,
		    zoomControlOptions: {
		        style: google.maps.ZoomControlStyle.LARGE,
		        position: google.maps.ControlPosition.LEFT_CENTER
		    },
		     streetViewControl: false
		  };
		 
		  map = new google.maps.Map(map_canvas,  mapOptions);
		  var pos = new google.maps.LatLng(-34.965311,-54.94985);
		  map.setCenter(pos);

		 
		  //  setTimeout(function() {
		    //  google.maps.event.trigger(map,'resize');
		  // }, 200);
		
/*

		  if(navigator.geolocation) {

		        navigator.geolocation.getCurrentPosition(function(position) {
		        	 alert(position.coords.latitude)
			        var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

				    
			      map.setCenter(pos);

			    }, function() {
			      handleNoGeolocation(true);
			    }{
                        enableHighAccuracy: true
                        ,timeout : 5000
                    });

		  } else {
		    // Browser doesn't support Geolocation
		    handleNoGeolocation(false);
		  }*/
	}
	/*this.setMarcadores = function(xml){
			
		arr_marcadores = new Array();
			
		
		}
	}
	*/

	this._set = function (obj){
		//alert(obj.solo_ver)
	}

	function do_LISTAR_EVENTOS(e){

		array_markers_eventos = new Array();
		array_markers_ofertas = new Array();

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



	function mostrar_una_oferta($row){
		
	}

	function mostrar_un_evento($row){
		
	}

	function handleNoGeolocation(errorFlag) {
		  
		  if (errorFlag) {
		    var content = 'Error: The Geolocation service failed.';
		  } else {
		    var content = 'Error: Your browser doesn\'t support geolocation.';
		  }
		  alert(content)
		  //defaul centro de punta -34.965311,-54.94985
		  var options = {
		    map: map,
		    position: new google.maps.LatLng(-34.965311, -54.94985),
		    content: content
		  };

		  var infowindow = new google.maps.InfoWindow(options);
		  map.setCenter(options.position);
	}


}

SeccionMapa.prototype = new Base_Seccion();