function ListaEventos()
{
	
	var self = this
	this.main = document.createElement('div')
	this.main.id = 'ListaEventos';
	

	
	this.listar =  function ($busqueda){

		var where = ' WHERE eventos_estado=1 ';
		if($busqueda != ''){
			where = ' WHERE (eventos_nombre LIKE "%' + $busqueda + '%" OR eventos_tags LIKE "%' + $busqueda + '%") AND eventos_estado=1 ';
		}


		$(this.main).empty();
		app.db.transaction(function (tx) {

			tx.executeSql("SELECT * FROM eventos "+where+" ORDER BY eventos_nombre ASC" , [], function (tx, resultado) {
		    	
		    	var cant_eventos = resultado.rows.length;

		    	if(cant_eventos == 0) $(self.main).html('<div class="sin_resultados"><div>La busqueda no ha arrojado ningun resultado en eventos.</div></div>')
		        for(var i=0; i<cant_eventos; i++){
					
					var _ItemListaEvento = new ItemListaEvento(resultado.rows.item(i));
					$(self.main).append(_ItemListaEvento.main)
		          
		        }
		    })
		});

	}



}

