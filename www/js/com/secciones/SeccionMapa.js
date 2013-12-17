function SeccionMapa()
{
	

	this.main.id = 'SeccionMapa';
	this.ocultar(0);
	
	var map_canvas = document.createElement('div')
	map_canvas.id = 'SeccionMapa_map_canvas'
	$(this.main).append(map_canvas)
	$(map_canvas).css({	width: app.ancho, height: app.alto})

	var array_markers
	//$(this.main).append('map_canvas')
	var map

	setTimeout(_construct, 100);
	
	function _construct() {
		
		  var mapOptions = {
		    zoom: 16,
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

		  $(document).bind('UPDATE_EVENTOS', do_UPDATE_EVENTOS);

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
			
		var largo = $(xml).find('item').length;
		var i;
		for(i=0; i < largo; i++){
			arr_marcadores[i] = new google.maps.Marker({
								  position: new google.maps.LatLng($(xml).find('item').eq(i).find('latitud').text(),$(xml).find('item').eq(i).find('longitud').text()),
								  title:$(xml).find('item').eq(i).find('nombre').text(),
								  icon: new google.maps.MarkerImage('../global/img/lugares/marker.png',new google.maps.Size(21, 33),new google.maps.Point(0,0),new google.maps.Point(10, 33))
								});
			arr_marcadores[i].setMap(mapa);
		}
	}
	*/

	function do_UPDATE_EVENTOS(e){

		array_markers = new Array()
		alert('do_UPDATE_EVENTOS')

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