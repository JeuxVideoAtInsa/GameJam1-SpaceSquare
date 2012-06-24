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
				
				var curCells = [];
				for (var i = 0; i<tiles.length; i++) {
					var cell = Crafty.e("Cell, tile1")
						.cell(tiles[i][0], tiles[i][1]);
					if(curCells.length == 0) {
						curCells.push(cell);
					} else {
						var last = curCells[curCells.length-1];
						if(last.x == (cell.x-cell.w) && last.y == cell.y) {
							curCells.push(cell);
						} else if(curCells.length === 1) {
							self.cells.push(last);
							curCells = [];
							curCells.push(cell);
						} else {
							self.cells.push(Crafty.e("Structure")
								.structure(curCells[0].x/curCells[0].w, curCells[0].y/curCells[0].h, curCells.length, 1)
								.addCells(curCells));
							curCells = [];
							curCells.push(cell);
						}
					}
				}
				if(curCells.length === 1) {
					self.cells.push(cell);
					curCells = [];
				} else if(curCells.length > 1) {
					self.cells.push(Crafty.e("Structure")
						.structure(curCells[0].x/curCells[0].w, curCells[0].y/curCells[0].h, curCells.length, 1)
						.addCells(curCells));
					curCells = [];
					curCells.push(cell);
				}
			},
			url: 'resources/maps/json/space.json'
		});
		
		// Add monsters (TEST)
		var monsters = [];
		monsters.push(Crafty.e("Monster, monster").monster(400, 210, AI_STUPID));
		monsters.push(Crafty.e("Monster, monster").monster(200, 450, AI_STUPID));
		monsters.push(Crafty.e("Monster, monster").monster(300, 56, AI_STUPID));
		
		
		//this.rotate(90);
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
			this.angle = r.endingAngle;
			this.applyTransform();
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
