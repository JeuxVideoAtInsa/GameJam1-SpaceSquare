Crafty.c("Cell", {
	position: null,

	init: function() {

		this.requires("2D, Canvas, SpriteAnimation, Collision");
		this.w = OS.config.tile.width;
		this.h = OS.config.tile.height;
		this.position = new Object();
		this.position.x = 0;
		this.position.y = 0;
		this.origin("middle middle");
		this.collision(
			new Crafty.polygon([0,0], [0,OS.config.tile.height], [OS.config.tile.width,OS.config.tile.height], [OS.config.tile.width,0])
		);
		return this;
	},

	cell: function(x, y) {
		this.position.x = x*this.w;
		this.position.y = y*this.h;
		this.x = this.position.x;
		this.y = this.position.y;
		
		this.animate("blink",[[0,0],[1,0]]);
		this.animate("blink", OS.config.animation.tile.update,-1);
		
		return this;
	},
	
	applyTransform: function(x, y, w, h, angle, cosinus, sinus) {
		
		this.rotation = angle;
		
		var xd = this.position.x-w/2;
		var yd = this.position.y-h/2;
		
		this.x = xd*cosinus - yd*sinus + x;
		this.y = xd*sinus + yd*cosinus + y;
		//console.log(this.pos.x + " " + this.pos.y + " - " + this.x + " " + this.y);
	}
	
});
