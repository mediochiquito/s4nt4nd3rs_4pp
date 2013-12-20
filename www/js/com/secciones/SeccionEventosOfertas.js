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

	var holder_tabs = document.createElement('div')
	holder_tabs.id = 'SeccionEventosOfertas_holder_tabs'
	$(this.main).append(holder_tabs)
	$(holder_tabs).css({	width: app.ancho-55, height: app.alto-155})
	
	var lista_descuentos = new ListaEventos()
	var lista_ofertas = new ListaOfertas()

	

	function doSolapaClick(e){

		mostrar_solapa(e.value)

	}

	this.cargar_listas = function(){
	
		lista_descuentos.listar()

	}

	function mostrar_solapa($solapa){

		if($solapa == 'eventos'){
		
			solapa_eventos.habil(true)
			solapa_ofertas.habil(false)
			$(holder_tabs).html(lista_descuentos.main)

		}

		if($solapa == 'ofertas'){
			
			solapa_eventos.habil(false)
			solapa_ofertas.habil(true)
			$(holder_tabs).html(lista_ofertas.main)
		}


            setTimeout(function(){  
               
               new iScroll('SeccionEventosOfertas_holder_tabs', {hScrollbar: false, vScrollbar: false});

            }, 300);
	}

	this._set = function ($obj){

		this.cargar_listas()
		mostrar_solapa($obj.solapa)

	}

}

SeccionEventosOfertas.prototype = new Base_Seccion();