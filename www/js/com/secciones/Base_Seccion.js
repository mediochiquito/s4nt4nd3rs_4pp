function Base_Seccion(){

	var self = this;
	this.main = document.createElement('div')
	this.main.className = 'seccion'

	this.mostrar = function($time, $data){
		
		var t = $time;
		if(typeof($time) == 'undefined') t = 300;
		
		/*
		document.activeElement.blur();
		$("input").blur();
		*/

		$(self.main).transition({x:app.ancho},0)
		$(this.main).transition({
			  x:0,
			  scale: 1, 
			  opacity: 1

		}, t, function(){
			$(self.main).css('pointer-events', 'auto');
		});

	
		this._set($data)
		
	}

	this._set = function ($data){



	}
	this.ocultar = function($time){
		
		/*document.activeElement.blur();
		$("input").blur();
*/
		var t = $time; 
		if(typeof($time) ==  'undefined') t = 300

		$(this.main).css('pointer-events', 'none');

		$(this.main).transition({
			  
			  scale:.95, 
			  opacity: 0

		}, t, function(){
			$(self.main).transition({x:3000},0)
		})
		
	}


}