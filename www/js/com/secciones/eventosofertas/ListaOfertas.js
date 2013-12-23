function ListaOfertas()
{
	var self = this
	this.main = document.createElement('div')
	this.main.id = 'ListaOfertas';
	
	
	this.listar =  function ($busqueda){
		

		var where = '';
		if($busqueda != ''){
			where = ' WHERE (ofertas_nombre LIKE "%' + $busqueda + '%" OR ofertas_tags LIKE "%' + $busqueda + '%") ';
		}


		$(this.main).empty()
		app.db.transaction(function (tx) {
			tx.executeSql("SELECT * FROM ofertas "+where+" ORDER BY ofertas_descuento ASC" , [], function (tx, resultado) {
		    	
		    	var cant_ofertas = resultado.rows.length;
		    	if(cant_ofertas == 0){
		    		$(self.main).html('<div class="sin_resultados"><div>La busqueda no ha arrojado ningun resultado en descuentos.</div></div>')
		    		setTimeout(function(){
			        	$(self.main).css('height', 50)
			        },100)
		    	}else{

		    		setTimeout(function(){
			        	$(self.main).css('height', '')
			        },100)
		    	}
		        for(var i=0; i<cant_ofertas; i++){
					
					var _ItemListaOferta = new ItemListaOferta(resultado.rows.item(i));
					$(self.main).append(_ItemListaOferta.main)
		          
		        }
		      

		    })
		});


	}

}

