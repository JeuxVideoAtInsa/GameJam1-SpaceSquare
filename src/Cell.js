Crafty.c("Cell", {

	init: function() {
		this.requires("2D, Canvas, SpriteAnimation");
		this.w = 15;
		this.h = 15;
		this.position = new Object();
		this.position.x = 0;
		this.position.y = 0;
		this.origin("middle middle");
		
		return this;
	},

	cell: function(x, y) {
		this.position.x = x*this.w;
		this.position.y = y*this.h;
		this.x = this.position.x;
		this.y = this.position.y;
		
		this.animate("blink",[[0,0],[1,0]])
		  .bind("EnterFrame", this.updateTile);
		
		
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
	},
	
	updateTile: function() {
		this.animate("blink", 15);
		
	}
	
});
