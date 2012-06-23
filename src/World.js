Crafty.c("World", {
	angle: 0,
	cells: [],
	
	init: function() {
		this.cells = [];
		this.angle = 0;
		this.id=0;
			
		this.bind("EnterFrame", function() {
			this.id++;
			if(this.id%2==0) {
				this.angle = (this.angle+0.5)%360;
			
				this.applyTransform();
			}
		});

		return this;
	},
	
	world: function(x, y, w, h){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		
		var tiles = {};
		var self = this;
		
		// Load tiles
		$.ajax({
		  dataType: 'text',
		  success: function(string) {
		      data = $.parseJSON(string);
		      tiles = data.tiles;
		      // console.log(tiles);
		      
		      for (var i = 0; i<tiles.length; i++) {
			self.cells.push(Crafty.e("Cell, tile1")
			      .cell(tiles[i][0], tiles[i][1]));
		      }
		      
		  },
		  url: 'resources/maps/json/space.json'
		});


		return this;
	},
	
	applyTransform: function() {
		var cosinus = Math.cos(this.angle*Math.PI/180);
		var sinus = Math.sin(this.angle*Math.PI/180);
		for(var i in this.cells) {
			this.cells[i].applyTransform(
				this.x,
				this.y,
				this.w,
				this.h,
				this.angle,
				cosinus,
				sinus);
		}
	}
});
