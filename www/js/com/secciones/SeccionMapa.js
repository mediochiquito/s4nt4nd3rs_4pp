function SeccionMapa()
{
	

	this.main.id = 'SeccionMapa';
	this.ocultar(0);
	
	var map_canvas = document.createElement('div')
	map_canvas.id = 'SeccionMapa_map_canvas'
	$(this.main).append(map_canvas)
	$(map_canvas).css({	width: app.ancho, height: app.alto})


	//$(this.main).append('map_canvas')
	var map

	setTimeout(_construct, 100);
	
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

		  setTimeout(function() {
		    //  google.maps.event.trigger(map,'resize');
		   }, 200);
		
/*

		  if(navigator.geolocation) {

		        navigator.geolocation.getCurrentPosition(function(position) {
		        	 alert(position.coords.latitude)
			        var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

				      var infowindow = new google.maps.InfoWindow({
				        map: map,
				        position: pos,
				        content: 'Location found using HTML5.'
				      });

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