Crafty.c("Cell", {

	init: function() {
		this.requires('2D, Canvas, Color');
		this.w = 15;
		this.h = 15;
		this.color("#FF00FF");
		
		return this;
	},

	cell: function(x, y) {
		this.x = x*this.w;
		this.y = y*this.h;
		return this;
	},
	
});
