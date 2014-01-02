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

	var txt_fecha = new InputText(app.ancho-220, 'date', 50);
	txt_fecha.main.id = 'FormSubirEvento_txt_fecha';
	$(holder).append(txt_fecha.main);

	var txt_lugar = new InputText(app.ancho-220, 'text', 50);
	txt_lugar.main.id = 'FormSubirEvento_txt_lugar';
	$(holder).append(txt_lugar.main);

	var txt_desc = new InputText(app.ancho-180, 'text', 50);
	txt_desc.main.id = 'FormSubirEvento_txt_desc';
	$(holder).append(txt_desc.main);


	var btn_date = new Boton2Frames('img/form/btn_calendario.png', 28, 56, doDate)
	btn_date.main.id = 'FormSubirEvento_btn_date'
	$(this.main).append(btn_date.main)
	$(btn_date.main).css({'left': app.ancho-60})

	var btn_position = new Boton2Frames('img/form/btn_evento.png', 20, 60, doVerMapa)
	btn_position.main.id = 'FormSubirEvento_btn_position'
	$(this.main).append(btn_position.main)
	$(btn_position.main).css({'left': app.ancho-55})


	function doDate(){
	$(btn_date.main)[0].focus()
                    var event = document.createEvent('MouseEvents');
                        event.initMouseEvent('mousedown', true, true, window);
                        $(btn_date.main)[0].dispatchEvent(event);
              $(btn_date.main).trigger('mousedown')          
		//$(txt_desc.main).focus()

	}

	function doVerMapa(){


	}

}

