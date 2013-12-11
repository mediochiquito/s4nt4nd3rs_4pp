function Boton($img,  $callback){

	var self = this
	this.main = document.createElement('div');
	this.main.className = 'Boton'

	$(this.main).css("cursor", "pointer");
	$(this.main).append('<img src="'+$img+'" />');

	$(this.main).css("cursor", "pointer");

	var habil = true;

	if(app.es_touch()){

		$(this.main).bind("touchend", do_mouseout);
		$(this.main).bind("touchend", do_click);
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
		   $(this.main).css({ opacity: .2 });
		}

	}

	function do_click(){
		
		if(habil) $callback();
		
	}
	
	function do_mouseover(){
	if(habil)
			$(self.main).transition({opacity:.5});
	}
	
	function do_mouseout(){
		
		if(habil)
			$(self.main).transition({opacity:1});
	}

	this.getValor = function(){

		return $(this.main).val()

	}

}