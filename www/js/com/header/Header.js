function Header(){ 
	
	var self = this
  	this.main = document.createElement('div')
  	this.main.id = 'Header'

	var btn_menu = new Boton2Frames('img/header/btn_menu.png', 26, 60, doMenu)
	btn_menu.main.id = 'Header_btn_menu'
	$(this.main).append(btn_menu.main)

	var logito = new Image()
	logito.src = 'img/header/logito.png';
	logito.id = 'Header_logito';
	$(this.main).append(logito);

	var search = document.createElement('input');
	search.id = 'Header_search';
	search.type = 'text';

	$(this.main).append(search);
	$(search).bind('keyup', doKeyUp)


	var ancho_search = 210+((app.ancho-320)/2)
	if(ancho_search>270) ancho_search = 270;
	$(search).css({'width':ancho_search});


	function doKeyUp(e){
		if(app.secciones.get_obj_seccion_actual().main.id != 'SeccionEventosOfertas')
		app.secciones.go(app.secciones.seccioneventosofertas);
	
		app.secciones.seccioneventosofertas.cargar_listas($(search).val())
	}

	function doMenu(){

		app.secciones.go(app.secciones.seccionhome)
		
	}




}

