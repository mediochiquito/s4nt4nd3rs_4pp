function SeccionMapaForm()
{
	
	this.main.id = 'SeccionMapaForm';
	this.ocultar(0);
	
	var holder_blanco_secciones = document.createElement('div')
	holder_blanco_secciones.className = 'holder_blanco_secciones'
	$(this.main).append(holder_blanco_secciones)
	$(holder_blanco_secciones).css({	width: app.ancho-20, height: app.alto-60})


	var holdermap_canvas = document.createElement('div')
	holdermap_canvas.id = 'SeccionMapaForm_holdermap_canvas'
	$(holder_blanco_secciones).append(holdermap_canvas)

	var map_canvas = document.createElement('div')
	map_canvas.id = 'SeccionMapaForm_map_canvas'
	$(holdermap_canvas).append(map_canvas)


	$(holdermap_canvas).css({	width: app.ancho-20, height: app.alto-120})
	
	if (!navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
	
		var esquina_si = new Image()
		esquina_si.src = 'img/mapa/esquina_izq.svg';
		esquina_si.id = 'SeccionMapaForm_esquina_si';
		$(this.main).append(esquina_si);

		var esquina_der = new Image()
		esquina_der.src = 'img/mapa/esquina_der.svg';
		esquina_der.id = 'SeccionMapaForm_esquina_der';
		$(this.main).append(esquina_der);
		$(esquina_der).css('left',app.ancho-25);
	}

	var btn_aceptar = new Boton('ACEPTAR', doAceptar);
	btn_aceptar.main.id = 'SeccionMapaForm_btn_aceptar'
	$(this.main).append(btn_aceptar.main);

	var marker;
	var lat = "";
	var lon = "";


	function doAceptar(){
		
		lat = marker.getPosition().nb
		lon = marker.getPosition().ob

		app.secciones.go(app.secciones.seccioneventosofertas, 300, {solapa: 'subirevento'});
	}
	this.getLatLonString = function (){
		if(lat=='') return '';
		return lat + ',' + lon
	}
	function _construct() {
			


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

		 marker = new google.maps.Marker(
		           				{
								  position: pos,
								  draggable:true,
								  icon: {url:'img/markers/evento.png',  scaledSize: new google.maps.Size(19, 30), size: new google.maps.Size(19, 30)}
								});

		marker.setMap(map);

	
		setTimeout(function() {
		     google.maps.event.trigger(map,'resize');
		}, 200);

	
	}


	this._set = function (obj){
		
		if(!app.hay_internet()) app.alerta("Debes conectarte a internet para ver el mapa.");
		_construct()
		if(app.hay_internet() && !app.cargo_mapa)
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

	}
}

SeccionMapaForm.prototype = new Base_Seccion();