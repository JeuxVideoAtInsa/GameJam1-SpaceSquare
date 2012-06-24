Crafty.c("Monster", {

	destX:0,
	destY:0,

	init : function() {
		this.requires("2D, Canvas, SpriteAnimation");
		this.w = OS.config.characters.monster.width;
		this.h = OS.config.characters.monster.height;
		this.position = new Object();
		this.position.x = 0;
		this.position.y = 0;
		this.origin("middle middle");
		
		return this;
	},
	
	monster: function(x,y) {
		this.x = x;
		this.y = y;
		
		this.bind("EnterFrame", this.moveMonster);
		
		return this;
	},
	
	moveMonster: function() {
		
// 		if () {
// 			return;
// 		}
	
		destX = Player._x;
		destY = Player._y;
	
		var deltaX = destX - this._x;
		var deltaY = destY - this._y;
		
		var dist = Math.sqrt(deltaX*deltaX+deltaY*deltaY);
		
		this.x += deltaX/dist;
		this.y += deltaY/dist;
		
		//console.log(destX, destY);
		
	}
});
