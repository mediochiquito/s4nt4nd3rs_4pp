function SeccionMenu()
{
	
	this.main.id = 'SeccionMenu';
	this.ocultar(0);
	
	$(this.main).append('<div id="SeccionMenu_header_bg"></div><div id="SeccionMenu_header">Santander Menú</div>')

	var btn_mapa = new ItemMenu('Mapa', '', doMapa)
	$(this.main).append(btn_mapa.main)

	var btn_eventos = new ItemMenu('Eventos', '', doMapa)
	$(this.main).append(btn_eventos.main)

	var btn_descuentos = new ItemMenu('Descuentos', '', doMapa)
	$(this.main).append(btn_descuentos.main)
	
	var btn_cargar_evento = new ItemMenu('Cargar Evento', '', doMapa)
	$(this.main).append(btn_cargar_evento.main)
	
	var btn_notitficaciones = new ItemMenu('Notificaciones Push', '', doMapa)
	$(this.main).append(btn_cargar_evento.main)


	setTimeout(function(){
		$('#SeccionMenu_header_bg').css({width: app.ancho-20})
	})


	function doMapa(){


	}
}

SeccionMenu.prototype = new Base_Seccion();