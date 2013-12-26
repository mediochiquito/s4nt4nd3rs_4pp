
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

	var btn_volver = new Boton2Frames("img/btn_volver.svg", 25, 50, doVolver)
	btn_volver.main.id = 'UnEvento_btn_volver'
	$(header_titulo).append(btn_volver.main)

	var btn_ver_en_mapa = new Boton2Frames("img/eventos/marker_lineas.svg", 25, 50, doVerEnMapa)
	btn_ver_en_mapa.main.id = 'UnEvento_btn_ver_en_mapa'
	$(header_titulo).append(btn_ver_en_mapa.main)


 	$(holder_participaciones).append('<div id="UnEvento_txt_tambien_participan">También participan de este Evento:</div><div id="UnEvento_holder_usuarios_fb"></div>')
 	$(holder).find('>div').append(holder_participaciones)

	var is;
	var scroll_set =  false;
	var obj;

	function doVolver(){

		app.secciones.go(app.secciones.seccioneventosofertas, 300, {solapa: 'eventos'});

	}
	function doVerEnMapa(){

		app.secciones.go(app.secciones.seccionmapa, 300, {solo_ver:'eventos', center:[obj.row.eventos_lat, obj.row.eventos_lon]});


	}
	
	function addRegistro($label, $data){

		$(holder_data).append('<div class="UnEvento_reg"><div class="UnEvento_label">'+ $label+
							  '</div><div class="UnEvento_data" style="width: ' + (app.ancho-150) + 'px">'+ $data+
							  '</div><br style="clear:both"></div>');

	}

	function doParticipar(){
		
		if(!app.hay_internet()) {
			app.alerta('Debes conectarte a internet para marcar la participación.')
			return;
		}
			
		app._Facebook.conectar(function(){

			participo_de_este_evento(function($bool){

				if($bool) {

					app.alerta('Ya estás participando de este evento.')
					return;

				}else{

					app.cargando(true, 'Enviando participacion...')
					$.ajax({

		                type: "POST",
		                url: app.server + "set_participar.php",
		                dataType: 'text',
		                cache: false, 

		                data:{id_evento: obj.row.eventos_id, uid: app.usuario.uid},

		                success: function($data) {
		                	if($data == '1'){
		                		app.db.transaction(function (tx) {

									tx.executeSql('INSERT INTO participaciones (participaciones_id_evento, participaciones_uid) VALUES (?,?)', 
												  [String(obj.row.eventos_id), String(app.usuario.uid)]
												  );

									 app.cargando(false);
									 
								},  app.db_errorGeneral);
		    
		                	}else{
		                		app.alerta($data)
		                		 app.cargando(false)
		                	}
		                	
		                	
		                },
		                error: function(){ 
		                    app.cargando(false)
		                }
			        });


				}

			})

	  		
		}) 
		       

	}


	function participo_de_este_evento($callback){
		
		app.db.transaction(function (tx) {
			
			tx.executeSql("SELECT * FROM participaciones WHERE participaciones_id_evento="+obj.row.eventos_id+" AND participaciones_uid="+app.usuario.uid+"" , [], function (tx, resultado) {
		    	
		    	if(resultado.rows.length > 0){

		    		$callback(true);

		    	}else{

		    		$callback(false);

		    	}

		    });

		},  app.db_errorGeneral);

	}


	function doCompartir(){
		
		
		app._Facebook.conectar(function(){

	  		var params = {
	            method: 'feed',
	            name: obj.row.eventos_nombre,
	           	link: 'http://www.google.com',
	            picture: 'http://fbrell.com/f8.jpg',
	            caption: obj.row.eventos_lugar,
	            description: obj.row.eventos_desc
	        };

	       FB.ui(params, function(obj) { console.log(obj);});

		}) 
     
                
	}

	this._set = function ($obj){
		obj = $obj;
		img.src = 'img/fotos_header_eventos/' + $obj.row.eventos_categoria_id + '.jpg';
		$(img).css('width', app.ancho-40);

		$(titulo_txt).html($obj.row.eventos_nombre);
		$(holder_data).empty()
		
		addRegistro('Categoria', app.categorias_eventos[$obj.row.eventos_categoria_id-1])
		addRegistro('Fecha', $obj.row.eventos_fecha_hora)
		addRegistro('Lugar', $obj.row.eventos_lugar)
		addRegistro('Descripción', $obj.row.eventos_desc)
		
		participo_de_este_evento(function($bool){

			if($bool) btn_participar.habil(false);
			else btn_participar.habil(true);
		})


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

