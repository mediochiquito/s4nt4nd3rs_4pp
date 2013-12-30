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
	
	var hoy = new Image();
	hoy.className =  'ItemListaOferta_hoy';
	hoy.src = 'img/hoy.svg';
	$(this.main).append(hoy);

	this.main.addEventListener('click', doClick);
/*	this.main.addEventListener('touchstart', pintar);
	this.main.addEventListener('touchend', despintar);
*/
	function doClick(e){
		pintar()
		setTimeout(function(){
			app.secciones.seccioneventosofertas.ir_a_una_solapa({solapa:'una_oferta', row: $row})
			//app.secciones.go(app.secciones.seccioneventosofertas, 300, {solapa:'una_oferta', row: $row})

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

