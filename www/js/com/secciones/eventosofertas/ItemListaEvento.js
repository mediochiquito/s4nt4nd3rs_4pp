function ItemListaEvento($row)
{
	
	var self = this
	this.main = document.createElement('div');
	this.main.className = 'ItemListaEvento';

	var txt = document.createElement('div');
	txt.className = 'ItemListaEvento_txt_nombre';
	$(this.main).append(txt)
	$(txt).html($row.eventos_nombre)
	
	if( este_evento_es_hoy()){
		var hoy = new Image();
		hoy.className =  'ItemListaOferta_hoy';
		hoy.src = 'img/hoy.svg';
		$(this.main).append(hoy);
	}

	
	this.main.addEventListener('click', doClick);
/*	this.main.addEventListener('touchstart', pintar);
	this.main.addEventListener('touchend', despintar);*/

	function doClick(e){
		pintar()
		setTimeout(function(){
			app.secciones.seccioneventosofertas.ir_a_una_solapa({solapa:'un_evento', row: $row})
			//app.secciones.go(app.secciones.seccioneventosofertas, 300, {solapa:'un_evento', row: $row})
		}, 200)
		setTimeout(despintar, 800)
	}
	function este_evento_es_hoy(){

		var array_fecha_hora = $row.eventos_fecha_hora.split(' ')
		var array_fecha =array_fecha_hora[0].split('-')
		

		var d = new Date();
		var hoy = new Date(d.getFullYear(),d.getMonth(), d.getDate())
		var dia_evento = new Date(Number(array_fecha[0]), Number(array_fecha[1])-1, Number(array_fecha[2]));
		
		
		if(hoy.getTime() == dia_evento.getTime()) return true;
		else return false;

	}

	function pintar(){

		$(self.main).css('background-color', '#ccc')

	}
	function despintar(){

		$(self.main).css('background-color', '#fff')
	
	}
}

