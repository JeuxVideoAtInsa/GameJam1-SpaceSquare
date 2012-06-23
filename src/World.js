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
		
		var tiles = {};
		
		// Load tiles
		$.ajax({
		  dataType: 'text',
		  success: function(string) {
		      data = $.parseJSON(string);
		      tiles = data.tiles;
		      
		      for (var i = 0; i<tiles.length; i++) {
			Crafty.e("World").cells.push(Crafty.e("Cell")
			      .cell(tiles[i][0], tiles[i][1]));
		      }
		      		      
		  },
		  url: 'resources/maps/json/space.json'
		});

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
