
function UnEvento()
{
	var self = this;
	this.main =  document.createElement('div')
	this.main.id = 'UnEvento';
	
	var holder = document.createElement('div')
	holder.id = 'UnEvento_holder'
	holder.className = 'Tabs_holder'
	$(holder).append('<div></div>')
	$(this.main).append(holder)

	$(holder).css({width: app.ancho-40, height: app.alto-120});

	var img = new Image()
	img.id = 'SeccionUnEvento_img'
	$(holder).find('>div').append(img)
	
	var header_titulo =  document.createElement('div')
	header_titulo.id = 'UnEvento_header_titulo'
	$(holder).find('>div').append(header_titulo)
	
	var titulo_txt =  document.createElement('div')
	titulo_txt.id = 'UnEvento_titulo_txt'
	$(header_titulo).append(titulo_txt)

	var holder_data =  document.createElement('div')
	holder_data.id = 'UnEvento_holder_data'
	$(holder).find('>div').append(holder_data)

	var holder_footer =  document.createElement('div')
	holder_footer.id = 'UnEvento_holder_footer'
	$(holder).find('>div').append(holder_footer)

	var btn_compartir = new Boton("<img src='img/fb.svg' width='20' />&nbsp;&nbsp;COMPARTIR", doCompartir, 'BotonAzul')
	btn_compartir.main.id = 'UnEvento_btn_compartir'
	$(holder_footer).append(btn_compartir.main)

	var btn_participar = new Boton("<img src='img/fb.svg' width='20' />&nbsp;&nbsp;PARTICIPAR", doParticipar, 'BotonAzul')
	btn_participar.main.id = 'UnEvento_btn_participar'
	$(holder_footer).append(btn_participar.main)

	var holder_participaciones =  document.createElement('div')
	holder_participaciones.id = 'UnEvento_holder_participaciones'
<<<<<<< HEAD
 	$(holder_participaciones).append('<div id="UnEvento_txt_tambien_participan">También participan de este Evento:</div><div id="UnEvento_holder_usuarios_fb"></div>')
 	$(holder).find('>div').append(holder_participaciones)

	var is ;
	var scroll_set =  false;
	
=======
	$(holder_participaciones).append('<div id="UnEvento_txt_tambien_participan">También participan de este Evento:</div><div id="UnEvento_holder_usuarios_fb"></div>')
	$(this.main).append(holder_participaciones)
>>>>>>> 5f4096a256e72ee7fd24c0eadb1cb06f8aba01c2


	function addRegistro($label, $data){

		$(holder_data).append('<div class="UnEvento_reg"><div class="UnEvento_label">'+ $label+
							  '</div><div class="UnEvento_data" style="width: ' + (app.ancho-150) + 'px">'+ $data+
							  '</div><br style="clear:both"></div>');

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
	
<<<<<<< HEAD
		
		$('#UnEvento_holder_usuarios_fb').empty()
        $('#UnEvento_holder_usuarios_fb').html('<div id="UnEvento_mensaje_participantes">Obteniendo participaciones...</div>')

        try{
        	is.scrollTo(0, 0, 0);
        }catch(e){}

        cargar_participantes($obj)

		setTimeout(function(){  
			if(!scroll_set){
					scroll_set = true;
					is =  new iScroll('UnEvento_holder', {hScrollbar: false, vScrollbar: false});
			}else{
					is.refresh()
			}
			
			}, 0)


	}

	function cargar_participantes($obj){

		 $.ajax({

                type: "POST",
                url: app.server + "json.participaciones.php",
                dataType: 'json',
                cache: false, 
                data:{id_evento: $obj.row.eventos_id},

                success: function($json) {
                		$('#UnEvento_holder_usuarios_fb').html('');
                        for(var i in $json){

                                $('#UnEvento_holder_usuarios_fb').append('<img src="http://graph.facebook.com/'+$json[i].participaciones_uid+'/picture">')

                        }
                        if($json.length == 0) $('#UnEvento_holder_usuarios_fb').html('<div id="UnEvento_mensaje_participantes">Aun no hay participantes en este evento.</div>')

=======
		$('#UnEvento_holder_usuarios_fb').empty()
		$('#UnEvento_holder_usuarios_fb').html('<div id="UnEvento_mensaje_participantes">Obteniendo participaciones...</div>')

		$.ajax({

							type: "POST",
							url: app.server + "json.participaciones.php",
							dataType: 'json',
							cache: false, 
							data:{id_evento: $obj.row.eventos_id},

							success: function($json) {
								for(var i in $json){

									$('#UnEvento_holder_usuarios_fb').append('<img src="http://graph.facebook.com/'+$json[i].participaciones_uid+'/picture">')

								}
								if($json.length == 0) $('#UnEvento_holder_usuarios_fb').html('<div id="UnEvento_mensaje_participantes">Aun no hay participantes en este evento.</div>')


								$('#UnEvento_holder_usuarios_fb').append('<br style="clear:both" />');
								app.secciones.seccioneventosofertas.updateScroll();
							},
							error: function(){ 
								$('#UnEvento_holder_usuarios_fb').html('<div id="UnEvento_mensaje_participantes">Ocurrio un error al obtener los participantes</div>');
								app.secciones.seccioneventosofertas.updateScroll();
							}
						});	
>>>>>>> 5f4096a256e72ee7fd24c0eadb1cb06f8aba01c2

                        $('#UnEvento_holder_usuarios_fb').append('<br style="clear:both" />');
                       	is.refresh()
                },
                error: function(){ 
                        $('#UnEvento_holder_usuarios_fb').html('<div id="UnEvento_mensaje_participantes">Ocurrio un error al obtener los participantes</div>');
                        is.refresh()
                }
        });        
	}



}

