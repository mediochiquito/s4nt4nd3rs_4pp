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

	function addRegistro($label, $data){

		$(holder_data).append('<div class="UnEvento_reg"><div class="UnEvento_label">'+ $label+
							  '</div><div class="UnEvento_data" style="width: ' + (app.ancho-150) + 'px">'+ $data+
							  '</div><br style="clear:both"></div>')
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
		
	/*	addRegistro('Cuotas', $obj.row.ofertas_cutoas)
		addRegistro('Descuento', $obj.row.ofertas_descuento)
		addRegistro('Dias de descuento', $obj.row.ofertas_dias)
		addRegistro('Telefono', '<a href="tel:' + $obj.row.ofertas_tel + '">' + $obj.row.ofertas_tel + "</a>")
		addRegistro('Dirección', $obj.row.ofertas_dir)
		addRegistro('Observaciones', $obj.row.ofertas_desc)*/

		

	}



}

