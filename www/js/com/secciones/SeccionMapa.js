function SeccionMapa()
{
	
	this.main.id = 'SeccionMapa';
	this.ocultar(0);
	
	var holder_blanco_secciones = document.createElement('div')
	holder_blanco_secciones.className = 'holder_blanco_secciones'
	$(this.main).append(holder_blanco_secciones)
		$(holder_blanco_secciones).css({	width: app.ancho-20, height: app.alto-60})

	
	var map_canvas = document.createElement('div')
	map_canvas.id = 'SeccionMapa_map_canvas'
	$(holder_blanco_secciones).append(map_canvas)

	$(map_canvas).css({	width: app.ancho-20, height: app.alto-140})

	/*var esquina_si = new Image()
	esquina_si.src = 'img/mapa/esquina_si.png';
	esquina_si.id = 'SeccionMapa_esquina_si';
	$(this.main).append(esquina_si);*/


	var array_markers_eventos;
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
		alert(obj.solo_ver)
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
								  icon: 'img/markers/evento.png',
								  row: resultado.rows.item(i)
								});

					array_markers_eventos[i].setMap(map);

					google.maps.event.addListener(array_markers_eventos[i], 'click', function() {
					   	mostrar_un_evento(this.row)
					});
		        }
		    })
		});

	}



	function mostrar_un_evento($row){
		alert($row.eventos_id)
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