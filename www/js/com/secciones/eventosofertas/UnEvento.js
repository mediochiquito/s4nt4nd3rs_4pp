function UnEvento()
{
	var self = this;
	this.main =  document.createElement('div')
	this.main.id = 'UnEvento';
	
	
	var img = new Image()
	img.id = 'SeccionUnEvento_img'
	$(this.main).append(img)
	
	var header_titulo =  document.createElement('div')
	header_titulo.id = 'UnEvento_header_titulo'
	$(this.main).append(header_titulo)
	
	var titulo_txt =  document.createElement('div')
	titulo_txt.id = 'UnEvento_titulo_txt'
	$(header_titulo).append(titulo_txt)

	var holder_data =  document.createElement('div')
	holder_data.id = 'UnEvento_holder_data'
	$(this.main).append(holder_data)

	var holder_footer =  document.createElement('div')
	holder_footer.id = 'UnEvento_holder_footer'
	$(this.main).append(holder_footer)

	var btn_compartir = new Boton("<img src='img/fb.svg' width='20' />&nbsp;&nbsp;COMPARTIR", doCompartir, 'BotonAzul')
	btn_compartir.main.id = 'UnEvento_btn_compartir'
	$(holder_footer).append(btn_compartir.main)


	var btn_participar = new Boton("<img src='img/fb.svg' width='20' />&nbsp;&nbsp;PARTICIPAR", doParticipar, 'BotonAzul')
	btn_participar.main.id = 'UnEvento_btn_participar'
	$(holder_footer).append(btn_participar.main)

	var holder_participaciones =  document.createElement('div')
	holder_participaciones.id = 'UnEvento_holder_participaciones'
	$(holder_participaciones).append('<div id="UnEvento_txt_tambien_participan">También participan de este Evento:</div>')
	$(this.main).append(holder_participaciones)

	function addRegistro($label, $data){

		$(holder_data).append('<div class="UnEvento_reg"><div class="UnEvento_label">'+ $label+
							  '</div><div class="UnEvento_data" style="width: ' + (app.ancho-150) + 'px">'+ $data+
							  '</div><br style="clear:both"></div>')
	}

	function doParticipar(){
		

	}


	function doCompartir(){
		
		/*
		app._Facebook.conectar(function(){

	  		var params = {
	            method: 'feed',
	            name: $obj.row.ofertas_nombre,
	           	link: 'http://www.google.com',
	            picture: 'http://fbrell.com/f8.jpg',
	            caption: $obj.row.ofertas_cutoas,
	            description: $obj.row.ofertas_desc
	        };

	       FB.ui(params, function(obj) { console.log(obj);});

		}) 
     */
                
	}

	this._set = function ($obj){

		img.src = 'img/fotos_header_eventos/' + $obj.row.eventos_categoria_id + '.jpg';
		$(img).css('width', app.ancho-40);

		$(titulo_txt).html($obj.row.eventos_nombre);
		$(holder_data).empty()
		
		addRegistro('Categoria', app.categorias_eventos[$obj.row.eventos_categoria_id-1])
		addRegistro('Fecha', $obj.row.eventos_fecha_hora)
		addRegistro('Lugar', $obj.row.eventos_lugar)
		addRegistro('Descripción', $obj.row.eventos_desc)
	
		

	}



}

