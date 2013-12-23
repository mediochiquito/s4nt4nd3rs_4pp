function UnEvento()
{
	var self = this;
	this.main =  document.createElement('div')
	this.main.id = 'UnEvento';
	
	setTimeout(_construct, 0);
	
	function _construct() {
		

	}




	this._set = function ($obj){

		alert($obj.row.eventos_id)

	}

}

