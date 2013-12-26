function SeccionEventosOfertas()
{
	
	this.main.id = 'SeccionEventosOfertas';
	this.ocultar(0);
	
	var holder_blanco_secciones = document.createElement('div')
	holder_blanco_secciones.className = 'holder_blanco_secciones'
	$(this.main).append(holder_blanco_secciones)
	$(holder_blanco_secciones).css({	width: app.ancho-20, height: app.alto-60})
	
	$(this.main).bind("SOLAPA_CLICK", doSolapaClick)

/*	var holder_tabs = document.createElement('div')
	holder_tabs.id = 'SeccionEventosOfertas_holder_tabs'
	$(holder_tabs).append('<div></div>')
	$(this.main).append(holder_tabs)*/

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

/*	var is ;
	var scroll_set =  false*/
	var en_solapa=''

	function doSolapaClick(e){

		mostrar_solapa({solapa:e.value})

	}

	this.cargar_listas = function($busqueda){
		
		if(en_solapa=='una_oferta') mostrar_solapa({solapa:'eventos'});
		if(en_solapa=='un_evento')  mostrar_solapa({solapa:'ofertas'});

		lista_eventos.listar($busqueda)
		lista_ofertas.listar($busqueda)

		/*setTimeout(function(){  
               if(!scroll_set){
               		scroll_set = true;
               		is =  new iScroll('SeccionEventosOfertas_holder_tabs', {hScrollbar: false, vScrollbar: false});
               }else{
               		is.refresh()
               }

               is.scrollTo(0, 0, 0)
   		}, 110)*/


	}

	function mostrar_solapa($obj){
		
		//$(btn_subir_mapa.main).css({'margin-left': 3, top:app.alto-80})
		
		if(typeof($obj.solapa) == 'undefined') en_solapa = 'eventos';
		else en_solapa = $obj.solapa;
		//$(holder_tabs).find('>div').empty();

		$(lista_ofertas.main).transition({x:3000}, 0);
		$(lista_eventos.main).transition({x:3000}, 0);
		$(un_evento.main).transition({x:3000}, 0);
		$(una_oferta.main).transition({x:3000}, 0);

		if($obj.solapa == 'eventos'){
			//$(holder_tabs).css({width: app.ancho-40, height: app.alto-200});
			solapa_eventos.habil(true);
			solapa_ofertas.habil(false);
			/*setTimeout(function(){
				$(holder_tabs).find('>div').html(lista_eventos.main);
			}, 100);*/
			//$(btn_ver_en_mapa.main).css({'margin-left': -143, top:app.alto-80});
		/*	$(btn_subir_mapa.main).show();
			$(btn_ver_en_mapa.main).show();*/
			$(lista_eventos.main).transition({x:0}, 0)
			
		}

		if($obj.solapa == 'ofertas'){
			//$(holder_tabs).css({width: app.ancho-40, height: app.alto-200});
			solapa_eventos.habil(false);
			solapa_ofertas.habil(true);
			/*setTimeout(function(){
				$(holder_tabs).find('>div').html(lista_ofertas.main);
			}, 100);*/
			// $(btn_ver_en_mapa.main).css({'margin-left': -70, top:app.alto-80});
		/*	$(btn_ver_en_mapa.main).show();
			$(btn_subir_mapa.main).hide();*/
			$(lista_ofertas.main).transition({x:0}, 0);
		}

		if($obj.solapa == 'una_oferta'){
	
			solapa_eventos.habil(false);
			solapa_ofertas.habil(true);
			una_oferta._set($obj);
			
			/*$(btn_ver_en_mapa.main).hide();
			$(btn_subir_mapa.main).hide();*/
			$(una_oferta.main).transition({x:0}, 0);

		}

		if($obj.solapa == 'un_evento'){

			solapa_eventos.habil(true);
			solapa_ofertas.habil(false);
			un_evento._set($obj);

			/*$(btn_ver_en_mapa.main).hide();
			$(btn_subir_mapa.main).hide();*/
			$(un_evento.main).transition({x:0}, 0);
			
		}


	}

	this.updateScroll =  function (){

		is.refresh()

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