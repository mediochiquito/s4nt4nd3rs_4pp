function FormSubirEvento()
{
	var self = this;
	this.main = document.createElement('div')
	this.main.id = 'FormSubirEvento';

var holder = document.createElement('div')
	holder.id = 'FormSubirEvento_holder'
	holder.className = 'Tabs_holder'
	$(holder).append('<div></div>')
	$(this.main).append(holder)

	$(holder).css({width: app.ancho-40, height: app.alto-120});


	$(holder).append('<div id="FormSubirEvento_prox">PROXIMAMENTE (FPO)</div>')
	
}

