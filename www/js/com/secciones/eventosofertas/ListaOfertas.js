function ListaOfertas()
{
	var self = this
	this.main = document.createElement('div')
	this.main.id = 'ListaOfertas';
	
	var holder = document.createElement('div')
	holder.id = 'ListaOfertas_holder'
	holder.className = 'Tabs_holder'
	$(holder).append('<div></div>')
	$(this.main).append(holder)

	$(holder).css({width: app.ancho-40, height: app.alto-200});

	var is ;
	var scroll_set =  false

	var btn_ver_en_mapa = new Boton('VER EN MAPA', doVerEnMapa);
	btn_ver_en_mapa.main.id = 'ListaOfertas_btn_ver_en_mapa'
	$(this.main).append(btn_ver_en_mapa.main);

	$(btn_ver_en_mapa.main).css({'margin-left': -70, top: app.alto-75});
	

	function doVerEnMapa(e){

		app.secciones.go(app.secciones.seccionmapa, 300, {solo_ver:'ofertas'})

	}
	
	
	this.listar =  function ($busqueda){
		

		var where = '';
		if($busqueda != ''){
			where = ' WHERE (ofertas_nombre LIKE "%' + $busqueda + '%" OR ofertas_tags LIKE "%' + $busqueda + '%") ';
		}


		$(holder).find('>div').empty()
		app.db.transaction(function (tx) {
			tx.executeSql("SELECT * FROM ofertas "+where+" ORDER BY ofertas_descuento ASC" , [], function (tx, resultado) {
		    	
		    	var cant_ofertas = resultado.rows.length;
		    	if(cant_ofertas == 0){
		    		$(holder).find('>div').html('<div class="sin_resultados"><div>La busqueda no ha arrojado ningun resultado en descuentos.</div></div>')
		    		setTimeout(function(){
			        	$(self.main).css('height', 50)
			        },100)
		    	}else{

		    		setTimeout(function(){
			        	$(holder).find('>div').css('height', '')
			        },100)
		    	}
		        for(var i=0; i<cant_ofertas; i++){
					
					var _ItemListaOferta = new ItemListaOferta(resultado.rows.item(i));
					$(holder).find('>div').append(_ItemListaOferta.main)
		          
		        }


				setTimeout(function(){  
					if(!scroll_set){
							scroll_set = true;
							is =  new iScroll('ListaOfertas_holder', {hScrollbar: false, vScrollbar: false});
					}else{
							is.refresh()
					}
					is.scrollTo(0, 0, 0);
		   		}, 0)

		      

		    })
		});


	}

}

