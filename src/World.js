Crafty.c("World", {
	angle: 0,
	cells: [],
	rotation: null,
	monsters: [],
	nbFrames: 0,
	
	init: function() {
		this.requires("2D, Canvas");
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
					var cell = Crafty.e("Cell, block")
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
							self.cells.push(createStructure(curCells[0].x/curCells[0].w, curCells[0].y/curCells[0].h, curCells.length, 1)
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
					self.cells.push(createStructure(curCells[0].x/curCells[0].w, curCells[0].y/curCells[0].h, curCells.length, 1)
						.addCells(curCells));
					curCells = [];
					curCells.push(cell);
				}
			},
			url: 'resources/maps/json/space.json'
		});
		
		// Add monsters (TEST)
		var begin = new Date().getTime();
		this.bind("EnterFrame",  function() {
			
			this.nbFrames++;
			
			if (this.nbFrames%60 == 0) {
				var tempX = Crafty.math.randomInt(2,OS.config.nbTiles-2);
				var tempY = Crafty.math.randomInt(2,OS.config.nbTiles-2);
	
				this.monsters.push(Crafty.e("Monster, monster").monster(tempX, tempY, AI_DRUNK));
			}
			
			if (this.nbFrames >= 10*60) {
				for (var i = 0; i < this.monsters.length; i++) {
					this.monsters[i].kill();
				}
				this.nbFrames = 0;
			}
			
		});
		this.bind('KeyDown', function(e) {
			if(e.key == Crafty.keys['R']) {
				this.rotateWorld(90, 1000);
			}
				
		});
		
		this.rotateWorld(0, 1000);

		return this;
	},
	
	rotateWorld: function(degree, dur) {
		this.rotation = {
			begin: new Date().getTime(),
			duration: dur,
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
			
			this.bind("EnterFrame", function(r) {
				for(var i in this.cells) {
					if(typeof this.cells[i].map !== "undefined") {
						for (var j in this.cells[i].map.points) {
							for (var k in this.cells[i].map.points[j]) {
								this.cells[i].map.points[j][k] = Math.round(this.cells[i].map.points[j][k]);
							}
						}
					}
				}
				this.unbind("EnterFrame");
			});
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
	},
	
	generateWorld: function(angle) {
		
	}
});
