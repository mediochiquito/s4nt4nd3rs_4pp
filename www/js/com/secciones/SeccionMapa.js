function SeccionFoto()
{
	  	var self = this
	  	this.main.id = 'SeccionFoto';
	    this.ocultar(0);
		var _canvas_export ;
	/*	var canvas_export = document.createElement('canvas')
			canvas_export.id = 'canvas_export' */
		var canvas_foto = document.createElement('canvas')
		var _canvas_export_thumb;


		//var contexto_canvas_export = canvas_export.getContext("2d");
		var contexto_canvas_foto = 	 canvas_foto.getContext("2d");
		
		var tolerancia = 150;
		var control_tolerancia;
		var _CanvasSaver;
		var uri_foto
		var fondo_selected
	  	var footer;
		var caman;
		
		var filters = new Array(['Ninguno', 'none' ], 
								['edges','edges'], 
								['desaturate','desaturate'], 
								['sepia','sepia'], 
								['emboss','emboss']

								)
		var filtro_seleccionado = 'none'
		__construct();
	
		function __construct(){
		
			
			for(var i=0;i < filters.length;i++){

				var _BotonToogle = new BotonToogle('img/foto/btn_toogle_filter.png', filters[i][0],filters[i][1], 98, 100, function ($value){

					filtro_seleccionado	= $value
					mostrar_fondo_con_foto()

				})
			
				$(_BotonToogle.main).css({top: (55*i)+215})
				$(self.main).append(_BotonToogle.main);
				if(i==0) _BotonToogle.setSelected(true)
			}

	        canvas_foto.width =	800;
	      	canvas_foto.height = 600;

	      	  _canvas_export = document.createElement('canvas')
   			    _canvas_export.width = 800
	       		_canvas_export.height = 600
				_canvas_export.className = 'canvas_export'
				_canvas_export.id = 'canvas_export'

				_canvas_export_thumb = document.createElement('canvas')
   			    _canvas_export_thumb.width = 176
	       		_canvas_export_thumb.height = 132
				_canvas_export_thumb.className = 'canvas_export_thumb'
				_canvas_export_thumb.id = 'canvas_export_thumb'


	        $(self.main).append(_canvas_export);
	        $(self.main).append(_canvas_export_thumb);
	     	 
	        var btn_volver = new Boton('img/foto/btn_volver.png', volver)
	        btn_volver.main.id = 'btn_volver'
	        $(self.main).append(btn_volver.main);
			
	        // agrego boton enviar
	        var btn_continuar = new Boton('img/foto/btn_continuar.png',  enviar)
	        btn_continuar.main.id = 'btn_continuar'
	        $(self.main).append(btn_continuar.main);
	       

			var btn_menos = new Boton('img/foto/btn_menos.png',  menos)
			btn_menos.main.id = 'btn_menos'
		    $(self.main).append(btn_menos.main);

			var btn_mas = new Boton('img/foto/btn_mas.png',  mas)
			btn_mas.main.id = 'btn_mas'
			$(self.main).append(btn_mas.main);

	       	footer = new Image()
	       	footer.src = 'img/footer.png'
		}

		function menos(){
			cambiar_tolerancia(5)
		}


		function mas(){
			 cambiar_tolerancia(-5)
		}

		this._set = function(obj){

			if(typeof obj != 'undefined'){
				fondo_selected = obj.fondo_selected;
				uri_foto = obj.uri_foto;
			}

			mostrar_fondo_con_foto()
		}
		
		function volver(){
			app.secciones.go(app.secciones.seccioninicio)	
		}

		function enviar(){
			
			/*window.canvas2ImagePlugin.saveImageDataToLibrary(
	        function(msg){
	            console.log(msg);
	        },
	        function(err){
	            console.log(err);
	        },
	        document.getElementById('canvas_export')
	   	   );
*/			

			app.archivo_base64 =  document.getElementById('canvas_export').toDataURL("image/png;base64");
			app.cargando(true, 'Guardando foto...')
			var d = new Date();
			app.archivo =  d.getTime().toString();
			guardarCanvas(app.archivo + "_thumb.txt", document.getElementById('canvas_export_thumb').toDataURL("image/png;base64"), false);
			guardarCanvas(app.archivo + ".txt", document.getElementById('canvas_export').toDataURL("image/png;base64"), true);
			
		}

		function guardarCanvas($file_name, $img64, $redirect){
				
				try{

					app.directory.getFile($file_name, {create: true, exclusive: false}, function (fileEntry) {
		    
					    fileEntry.createWriter(function gotFileWriter(writer) {
								   
								    writer.onwriteend = function(evt) {

								    	if($redirect){
								    		app.secciones.go(app.secciones.seccionregistro)
								    		app.cargando(false);
								    	}

								    };

								    writer.write($img64.substr(22));
								}
						, onError);

					}, onError); 

				}catch(e){
					if($redirect){
						app.cargando(false)
						alert('No se creo el archivo')
						app.secciones.go(app.secciones.seccionregistro)
					}
				}
		}

		function gotFileEntry(fileEntry) {
		    
		    fileEntry.createWriter(gotFileWriter, onError);

		}

		function gotFileWriter(writer) {
		    writer.onwriteend = function(evt) {

		    
		     	app.secciones.go(app.secciones.seccionregistro)
		     	app.cargando(false);
		    };
		    writer.write(app.archivo_base64.substr(22));
		}


		function onError(){}

		function cambiar_tolerancia($incr){

            tolerancia = tolerancia + $incr
            mostrar_fondo_con_foto(true)

   		}
   		
   		function mostrar_fondo_con_foto($cambiando_tolereancia){
   				
   				app.cargando(true, 'Procesando...')
		
		/*
   				try{ 
   					$(_canvas_export).remove()
   				}catch(e){}*/
   			  
		    
		/*		Caman(_canvas_export ,  "img/" + fondo_selected + ".jpg", function () {
	 								
	 								caman =  this;
		                      
		                        	this['sinCity']().render(function(){

		                        		_canvas_export.getContext('2d').drawImage(footer,  0, 600-159, 800, 159);	

		                        		$(self.main).append(_canvas_export);
							 			$(_canvas_export).transition({opacity:1});

							 			app.cargando(false);
		                        	});
	
				});

		*/
			setTimeout(function(){
                var img_bg = new Image();
                img_bg.onload = function(){
                        
                        var tmp_img = new Image();
                        tmp_img.onload = function(){

                                var ancho_foto;
                                var alto_foto =  tmp_img.height
                                if(tmp_img.height > 600) alto_foto =600;
                                ancho_foto = (tmp_img.width*alto_foto)/tmp_img.height

                                var resto_ancho = (ancho_foto-800)

                                _canvas_export.getContext('2d').drawImage(tmp_img, 0, 0 , ancho_foto+resto_ancho,  tmp_img.height, -resto_ancho , 0, 800+resto_ancho , 600);
                               
                                var pixels = _canvas_export.getContext('2d').getImageData(0, 0,  800, 600);
                                var un_pixels = _canvas_export.getContext('2d').getImageData(50, 50,  1, 1);
                                var cant_pixels = pixels.data.length;
                           		
                                for(var i = 0; i < cant_pixels; i += 4){

	                                var r = pixels.data[i];
	                                var g = pixels.data[i+1];
	                                var b = pixels.data[i+2];
	           
	                                var diff = Math.abs(pixels.data[i] - un_pixels.data[0]) + Math.abs(pixels.data[i+1] - un_pixels.data[1]) + Math.abs(pixels.data[i+2] - un_pixels.data[2])
	                                
	                                if(diff<tolerancia){
	                                     
	                                    var alpha = (diff)/tolerancia ;
	                                    pixels.data[i+0] = alpha;
	                                    pixels.data[i+1] = alpha;
	                                    pixels.data[i+2] = alpha;
	                                    pixels.data[i+3] = alpha;

	                                }

								
	                      		}


							contexto_canvas_foto.clearRect(0, 0, 800, 600);
							contexto_canvas_foto.putImageData(pixels, 0, 0);         
		                    document.getElementById('canvas_export').getContext('2d').drawImage(img_bg, 0, 0, 800, 600); 
		                    document.getElementById('canvas_export').getContext('2d').drawImage(canvas_foto, 0, 0, 800, 600);	

						//$(_canvas_export).transition({opacity:0}, 0);
							
							if(filtro_seleccionado != 'none'){
									
	 							/*Caman(_canvas_export , function () {
	 								
	 								caman =  this;
		                      
		                        	this[filtro_seleccionado]().render(function(){

		                        		_canvas_export.getContext('2d').drawImage(footer,  0, 600-159, 800, 159);	

		                        		$(self.main).append(_canvas_export);
							 			$(_canvas_export).transition({opacity:1});

							 			app.cargando(false);
		                        	});
	
								});*/

								/*$(self.main).append(_canvas_export);
							 	$(_canvas_export).transition({opacity:1});*/
							 

							 		Pixastic.process(document.getElementById('canvas_export'), filtro_seleccionado, {density:5, radius:15, amount:20});
									document.getElementById('canvas_export').getContext('2d').drawImage(footer,  0, 600-159, 800, 159);	
								 	app.cargando(false);

							
								
							

							}else{

								
								document.getElementById('canvas_export').getContext('2d').drawImage(footer,  0, 600-159, 800, 159);	
							/*	$(self.main).append(_canvas_export);
							 	$(_canvas_export).transition({opacity:1});*/
							 	app.cargando(false);

							}	
					//setTimeout(function(){
						document.getElementById('canvas_export_thumb').getContext('2d').drawImage(document.getElementById('canvas_export'),0, 0, 800, 600,0,0,176, 132 ); 
   							
					//}, 111)
						    

                        }

                        tmp_img.src = uri_foto;

                        
                }

                img_bg.src = "img/" + fondo_selected + ".jpg";
                

            }, 100)
        }

	
}

SeccionFoto.prototype = new Base_Seccion();
