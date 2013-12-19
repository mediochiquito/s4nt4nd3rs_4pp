function SeccionEventosOfertas()
{
	
	this.main.id = 'SeccionEventosOfertas';
	this.ocultar(0);
	
	var holder_blanco_secciones = document.createElement('div')
	holder_blanco_secciones.className = 'holder_blanco_secciones'
	$(this.main).append(holder_blanco_secciones)
	$(holder_blanco_secciones).css({	width: app.ancho-20, height: app.alto-75})
	
	var solapa_eventos = new Solapa('EVENTOS', 'eventos', '#ed1c24')
	solapa_eventos.main.id = 'solapa_eventos'
	$(this.main).append(solapa_eventos.main)

	var solapa_ofertas = new Solapa('DESCUENTOS', 'ofertas', '#164789')
	solapa_ofertas.main.id = 'solapa_ofertas'
	$(this.main).append(solapa_ofertas.main)

	$(this.main).bind("SOLAPA_CLICK", doSolapaClick)

	this._set = function ($obj){

		

	}

}

SeccionEventosOfertas.prototype = new Base_Seccion();