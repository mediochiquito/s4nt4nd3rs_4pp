function Boton($text, $callback){
	var self = this
	this.main = document.createElement('div');
	this.main.className = 'Boton'

	$(this.main).html($text)
	$(this.main).css("cursor", "pointer");

	var habil = true;

	if(app.es_touch()){

		$(this.main).bind("touchstart", do_click);
		$(this.main).bind("touchend", do_mouseout);
		$(this.main).bind("touchstart", do_mouseover);

	}else{

		$(this.main).bind("click", do_click);
		$(this.main).bind("mouseout", do_mouseout);
		$(this.main).bind("mouseover", do_mouseover);
		
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
		
	}
	
	function do_mouseover(){

		$(self.main).css("background-color", '#CCC');
		$(self.main).css("color", '#2B2B2B');
	}
	
	function do_mouseout(){

		$(self.main).css("background-color", '#2B2B2B');
		$(self.main).css("color", '#CCC');

	}

	this.getValor = function(){

		return $(this.main).val()

	}

}