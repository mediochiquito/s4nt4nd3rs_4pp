function Secciones(){ 
	
	var self = this

  	this.main = document.createElement('div')
  	this.main.id = 'secciones'

  	this.seccionhome = new SeccionHome();
	$(this.main).append(this.seccionhome.main)
	this.seccionhome.ocultar(0);

	this.seccionmapa = new SeccionMapa();
	$(this.main).append(this.seccionmapa.main)
	this.seccionmapa.ocultar(0);

	this.seccioneventosofertas = new SeccionEventosOfertas();
	$(this.main).append(this.seccioneventosofertas.main)
	this.seccioneventosofertas.ocultar(0);

/*	this.seccionunevento = new SeccionUnEvento();
	$(this.main).append(this.seccionunevento.main)
	this.seccionunevento.ocultar(0);

	this.seccionunaoferta = new SeccionUnaOferta();
	$(this.main).append(this.seccionunaoferta.main)
	this.seccionunaoferta.ocultar(0);
*/
	var obj_seccion_actual = null;	
	
	this.get_obj_seccion_actual = function (){
		return obj_seccion_actual;
	}

	this.go = function($base_seccion, $time, $data){

		$(this.main).css({ display: 'block'});
	
		try{
			if($base_seccion != obj_seccion_actual)
				obj_seccion_actual.ocultar($time);
		}catch(e){}
		
		
			$base_seccion.mostrar($time, $data);

		obj_seccion_actual = $base_seccion
		
	}

	this._close_all = function(){
		
		$(document).trigger('CERRANDO_TODAS_LAS_SECCIONES');
		obj_seccion_actual.ocultar();
		obj_seccion_actual = null;

	}

	


}

