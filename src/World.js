Crafty.c("World", {
	angle: 0,
	cells: [],
	rotation: null,
	
	init: function() {
		this.cells = [];
		this.rotation = null,
		this.angle = 0;
		this.id=0;
			
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
			self.cells.push(Crafty.e("Cell")
			      .cell(tiles[i][0], tiles[i][1]));
		      }
		      
		  },
		  url: 'resources/maps/json/space.json'
		});

		this.rotate(90);
		return this;
	},
	
	rotate: function(degree) {
		this.rotation = {
			begin: new Date().getTime(),
			duration: 2000,
			beginAngle: this.angle,
			endingAngle: this.angle+degree,
			cb: function() {
				this.updateRotation();
			}};
		
		this.bind("EnterFrame", this.rotation.cb);
	},
	
	updateRotation: function() {
		var r = this.rotation;
		var t = new Date().getTime();
		this.angle = r.beginAngle + (r.endingAngle - r.beginAngle)*(t-r.begin)/r.duration;
		this.applyTransform();
		
		if(t > r.begin+r.duration) {
			this.unbind("EnterFrame", r.cb);
			delete this.rotation;
		}
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
