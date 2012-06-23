Crafty.c("Cell", {

	init: function() {
		this.requires('2D, Canvas, Color');
		this.w = 15;
		this.h = 15;
		this.position = new Object();
		this.position.x = 0;
		this.position.y = 0;
		this.color("#FF00FF");
		this.origin("middle middle");
		
		return this;
	},

	cell: function(x, y) {
		this.position.x = x*this.w;
		this.position.y = y*this.h;
		this.x = this.position.x;
		this.y = this.position.y;
		console.log(this.position.x);
		return this;
	},
	
	applyTransform: function(x, y, w, h, angle) {
		//this.rotation = angle;
		var coef = this.position.x/this.position.y;
		
		var initAngle = Math.atan(coef);
		angle = Math.PI*angle/180+initAngle;
		var xd = this.position.x-w/2;
		var yd = this.position.y-h/2;
		
		var dist = Math.sqrt(xd*xd + yd*yd);
		
		this.x = dist*Math.cos(angle) + x;
		this.y = dist*Math.sin(angle) + y;
		//console.log(this.pos.x + " " + this.pos.y + " - " + this.x + " " + this.y);
	}
	
});
