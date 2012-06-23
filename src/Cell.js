Crafty.c("Cell", {

	init: function() {
		this.requires('2D, Canvas, Color, Collision');
		this.w = 20;
		this.h = 20;
		this.position = new Object();
		this.position.x = 0;
		this.position.y = 0;
		this.color("#FF00FF");
		this.origin("middle middle");
		this.collision(
			new Crafty.polygon([0,0], [0,20], [20,20], [0,20])
		);
		return this;
	},

	cell: function(x, y) {
		this.position.x = x*this.w;
		this.position.y = y*this.h;
		this.x = this.position.x;
		this.y = this.position.y;
		return this;
	},
	
	applyTransform: function(x, y, w, h, angle, cosinus, sinus) {
		this.rotation = angle;
		
		angle = Math.PI*angle/180;//+initAngle;
		var xd = this.position.x-w/2;
		var yd = this.position.y-h/2;
		
		this.x = xd*cosinus - yd*sinus + x;
		this.y = xd*sinus + yd*cosinus + y;
		//console.log(this.pos.x + " " + this.pos.y + " - " + this.x + " " + this.y);
	}
	
});
