function FormSubirEvento()
{
	var self = this;
	this.main = document.createElement('div')
	this.main.id = 'FormSubirEvento';

var holder = document.createElement('div')
	holder.id = 'FormSubirEvento_holder'
	holder.className = 'Tabs_holder'
	$(holder).append('<div></div>')
	$(this.main).append(holder)

	$(holder).css({width: app.ancho-40, height: app.alto-120});

	//$(holder).append('<div id="FormSubirEvento_prox">PROXIMAMENTE (FPO)</div>')

	$(holder).append('<div id="FormSubirEvento_titulo">Completá el formulario para subir tu Evento.</div>');
	$(holder).append('<div class="FormSubirEvento_label" id="FormSubirEvento_label_categoria">Categoría</div>');
	$(holder).append('<div class="FormSubirEvento_label" id="FormSubirEvento_label_titulo">Título</div>');
	$(holder).append('<div class="FormSubirEvento_label" id="FormSubirEvento_label_fecha">Fecha</div>');
	$(holder).append('<div class="FormSubirEvento_label" id="FormSubirEvento_label_lugar">Lugar</div>');
	$(holder).append('<div class="FormSubirEvento_label" id="FormSubirEvento_label_desc">Descripción</div>');

	var combo_categorias = document.createElement('select');
	combo_categorias.id = 'FormSubirEvento_combo_categorias'
	$(combo_categorias).css({'width': app.ancho-158})
	
	for(var i=0; i< app.categorias_eventos.length; i++){

			var option =  document.createElement('option');
				option.value = (i+1)
				$(option).append(app.categorias_eventos[i])
				$(combo_categorias).append(option);

	}
	$(holder).append(combo_categorias);

	var txt_titulo = new InputText(app.ancho-180, 'text', 50);
	txt_titulo.main.id = 'FormSubirEvento_txt_titulo';
	$(holder).append(txt_titulo.main);

	var txt_fecha = new InputText(app.ancho-220, 'text', 50);
	txt_fecha.habil(false)
	txt_fecha.main.id = 'FormSubirEvento_txt_fecha';
	$(holder).append(txt_fecha.main);

	var txt_lugar = new InputText(app.ancho-220, 'text', 50);
	txt_lugar.habil(false)
	txt_lugar.main.id = 'FormSubirEvento_txt_lugar';
	$(holder).append(txt_lugar.main);

	var txt_desc = new InputText(app.ancho-180, 'text', 50);
	txt_desc.main.id = 'FormSubirEvento_txt_desc';
	$(holder).append(txt_desc.main);

	var btn_date = new Boton2Frames('img/form/btn_calendario.png', 28, 56, function(){})
	btn_date.main.id = 'FormSubirEvento_btn_date'
	//$(btn_date.main).bind('click', doDate)
	$(this.main).append(btn_date.main)
	$(btn_date.main).css({'left': app.ancho-60})

	var btn_position = new Boton2Frames('img/form/btn_evento.png', 20, 60, doVerMapa)
	btn_position.main.id = 'FormSubirEvento_btn_position'
	$(this.main).append(btn_position.main)
	$(btn_position.main).css({'left': app.ancho-55})

	var btn_subir = new Boton('SUBIR EVENTO', doSubirEvento);
	btn_subir.main.id = 'FormSubirEvento_btn_subir'
	$(holder).append(btn_subir.main);

	function doSubirEvento(){

		txt_titulo.marcar_error(false);
		txt_fecha.marcar_error(false);
		txt_lugar.marcar_error(false);
		txt_desc.marcar_error(false);

		if(txt_titulo.getValor()=='') txt_titulo.marcar_error(true);
		if(txt_fecha.getValor()=='') txt_fecha.marcar_error(true);
		if(txt_lugar.getValor()=='') txt_lugar.marcar_error(true);
		if(txt_desc.getValor()=='') txt_desc.marcar_error(true);

	}



	function doDate(){
		
		//if (!navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {

			// defining options
			var options = {
			  date: new Date(),
			  mode: 'datetime'
			};
			
			// calling show() function with options and a result handler
			datePicker.show(options, function(date){
			  console.log("date result " + date);  
			  var date = new Date(date)
			  txt_fecha.setValor(date.getFullYear())
			});

		/*}else{

			$(txt_fecha.main).focus()
		}*/
		
		
	}

	this._set = function (){
		
		if(app.secciones.seccionmapaform.getLatLonString() != '')
			txt_lugar.setValor(app.secciones.seccionmapaform.getLatLonString())

	}

	function doVerMapa(){

		app.secciones.go(app.secciones.seccionmapaform)
	}

}

