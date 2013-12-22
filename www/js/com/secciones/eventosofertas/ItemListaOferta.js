function ItemListaOferta($row)
{
	
	var self = this
	this.main = document.createElement('div');
	this.main.className = 'ItemListaOferta';

	var txt = document.createElement('div');
	txt.className = 'ItemListaOferta_txt_nombre';
	$(this.main).append(txt)
	$(txt).html($row.ofertas_nombre)

	var txt = document.createElement('div');
	txt.className = 'ItemListaOferta_txt_descuento';
	$(this.main).append(txt)
	$(txt).html($row.ofertas_descuento)
	
	this.main.addEventListener('click', doClick);
/*	this.main.addEventListener('touchstart', pintar);
	this.main.addEventListener('touchend', despintar);
*/
	function doClick(e){
		pintar()
		setTimeout(function(){

			

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

