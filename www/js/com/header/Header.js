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
	search.id = 'Header_search'
	$(this.main).append(search);

/*
	var lupa = new Image()
	lupa.src = 'img/header/lupa.png';
	lupa.id = 'Header_lupa';
	$(this.main).append(lupa);*/

	var ancho_search = 200+((app.ancho-320)/2)
	if(ancho_search>250) ancho_search = 250;
	$(search).css({'width':ancho_search});

	//$(lupa).css({'margin-right':ancho_search/2-10});
	
	
	
	/*if(app.ancho > 400) $(search).css({'margin-left':-149, 'width':270});
	else $(search).css({'margin-left':-86, 'width':200});*/

	function doMenu(){

		app.secciones.go(app.secciones.seccionhome)
		
	}




}

