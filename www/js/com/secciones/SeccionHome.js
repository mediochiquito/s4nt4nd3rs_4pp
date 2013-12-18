function SeccionHome()
{

	this.main.id = 'SeccionHome';
	this.ocultar(0);
	
	var btn_mapa = new Boton('MAPA', doVerMapa)
		btn_mapa.main.id = 'SeccionHome_vermapa'
		$(this.main).append(btn_mapa.main)

	function doVerMapa(){

		app.secciones.go(app.secciones.seccionmapa)
	}

}

SeccionHome.prototype = new Base_Seccion();