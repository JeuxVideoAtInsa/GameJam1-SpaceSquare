Crafty.c("World", {
	width: 0,
	height: 0,
	cells: [],
	background : {},
	
	init: function() {
		this.cells = [];

		background = Crafty.e("2D, DOM, bg")
			.attr({ x:0 , y:0, z:-1 });

		return this;
	},
	
	world: function(w, h){
		this.width = w;
		this.height = h;
		
		for(var i=0; i<40; i++) {
		this.cells.push(Crafty.e("Cell")
			.cell(i, 2));
		}
		for(var i=40; i<50; i++) {
		this.cells.push(Crafty.e("Cell")
			.cell(i, i/2));
		}
		this.cells.push(Crafty.e("Cell")
			.cell(3, 2));
		this.cells.push(Crafty.e("Cell")
			.cell(40, 6));

		return this;
	},
});
