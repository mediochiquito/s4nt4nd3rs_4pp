function SeccionHome()
{

	this.main.id = 'SeccionHome';
	this.ocultar(0);
	
	var promo = new Image()
	promo.src = 'img/home/promo.png';
	promo.id = 'SeccionHome_promo';
	$(this.main).append(promo);

	var btn_mapa = new Boton2Frames('img/home/btn_mapa.png', 45, 128, doVerMapa)
	btn_mapa.main.id = 'SeccionHome_btn_mapa'
	$(this.main).append(btn_mapa.main)

	var btn_descuentos = new Boton2Frames('img/home/btn_descuentos.png', 69, 125, doVerDescuentos)
	btn_descuentos.main.id = 'SeccionHome_btn_descuentos'
	$(this.main).append(btn_descuentos.main)

	var btn_eventos = new Boton2Frames('img/home/btn_eventos.png', 47, 126, doVerEventos)
	btn_eventos.main.id = 'SeccionHome_btn_eventos'
	$(this.main).append(btn_eventos.main)


	
	function doVerDescuentos(){

		alert('doVerDescuentos');

	}

	function doVerEventos(){

		alert('doVerEventos');

	}


	function doVerMapa(){

		app.secciones.go(app.secciones.seccionmapa);

	}

}

SeccionHome.prototype = new Base_Seccion();