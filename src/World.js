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
		

		
		this.rotate(360, 10000);
		return this;
	},
	
	rotate: function(degree, dur) {
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
					if (this.cells[i].cells) {
						for (var j in this.cells[i].cells) {
							this.cells[i].cells[j].x = Math.round(this.cells[i].x);
							this.cells[i].cells[j].y = Math.round(this.cells[i].y);
							this.cells[i].cells[j].w = Math.round(this.cells[i].w);
							this.cells[i].cells[j].h = Math.round(this.cells[i].h);
							this.cells[i].cells[j]._mbr = null;
						}
					}
					this.cells[i].x = Math.round(this.cells[i].x);
					this.cells[i].y = Math.round(this.cells[i].y);
					this.cells[i].w = Math.round(this.cells[i].w);
					this.cells[i].h = Math.round(this.cells[i].h);
					this.cells[i]._mbr = null;
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
