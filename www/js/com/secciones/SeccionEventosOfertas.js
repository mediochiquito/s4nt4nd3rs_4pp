function SeccionEventosOfertas()
{
	
	this.main.id = 'SeccionEventosOfertas';
	this.ocultar(0);
	
	var holder_blanco_secciones = document.createElement('div')
	holder_blanco_secciones.className = 'holder_blanco_secciones'
	$(this.main).append(holder_blanco_secciones)
	$(holder_blanco_secciones).css({	width: app.ancho-20, height: app.alto-75})
	
	
	setTimeout(_construct, 0);
	
	function _construct() {
		
		 
	}

	}




	this._set = function ($obj){

		alert('solapa')

	}

}

SeccionEventosOfertas.prototype = new Base_Seccion();