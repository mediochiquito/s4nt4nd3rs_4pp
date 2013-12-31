function SeccionMenu()
{
	
	this.main.id = 'SeccionMenu';
	this.ocultar(0);
	
	$(this.main).append('<div id="SeccionMenu_header_bg"></div><div id="SeccionMenu_header">Santander Menú</div><img src="img/menu/punta.svg" id="SeccionMenu_punta" />')
	//$(this.main).append('<div id="SeccionMenu_header_bg"></div><div id="SeccionMenu_header">Santander Menú</div>')

	var holder = document.createElement('div')
	holder.id = 'SeccionMenu_holder'
	$(this.main).append(holder)

	var btn_mapa = new ItemMenu('Mapa', 'icon_mapa.svg', doVerMapa)
	$(holder).append(btn_mapa.main)

	var btn_eventos = new ItemMenu('Eventos', 'icon_eventos.svg', doVerEventos)
	$(holder).append(btn_eventos.main)

	var btn_descuentos = new ItemMenu('Descuentos', 'icon_ofertas.svg', doVerDescuentos)
	$(holder).append(btn_descuentos.main)
	
	var btn_cargar_evento = new ItemMenu('Cargar Evento', 'icon_cargar_evento.svg', doSubirEvento)
	$(holder).append(btn_cargar_evento.main)
	
	var btn_notitficaciones = new ItemMenu('Notificaciones Push', 'icon_push.svg', doPush)
	$(holder).append(btn_notitficaciones.main)

	var btn_terms = new ItemMenu('Términos y Condiciones', 'icon_terms.svg', doTerms)
	$(holder).append(btn_terms.main)



	var chk_push = new BotonToogle("img/mapa/checkbox.svg", '1' , 30, 60, doCheckPush)
	chk_push.main.id = 'SeccionMenu_chk_push'
	$(chk_push.main).css('pointer-events', 'none');
	$(btn_notitficaciones.main).append(chk_push.main)
	chk_push.setSelected(true)

	setTimeout(function(){
		$('#SeccionMenu_header_bg').css({width: app.ancho-20})
	})

	function doCheckPush(){


	}
	function doSubirEvento(){
		
		app.secciones.go(app.secciones.seccioneventosofertas, 300, {solapa: 'subirevento'});

	}
	function doTerms(){


		app.secciones.go(app.secciones.seccionterms)
	}
	function doPush(){

		if(chk_push.getSelected()){

			
			app._ManagePush.unregistrar()
			chk_push.setSelected(false)

			
			
		}else{
			
			app._ManagePush.registrar()
			chk_push.setSelected(true)
		}
		
	}

	function doVerDescuentos(){

		app.secciones.go(app.secciones.seccioneventosofertas, 300, {solapa: 'ofertas'});

	}

	function doVerEventos(){
		app.secciones.go(app.secciones.seccioneventosofertas, 300, {solapa: 'eventos'});
	}


	function doVerMapa(){

		app.secciones.go(app.secciones.seccionmapa);

	}

}

SeccionMenu.prototype = new Base_Seccion();