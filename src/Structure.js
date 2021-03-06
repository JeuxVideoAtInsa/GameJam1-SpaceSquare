function createStructure(x, y, w, h) {
	return Crafty.e("Structure").structure(x, y, w, h)
		// .collision(
			// new Crafty.polygon([0,0], [0,h*OS.config.tile.height], [w*OS.config.tile.width,h*OS.config.tile.height], [w*OS.config.tile.width,0])
		// )
		;
}


Crafty.c("Structure", {
	cells: [],

	init: function() {
		this.requires('2D');
		this.w = OS.config.tile.width;
		this.h = OS.config.tile.height;
		this.z = 1;
		this.position = new Object();
		this.position.x = 0;
		this.position.y = 0;
		this.cells = [];
		this.origin("middle middle");
		
		return this;
	},

	structure: function(x, y, w, h) {
		this.position.x = x*this.w;
		this.position.y = y*this.h;
		this.w *= w;
		this.h *= h;
		this.x = this.position.x;
		this.y = this.position.y;
		return this;
	},
	
	addCells: function(cells) {
		for(var i in cells) {
			this.cells.push(cells[i]);
		}
		return this;
	},
	
	applyTransform: function(x, y, w, h, angle, cosinus, sinus) {
		this.rotation = angle;
		var xd = this.position.x-w/2;
		var yd = this.position.y-h/2;
		
		this.x = xd*cosinus - yd*sinus + x;
		this.y = xd*sinus + yd*cosinus + y;
		
		for(var i in this.cells) {
			this.cells[i].applyTransform(x, y, w, h, angle, cosinus, sinus);
		}
	},
	
});
