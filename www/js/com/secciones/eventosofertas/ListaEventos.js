function ListaEventos()
{
	
	var self = this
	this.main = document.createElement('div')
	this.main.id = 'ListaEventos';
	
	
	this.listar =  function (){

		app.db.transaction(function (tx) {
			tx.executeSql("SELECT * FROM eventos ORDER BY eventos_nombre ASC" , [], function (tx, resultado) {
		    	
		    	var cant_eventos = resultado.rows.length;
		        for(var i=0; i<cant_eventos; i++){
					
					var _ItemListaEvento = new ItemListaEvento(resultado.rows.item(i));
					$(self.main).append(_ItemListaEvento.main)
		          
		        }
		    })
		});

	}



}

