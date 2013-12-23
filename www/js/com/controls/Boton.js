function Boton($html, $callback, $className){
	var self = this
	this.main = document.createElement('div');
	
	if(typeof( $className) =='undefined')
		this.main.className = 'Boton';
	else
		this.main.className = $className;

	$(this.main).html($html)
	$(this.main).css("cursor", "pointer");

	var habil = true;

	if(app.es_touch()){

		this.main.addEventListener("touchend", do_click);
		this.main.addEventListener("touchend", do_mouseout);
		this.main.addEventListener("touchstart", do_mouseover);

	}else{

		this.main.addEventListener("click", do_click);
		this.main.addEventListener("mouseout", do_mouseout);
		this.main.addEventListener("mouseover", do_mouseover);
		
	}

	this.habil = function($b){
		
		habil =  $b
		
		if($b) {
			$(this.main).css("cursor", "pointer");
			$(this.main).css({ opacity: 1 });
		}
		else{
		   $(this.main).css("cursor", "default");
		   $(this.main).css({ opacity: .3 });
		}

	}


	function do_click(){
	
		if(habil) $callback();
		document.activeElement.blur();
		$("input").blur();
	}
	
	function do_mouseover(){
	
		$(self.main).transition({opacity:.5}, .2);
		
	}
	
	function do_mouseout(){

		$(self.main).transition({opacity:1}, .2);
	}

	this.getValor = function(){

		return $(this.main).val()

	}

}