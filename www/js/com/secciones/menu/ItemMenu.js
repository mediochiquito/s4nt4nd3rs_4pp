function ItemMenu($txt,$icon,$callback){
	
	var self = this
	this.main = document.createElement('div');
	this.main.className = 'ItemMenu';
	
	$(this.main).html($txt)
	$(this.main).css("cursor", "pointer");
	$(this.main).css("width", app.ancho-20);

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
			$(this.main).transition({ opacity: 1 }, 0);
		}
		else{
		   $(this.main).css("cursor", "default");
		   $(this.main).transition({ opacity: .3 }, 0);
		}

	}


	function do_click(){
	
		if(habil) $callback();
		document.activeElement.blur();
		$("input").blur();
	}
	
	function do_mouseover(){
		if(habil)
			$(self.main).transition({opacity:.5}, .2);
		
	}
	
	function do_mouseout(){
		if(habil)
			$(self.main).transition({opacity:1}, .2);
	}



}