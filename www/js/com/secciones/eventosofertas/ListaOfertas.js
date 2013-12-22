function ListaOfertas()
{
	var self = this
	this.main = document.createElement('div')
	this.main.id = 'ListaOfertas';
	
	
	this.listar =  function (){
		$(this.main).empty()
		app.db.transaction(function (tx) {
			tx.executeSql("SELECT * FROM ofertas ORDER BY ofertas_descuento ASC" , [], function (tx, resultado) {
		    	
		    	var cant_ofertas = resultado.rows.length;
		        for(var i=0; i<cant_ofertas; i++){
					
					var _ItemListaOferta = new ItemListaOferta(resultado.rows.item(i));
					$(self.main).append(_ItemListaOferta.main)
		          
		        }
		    })
		});

	}

}

