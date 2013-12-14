function SeccionMapa()
{
	
	var self = this
	this.main.id = 'SeccionMapa';
	this.ocultar(0);
	
	var map_canvas = document.createElement('div')
	map_canvas.id = 'SeccionMapa_map_canvas'
	$(this.main).append(map_canvas)
	
	var map;
	
	_construct()

	function _construct() {
		
		  var mapOptions = {
		    zoom: 8
		  };
		  map = new google.maps.Map(map_canvas,  mapOptions);

		  if(navigator.geolocation) {
		        navigator.geolocation.getCurrentPosition(function(position) {

			        var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

				    /*  var infowindow = new google.maps.InfoWindow({
				        map: map,
				        position: pos,
				        content: 'Location found using HTML5.'
				      });*/

			      map.setCenter(pos);

			    }, function() {
			      handleNoGeolocation(true);
			    });

		  } else {
		    // Browser doesn't support Geolocation
		    handleNoGeolocation(false);
		  }
	}

	function handleNoGeolocation(errorFlag) {
		  
		  if (errorFlag) {
		    var content = 'Error: The Geolocation service failed.';
		  } else {
		    var content = 'Error: Your browser doesn\'t support geolocation.';
		  }

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