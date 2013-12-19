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


	if(app.ancho > 400) $(search).css({'margin-left':-149, 'width':290});
	else $(search).css({'margin-left':-86, 'width':220});

	function doMenu(){

		app.secciones.go(app.secciones.seccionhome)
		
	}




}

