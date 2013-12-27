function UnaOferta()
{
	var self = this;
	this.main =  document.createElement('div')
	this.main.id = 'UnaOferta';
	

	var holder = document.createElement('div')
	holder.id = 'UnaOferta_holder'
	holder.className = 'Tabs_holder'
	$(holder).append('<div></div>')
	$(this.main).append(holder)

	$(holder).css({width: app.ancho-40, height: app.alto-120});

	var img = new Image()
	img.id = 'SeccionUnaOferta_img'
	$(holder).find('>div').append(img)
	
	var header_titulo =  document.createElement('div')
	header_titulo.id = 'UnaOferta_header_titulo'
	$(holder).find('>div').append(header_titulo)
	
	var titulo_txt =  document.createElement('div')
	titulo_txt.id = 'UnaOferta_titulo_txt'
	$(header_titulo).append(titulo_txt)

	var holder_data =  document.createElement('div')
	holder_data.id = 'UnaOferta_holder_data'
	$(holder).find('>div').append(holder_data)

	var holder_footer =  document.createElement('div')
	holder_footer.id = 'UnaOferta_holder_footer'
	$(holder).find('>div').append(holder_footer)

	var btn_compartir = new Boton("<img src='img/fb.svg' width='20' />&nbsp;&nbsp;COMPARTIR", doCompartir, 'BotonAzul')
	btn_compartir.main.id = 'UnaOferta_btn_compartir'
	$(holder_footer).append(btn_compartir.main)

	var btn_volver = new Boton2Frames("img/btn_volver.svg", 25, 50, doVolver)
	btn_volver.main.id = 'UnaOferta_btn_volver'
	$(header_titulo).append(btn_volver.main)

	var btn_ver_en_mapa = new Boton2Frames("img/ofertas/marker_lineas.svg", 25, 50, doVerEnMapa)
	btn_ver_en_mapa.main.id = 'UnEvento_btn_ver_en_mapa'
	$(header_titulo).append(btn_ver_en_mapa.main)

	var is ;
	var scroll_set =  false
	var obj;

	function doVolver(){
		app.secciones.seccioneventosofertas.ir_a_una_solapa({solapa: 'ofertas'})
		//app.secciones.go(app.secciones.seccioneventosofertas, 300, {solapa: 'ofertas'});

	}
	function doVerEnMapa(){

			app.secciones.go(app.secciones.seccionmapa, 300, {solo_ver:'ofertas', center:[obj.row.ofertas_lat, obj.row.ofertas_lon]});


	}
	
	function addRegistro($label, $data){
		
		$(holder_data).append('<div class="UnaOferta_reg"><div class="UnaOferta_label">'+ $label+
							  '</div><div class="UnaOferta_data" style="width: ' + (app.ancho-150) + 'px">'+ $data+
							  '</div><br style="clear:both"></div>');
		
	}

	function doCompartir(){


		app._Facebook.conectar(function(){

            /*    var params = {
                    method: 'feed',
                    name:  obj.row.ofertas_nombre,
                    link: 'https://developers.facebook.com/docs/reference/dialogs/',
                    picture: 'http://fbrell.com/f8.jpg',
                    caption: 'Reference Documentation',
                    description: 'Dialogs provide a simple, consistent interface for applications to interface with users.'
                  };
            
            FB.ui(params, function(obj) { console.log(obj);});*/
		}) 
     
                
	}

	this._set = function ($obj){

		obj = $obj;
		img.src = 'img/fotos_header_ofertas/' + $obj.row.ofertas_header_img;
		$(img).css('width', app.ancho-40);

		$(titulo_txt).html($obj.row.ofertas_nombre);
		$(holder_data).empty();
		
		addRegistro('Descuento', $obj.row.ofertas_descuento)
		addRegistro('Cuotas', $obj.row.ofertas_cutoas)
		addRegistro('Dias de descuento', $obj.row.ofertas_dias)
		addRegistro('Telefono', '<a href="tel:' + $obj.row.ofertas_tel + '">' + $obj.row.ofertas_tel + "</a>")
		addRegistro('Dirección', $obj.row.ofertas_dir)
		addRegistro('Observaciones', $obj.row.ofertas_desc)

	  	try{
	        is.scrollTo(0, 0, 0);
	        }catch(e){}
		setTimeout(function(){  
			if(!scroll_set){
					scroll_set = true;
					is =  new iScroll('UnaOferta_holder', {hScrollbar: false, vScrollbar: false});
			}else{
					is.refresh()
			}
			is.scrollTo(0, 0, 0);
		}, 0)


		setTimeout(function(){  
			is.refresh()
			
		}, 300)



	}

}

