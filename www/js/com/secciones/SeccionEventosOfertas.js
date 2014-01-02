function SeccionEventosOfertas()
{
	
	this.main.id = 'SeccionEventosOfertas';
	this.ocultar(0);
	
	var holder_blanco_secciones = document.createElement('div')
	holder_blanco_secciones.className = 'holder_blanco_secciones'
	$(this.main).append(holder_blanco_secciones)
	$(holder_blanco_secciones).css({	width: app.ancho-20, height: app.alto-60})
	
	$(this.main).bind("SOLAPA_CLICK", doSolapaClick)

	var solapa_eventos = new Solapa('EVENTOS', 'eventos', '#674d97')
	solapa_eventos.main.id = 'solapa_eventos'
	$(this.main).append(solapa_eventos.main)

	var solapa_ofertas = new Solapa('DESCUENTOS', 'ofertas', '#ed1c24')
	solapa_ofertas.main.id = 'solapa_ofertas'
	$(this.main).append(solapa_ofertas.main)

	var lista_eventos = new ListaEventos()
	$(lista_eventos.main).transition({x:3000}, 0)
	$(this.main).append(lista_eventos.main)

	var lista_ofertas = new ListaOfertas()
	$(lista_ofertas.main).transition({x:3000}, 0)
	$(this.main).append(lista_ofertas.main)

	var un_evento = new UnEvento()
	$(un_evento.main).transition({x:3000}, 0)
	$(this.main).append(un_evento.main);

	var una_oferta = new UnaOferta()
	$(una_oferta.main).transition({x:3000}, 0)
	$(this.main).append(una_oferta.main);

	var subirevento = new FormSubirEvento()
	$(subirevento.main).transition({x:3000}, 0)
	$(this.main).append(subirevento.main);


	var en_solapa=''

	function doSolapaClick(e){

		mostrar_solapa({solapa:e.value})

	}

	this.cargar_listas = function($busqueda){
		
		if(en_solapa=='una_oferta') mostrar_solapa({solapa:'eventos'});
		if(en_solapa=='un_evento')  mostrar_solapa({solapa:'ofertas'});

		lista_eventos.listar($busqueda, function ($cantidad_eventos){

			lista_ofertas.listar($busqueda, function ($cantidad_ofertas){

					if($busqueda != ''){

						if($cantidad_ofertas>$cantidad_eventos) mostrar_solapa({solapa: 'ofertas'});
						else mostrar_solapa({solapa: 'eventos'});
					}

			});
		});
		

	


	}

	this.ir_a_una_solapa = function($obj){

		mostrar_solapa($obj)
	}

	function mostrar_solapa($obj){
		
		if(typeof($obj.solapa) == 'undefined') en_solapa = 'eventos';
		else en_solapa = $obj.solapa;
		
		$(lista_ofertas.main).transition({x:3000}, 0);
		$(lista_eventos.main).transition({x:3000}, 0);
		$(un_evento.main).transition({x:3000}, 0);
		$(una_oferta.main).transition({x:3000}, 0);
		$(subirevento.main).transition({x:3000}, 0);

		$(lista_ofertas.main).css('pointer-events', 'none')
		$(lista_eventos.main).css('pointer-events', 'none')

		if($obj.solapa == 'subirevento'){
		
			solapa_eventos.habil(true);
			solapa_ofertas.habil(false);
			$(subirevento.main).transition({x:0}, 0)

		}

		if($obj.solapa == 'eventos'){
		
			solapa_eventos.habil(true);
			solapa_ofertas.habil(false);
			$(lista_eventos.main).transition({x:0}, 0)

			setTimeout(function(){
				$(lista_eventos.main).css('pointer-events', 'auto')
			}, 500)
			
		}

		if($obj.solapa == 'ofertas'){
			
			solapa_eventos.habil(false);
			solapa_ofertas.habil(true);
			$(lista_ofertas.main).transition({x:0}, 0);

			setTimeout(function(){
				$(lista_ofertas.main).css('pointer-events', 'auto')
			}, 500)
			
		}

		if($obj.solapa == 'una_oferta'){
	
			solapa_eventos.habil(false);
			solapa_ofertas.habil(true);
			una_oferta._set($obj);
			$(una_oferta.main).transition({x:0}, 0);

		}

		if($obj.solapa == 'un_evento'){

			solapa_eventos.habil(true);
			solapa_ofertas.habil(false);
			un_evento._set($obj);
			$(un_evento.main).transition({x:0}, 0);
			
		}


	}

	this._set = function ($obj){

		if(typeof($obj)!='undefined'){

			this.cargar_listas('');
			mostrar_solapa($obj);

		}else{

			if(en_solapa=='') mostrar_solapa({solapa:'eventos'});

		}
	}

}

SeccionEventosOfertas.prototype = new Base_Seccion();