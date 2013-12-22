function SeccionEventosOfertas()
{
	
	this.main.id = 'SeccionEventosOfertas';
	this.ocultar(0);
	
	var holder_blanco_secciones = document.createElement('div')
	holder_blanco_secciones.className = 'holder_blanco_secciones'
	$(this.main).append(holder_blanco_secciones)
	$(holder_blanco_secciones).css({	width: app.ancho-20, height: app.alto-60})
	
	var solapa_eventos = new Solapa('EVENTOS', 'eventos', '#674d97')
	solapa_eventos.main.id = 'solapa_eventos'
	$(this.main).append(solapa_eventos.main)

	var solapa_ofertas = new Solapa('DESCUENTOS', 'ofertas', '#ed1c24')
	solapa_ofertas.main.id = 'solapa_ofertas'
	$(this.main).append(solapa_ofertas.main)

	$(this.main).bind("SOLAPA_CLICK", doSolapaClick)

	var holder_tabs = document.createElement('div')
	holder_tabs.id = 'SeccionEventosOfertas_holder_tabs'
	$(holder_tabs).append('<div></div>')
	$(this.main).append(holder_tabs)
	$(holder_tabs).css({width: app.ancho-40, height: app.alto-200})
	
	var lista_descuentos = new ListaEventos()
	var lista_ofertas = new ListaOfertas()


	var   is ;
	var scroll_set =  false
	var en_solapa=''
	var btn_ver_en_mapa = new Boton('VER EN MAPA', doVerEnMapa);
	btn_ver_en_mapa.main.id = 'SeccionEventosOfertas_btn_ver_en_mapa'
	$(this.main).append(btn_ver_en_mapa.main);

	var btn_subir_mapa = new Boton('SUBIR EVENTO', doSubirEvento);
	btn_subir_mapa.main.id = 'SeccionEventosOfertas_btn_subir_mapa'
	$(this.main).append(btn_subir_mapa.main);

	function doVerEnMapa(e){

		app.secciones.go(app.secciones.seccionmapa, 300, {solo_ver:en_solapa})

	}
	function doSubirEvento(e){


	}


	function doSolapaClick(e){

		mostrar_solapa(e.value)

	}

	this.cargar_listas = function($busqueda){
		
		lista_descuentos.listar($busqueda)
		lista_ofertas.listar($busqueda)

		setTimeout(function(){  
               if(!scroll_set){
               		scroll_set = true;
               		is =  new iScroll('SeccionEventosOfertas_holder_tabs', {hScrollbar: false, vScrollbar: false});
               }else{
               		is.refresh()
               }
               is.scrollTo(0, 0, 0)
   		}, 110)

	}

	function mostrar_solapa($solapa){
		
		$(btn_subir_mapa.main).css({'margin-left': 3, top:app.alto-80})
		
		if(typeof($solapa) == 'undefined') en_solapa = 'eventos';
		else en_solapa = $solapa;

		if($solapa == 'eventos'){
		
			solapa_eventos.habil(true)
			solapa_ofertas.habil(false)
			$(holder_tabs).find('>div').html(lista_descuentos.main)
			$(btn_ver_en_mapa.main).css({'margin-left': -143, top:app.alto-80});
			$(btn_subir_mapa.main).show();
		}

		if($solapa == 'ofertas'){
			
			solapa_eventos.habil(false)
			solapa_ofertas.habil(true)
			$(holder_tabs).find('>div').html(lista_ofertas.main)
			$(btn_ver_en_mapa.main).css({'margin-left': -70, top:app.alto-80});
			$(btn_subir_mapa.main).hide();
		}

		setTimeout(function(){  
               if(!scroll_set){
               		scroll_set = true;
               		is =  new iScroll('SeccionEventosOfertas_holder_tabs', {hScrollbar: false, vScrollbar: false});
               }else{
               		is.refresh()
               }
               is.scrollTo(0, 0, 0)
   		}, 110)


	}

	this._set = function ($obj){

		if(typeof($obj)!='undefined'){

			this.cargar_listas('');
			mostrar_solapa($obj.solapa);

		}else{

			if(en_solapa=='') mostrar_solapa('eventos');



		}
	}

}

SeccionEventosOfertas.prototype = new Base_Seccion();