function Solapa($txt, $value, $color){

	var self = this
	this.main = document.createElement('div');
	this.main.className = 'Solapa'
	$(this.main).css('background-color', $color);

	var txt  = document.createElement('div');
	txt.className = 'Solapa_txt'
	$(txt).html($txt);
	$(this.main).append(txt);

	var value = $value;
	var habil = true;
	var Selected = false;

	if(app.es_touch()){

		$(this.main).bind("touchstart", do_click);
		/*$(this.main).bind("touchend", do_mouseout);
		$(this.main).bind("touchstart", do_mouseover);*/

	}else{

		$(this.main).bind("click", do_click);
		// $(this.main).bind("mouseout", do_mouseout);
		// $(this.main).bind("mouseover", do_mouseover);
		
	}

	this.setSelected = function ($Selected){
		
		Selected = $Selected;
		
		if(Selected){
			$(self.main).css('background-color', $color);
			$(txt).css('color', '#fff');
		}else{
			$(self.main).css('background-color', '#ccc');
			$(txt).css('color', '#999');
		}

		var _event = jQuery.Event("SOLAPA_CLICK");
        _event.value = value;
        $(this.main).trigger(_event);
	}

	function do_click(){
		self.setSelected(true)
		if(habil) $callback(value);
	}
	
}