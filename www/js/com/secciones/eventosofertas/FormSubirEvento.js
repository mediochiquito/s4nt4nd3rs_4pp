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

	var txt_titulo = new InputText(app.ancho-160, 'text', 50);
	txt_titulo.main.id = 'FormSubirEvento_txt_titulo';
	$(holder).append(txt_titulo.main);


	var txt_fecha = new InputText(app.ancho-200, 'date', 50);
	txt_fecha.main.id = 'FormSubirEvento_txt_fecha';
	$(holder).append(txt_fecha.main);


}

