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
});
