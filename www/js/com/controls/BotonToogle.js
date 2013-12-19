function BotonToogle($img, $txt,$value, $img_w, $img_h, $callback){

	var self = this
	this.main = document.createElement('div');
	this.main.className = '_BotonToogle'

	$(this.main).css("cursor", "pointer");
	$(this.main).css("background-image", "url("+$img+")");
	$(this.main).css("background-size", ($img_w)+"px "+($img_h)+"px");

	$(this.main).css("width", $img_w);
	$(this.main).css("height", $img_h/2); 
	$(this.main).css("cursor", "pointer");

	var habil = true;
	var Selected = false;
	var value = $value
	var txt  = document.createElement('div');
	txt.className = '_BotonToogle_txt'
	$(txt).html($txt)

	$(this.main).append(txt)
	$(document).bind("SELECT_FILTER", select_filter);
	
	if(app.es_touch()){

		$(this.main).bind("touchstart", do_click);
		/*$(this.main).bind("touchend", do_mouseout);
		$(this.main).bind("touchstart", do_mouseover);*/

	}else{

		$(this.main).bind("click", do_click);
		// $(this.main).bind("mouseout", do_mouseout);
		// $(this.main).bind("mouseover", do_mouseover);
		
	}

	function  select_filter(e){

		if(e.value == value){
			Selected = true;
		}else{
			Selected = false;
		}
		
		if(Selected) $(self.main).css("background-position", '0px ' + ($img_h/2) + 'px');
		else		 $(self.main).css("background-position", '0px 0px');
	}

	this.setSelected = function ($Selected){
		
		Selected = $Selected;
		
		  var _event = jQuery.Event("SELECT_FILTER");
               _event.value = value;
               $(document).trigger(_event);
	}

	this.getSelected = function (){

		return Selected;
		
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
		self.setSelected(true)
		if(habil) $callback(value);

		
		
	}
	
	function do_mouseover(){
		//if(habil)
			//$(self.main).css("background-position", '0px '+($img_h/2)+'px');
	}
	
	function do_mouseout(){
		
		//if(habil)
			//$(self.main).css("background-position", '0px 0px');
		
	}

	this.getValor = function(){

		return $(this.main).val()

	}

}