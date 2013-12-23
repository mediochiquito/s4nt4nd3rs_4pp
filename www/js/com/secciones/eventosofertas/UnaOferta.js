function UnaOferta()
{
	var self = this;
	this.main =  document.createElement('div')
	this.main.id = 'UnaOferta';
	
	var img = new Image()
	img.id = 'SeccionUnaOferta_img'
	$(this.main).append(img)
	
	var header_titulo =  document.createElement('div')
	header_titulo.id = 'UnaOferta_header_titulo'
	$(this.main).append(header_titulo)
	
	var titulo_txt =  document.createElement('div')
	titulo_txt.id = 'UnaOferta_titulo_txt'
	$(header_titulo).append(titulo_txt)

	var holder_data =  document.createElement('div')
	holder_data.id = 'UnaOferta_holder_data'
	$(this.main).append(holder_data)


	function addRegistro($label, $data){

		$(holder_data).append('<div class="UnaOferta_reg"><div class="UnaOferta_label">'+ $label+
							  '</div><div class="UnaOferta_data" style="width: ' + (app.ancho-150) + 'px">'+ $data+
							  '</div><br style="clear:both"></div>')
	}


	this._set = function ($obj){

		img.src = 'img/fotos_header/' + $obj.row.ofertas_header_img;
		$(img).css('width', app.ancho-20);

		$(titulo_txt).html($obj.row.ofertas_nombre);
		$(holder_data).empty()
		
		addRegistro('Cuotas', $obj.row.ofertas_cutoas)
		addRegistro('Descuento', $obj.row.ofertas_descuento)
		addRegistro('Dias de descuento', $obj.row.ofertas_dias)
		addRegistro('Telefono', $obj.row.ofertas_tel)
		addRegistro('Dirección', $obj.row.ofertas_dir)
		addRegistro('Observaciones', $obj.row.ofertas_desc)



	}

}

