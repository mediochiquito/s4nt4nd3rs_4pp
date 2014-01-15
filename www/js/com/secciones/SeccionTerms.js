function SeccionTerms()
{
	
	this.main.id = 'SeccionTerms';
	this.ocultar(0);
	
	var holder_blanco_secciones = document.createElement('div')
	holder_blanco_secciones.className = 'holder_blanco_secciones'
	$(this.main).append(holder_blanco_secciones)
	$(holder_blanco_secciones).css({	width: app.ancho-20, height: app.alto-60})

	var holder = document.createElement('div')
	holder.id = 'SeccionTerms_holder'
	$(this.main).append(holder);
	$(holder).css({	width: app.ancho-40, height: app.alto-90})
	

	var cargada = false;

	this._set  = function (obj){
		if(!cargada){
			$(holder).append($(app.get_xml_default_db()).find('terms').text())
			cargada = true;

			



			setTimeout(function(){  
				new iScroll('SeccionTerms_holder', {hScrollbar: false, vScrollbar: true});;
			}, 110)
		}
	
	}
	

}

SeccionTerms.prototype = new Base_Seccion();