function FormSubirEvento()
{
	var self = this;
	this.main = document.createElement('div')
	this.main.id = 'FormSubirEvento';


$(this.main).css({width: app.ancho, height: app.alto-120});
var holder = document.createElement('div')
	holder.id = 'FormSubirEvento_holder'
	holder.className = 'FormSubirEvento_Tabs_holder'
	$(holder).append('<div></div>')
	$(this.main).append(holder)

	$(holder).css({width: app.ancho-40, height: app.alto-120});

	//$(holder).append('<div id="FormSubirEvento_prox">PROXIMAMENTE (FPO)</div>')

	$(holder).append('<div id="FormSubirEvento_titulo">Completá el formulario para subir tu Evento.</div>');
	$(holder).append('<div class="FormSubirEvento_label" id="FormSubirEvento_label_categoria">Categoría</div>');
	$(holder).append('<div class="FormSubirEvento_label" id="FormSubirEvento_label_titulo">Título</div>');
	$(holder).append('<div class="FormSubirEvento_label" id="FormSubirEvento_label_fecha">Fecha</div>');
	$(holder).append('<div class="FormSubirEvento_label" id="FormSubirEvento_label_hora">Hora</div>');
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

	var txt_desc = new InputText(app.ancho-180, 'text', 50);
	txt_desc.main.id = 'FormSubirEvento_txt_desc';
	$(holder).append(txt_desc.main);

	var txt_fecha = new InputText(app.ancho-220, 'text', 50);
	txt_fecha.habil(false)
	txt_fecha.main.id = 'FormSubirEvento_txt_fecha';
	$(holder).append(txt_fecha.main);

	var txt_hora = new InputText(app.ancho-220, 'text', 50);
	txt_hora.habil(false)
	txt_hora.main.id = 'FormSubirEvento_txt_hora';
	$(holder).append(txt_hora.main);

	var txt_lugar = new InputText(app.ancho-220, 'text', 50);
	txt_lugar.main.id = 'FormSubirEvento_txt_lugar';
	$(holder).append(txt_lugar.main);

	var btn_date = new Boton2Frames('img/form/btn_calendario.png', 28, 56, doDate)
	btn_date.main.id = 'FormSubirEvento_btn_date'
	//$(btn_date.main).bind('click', doDate)
	$(holder).append(btn_date.main)
	$(btn_date.main).css({'left': app.ancho-80});

	var btn_time = new Boton2Frames('img/form/btn_calendario.png', 28, 56, doTime)
	btn_time.main.id = 'FormSubirEvento_btn_time'
	//$(btn_time.main).bind('click', doTime)
	$(holder).append(btn_time.main)
	$(btn_time.main).css({'left': app.ancho-80})

	var btn_position = new Boton2Frames('img/form/btn_evento.png', 20, 60, doVerMapa)
	btn_position.main.id = 'FormSubirEvento_btn_position'
	$(holder).append(btn_position.main)
	$(btn_position.main).css({'left': app.ancho-75})

	var btn_subir = new Boton('SUBIR EVENTO', doSubirEvento);
	btn_subir.main.id = 'FormSubirEvento_btn_subir'
	$(holder).append(btn_subir.main);



	function doSubirEvento(){

		txt_titulo.marcar_error(false);
		txt_fecha.marcar_error(false);
		txt_hora.marcar_error(false);
		txt_lugar.marcar_error(false);
		txt_desc.marcar_error(false);

		var r = true;

		if(txt_titulo.getValor()=='') {txt_titulo.marcar_error(true); r = false;}
		if(txt_fecha.getValor()=='') {txt_fecha.marcar_error(true); r = false;}
		if(txt_lugar.getValor()=='') {txt_lugar.marcar_error(true); r = false;}
		if(txt_hora.getValor()=='') {txt_hora.marcar_error(true); r = false;}
		if(txt_desc.getValor()=='') {txt_desc.marcar_error(true);  r = false;}
		if(r && app.secciones.seccionmapaform.getLatLonString()=='') {app.alerta('Debes elegir las coordenadas del lugar.'); r = false;}
		

		if(r)

		{

			app.cargando(true, 'Creando evento...')
						$.ajax({

							type: "POST",
							url: app.server + "xml.crear_evento.php",
							dataType: 'xml',
							cache: false, 
							data:{
								lat_lon: app.secciones.seccionmapaform.getLatLonString(),
								id_categoria: $(combo_categorias).val(),
								titulo: txt_titulo.getValor(),
								fecha: txt_fecha.getValor(),
								lugar: txt_lugar.getValor(),
								hora: txt_hora.getValor(),
								desc: txt_desc.getValor(),
								uid: app.usuario.uid
							},

							success: function($xml) {
								app.alerta('Tu evento ha sido creado con exito. El mismo será moderado antes de ser publicado.')	
								app.cargando(false);
								
							},
							error: function(){ 
								app.alerta('Ocurrio un error al guardar el evento.')							
								app.cargando(false)
								
							}
						});	

			_reset()
		}

	}
	
	function _reset(){ 
		txt_titulo.setValor('')
		txt_fecha.setValor('')
		txt_lugar.setValor('')
		txt_hora.setValor('')
		txt_desc.setValor('')
		app.secciones.seccionmapaform.resetLatLonString();
	}

	function doTime(){

			var options = {
			   date: new Date(),
			   allowOldDates:false,
			   mode : 'time',
			   allowFutureDates : true
			};
			
			// calling show() function with options and a result handler
			datePicker.show(options, function(date){
			  //console.log("date result " + date);  
			  var date = new Date(date)
			  	 txt_hora.setValor(date.getHours() + ':' + date.getMinutes() )

			});

	}
		


	function doDate(){
		
	
			var options = {
			   date: new Date(),
			   allowOldDates:false,
			   mode : 'date',
			   allowFutureDates : true
			};
			
			// calling show() function with options and a result handler
			datePicker.show(options, function(date){
			 // console.log("date result " + date);  
			  var date = new Date(date)
			  txt_fecha.setValor(date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear());
			});

	}

	this._set = function (){
		
		/*if(app.secciones.seccionmapaform.getLatLonString() != '')
			txt_lugar.setValor()*/

	}

	function doVerMapa(){
		
		app.secciones.go(app.secciones.seccionmapaform, 300, {pos:app.secciones.seccionmapaform.getLatLonString()})
	}

}

