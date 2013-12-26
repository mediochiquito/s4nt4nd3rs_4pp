function ListaEventos()
{
	
	var self = this
	this.main = document.createElement('div')
	this.main.id = 'ListaEventos';
	

	var holder = document.createElement('div')
	holder.id = 'ListaEventos_holder'
	holder.className = 'Tabs_holder'
	$(holder).append('<div></div>')
	$(this.main).append(holder)

	$(holder).css({width: app.ancho-40, height: app.alto-200});

	var is ;
	var scroll_set =  false

	$(document).bind('LISTAR_EVENTOS', do_LISTAR_EVENTOS);

	
	function do_LISTAR_EVENTOS(){

		self.listar('');

	}
	this.listar =  function ($busqueda){

		var where = ' WHERE eventos_estado=1 ';
		if($busqueda != ''){
			where = ' WHERE (eventos_nombre LIKE "%' + $busqueda + '%" OR eventos_tags LIKE "%' + $busqueda + '%") AND eventos_estado=1 ';
		}


		$(holder).find('>div').empty();

		app.db.transaction(function (tx) {

			tx.executeSql("SELECT * FROM eventos "+where+" ORDER BY eventos_nombre ASC" , [], function (tx, resultado) {
		    	
		    	var cant_eventos = resultado.rows.length;
		    	if(cant_eventos == 0){
		    		$(holder).find('>div').html('<div class="sin_resultados"><div>La busqueda no ha arrojado ningun resultado en eventos.</div></div>')
		    		setTimeout(function(){
			        	$(holder).find('>div').css('height', 50)
			        },100)
		    	}else{

		    		setTimeout(function(){
			        	$(holder).find('>div').css('height', '')
			        },100);
			        
		    	}

		        for(var i=0; i<cant_eventos; i++){
					
					var _ItemListaEvento = new ItemListaEvento(resultado.rows.item(i));
					$(holder).find('>div').append(_ItemListaEvento.main)
		          
		        }

				setTimeout(function(){  
					if(!scroll_set){
							scroll_set = true;
							is =  new iScroll('ListaEventos_holder', {hScrollbar: false, vScrollbar: false});
					}else{
							is.refresh()
					}
					is.scrollTo(0, 0, 0);
		   		}, 0)


		    })
		});

	}

}

