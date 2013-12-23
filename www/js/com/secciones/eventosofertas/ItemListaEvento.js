function ItemListaEvento($row)
{
	
	var self = this
	this.main = document.createElement('div');
	this.main.className = 'ItemListaEvento';

	var txt = document.createElement('div');
	txt.className = 'ItemListaEvento_txt_nombre';
	$(this.main).append(txt)
	$(txt).html($row.eventos_nombre)
	
	
	this.main.addEventListener('click', doClick);
/*	this.main.addEventListener('touchstart', pintar);
	this.main.addEventListener('touchend', despintar);*/

	function doClick(e){
		pintar()
		setTimeout(function(){
			app.secciones.go(app.secciones.seccioneventosofertas, 300, {solapa:'un_evento', row: $row})
		}, 200)
		setTimeout(despintar, 800)
	}

	function pintar(){

		$(self.main).css('background-color', '#ccc')

	}
	function despintar(){

		$(self.main).css('background-color', '#fff')
	
	}
}

