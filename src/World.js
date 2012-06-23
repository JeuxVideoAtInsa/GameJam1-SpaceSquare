Crafty.c("World", {
	angle: 0,
	cells: [],
	
	init: function() {
		this.cells = [];
		this.angle = 0;
			
		this.bind("EnterFrame", function() {
			this.angle = (this.angle+1)%360;
			this.applyTransform();
		});

		return this;
	},
	
	world: function(x, y, w, h){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		
		
		this.cells.push(Crafty.e("Cell")
			.cell(20, 20));
				this.cells.push(Crafty.e("Cell")
			.cell(20, 21));
		for(var i=0; i<40; i++) {
		this.cells.push(Crafty.e("Cell")
			.cell(i, 2));
		}

		return this;
	},
	
	applyTransform: function() {
		for(var i in this.cells) {
			this.cells[i].applyTransform(
				this.x,
				this.y,
				this.w,
				this.h,
				this.angle);
		}
	}
});
