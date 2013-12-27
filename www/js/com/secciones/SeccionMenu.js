function SeccionMenu()
{
	
	this.main.id = 'SeccionMenu';
	this.ocultar(0);
	
	$(this.main).append('<div id="SeccionMenu_header_bg"></div><div id="SeccionMenu_header">Santander Menú</div>')

	setTimeout(function(){
		$('#SeccionMenu_header_bg').css({width: app.ancho-20})
	})

}

SeccionMenu.prototype = new Base_Seccion();