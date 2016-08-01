function Slider(container, nav){
	this.container = container;
	this.nav = nav;
	this.current = 0;
	this.imgWidth = 500;
	this.imgLength=5;
}

Slider.prototype.move = function(){
	this.a = 1;		 
}
Slider.prototype.currentPos = function(dir){
	var pos = this.current;
	pos += ~~(dir === 'next') || -1;
    this.current = ( pos<0 )?this.imgLength : pos % this.imgLength; 
     console.log(this.current);
	
}


var slider = new Slider($("div#slider"), $("#slider-nav"));
slider.nav.find('a').on('click', function(){
	slider.currentPos($(this).data('dir'));
});
