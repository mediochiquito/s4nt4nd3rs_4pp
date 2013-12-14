function Secciones(){ 
	
	var self = this

  	this.main = document.createElement('div')
  	this.main.id = 'secciones'

	this.seccionmapa = new SeccionMapa();
	$(this.main).append(this.seccionmapa.main)

	var obj_seccion_actual = null;	

	this.go = function($base_seccion, $time, $data){

		$(this.main).css({ display: 'block'});

		try{
			if($base_seccion != obj_seccion_actual)
				obj_seccion_actual.ocultar($time);
		}catch(e){}
		
		$base_seccion.mostrar($time, $data)

		obj_seccion_actual = $base_seccion
		
	}

	this._close_all = function(){
		
		$(document).trigger('CERRANDO_TODAS_LAS_SECCIONES');
		obj_seccion_actual.ocultar();
		obj_seccion_actual = null;

	}

	


}

