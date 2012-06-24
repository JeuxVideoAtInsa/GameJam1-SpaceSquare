var AI_STUPID = 0;
var AI_EASY = 1;
var AI_MEDIUM = 2;
var AI_DRUNK = 3;

Crafty.c("Monster", {

	destX:0,
	destY:0,
	aiLevel:0,
	
	init : function() {
		this.requires("2D, Canvas, SpriteAnimation, Character");
		this.w = OS.config.characters.monster.width;
		this.h = OS.config.characters.monster.height;
		this.position = new Object();
		this.position.x = 0;
		this.position.y = 0;
		this.origin("middle middle");
		
		return this;
	},
	
	monster: function(x,y,aiLevel) {
		this.x = x;
		this.y = y;
		this.aiLevel = aiLevel;
		
		this.bind("EnterFrame", this.moveMonster);
		
		return this;
	},
	
	moveMonster: function() {
		
		if (this.aiLevel == AI_STUPID) {		
			destX = Player._x;
			destY = Player._y;
		
			
		} else if (this.aiLevel == AI_EASY) {
		
		} else if (this.aiLevel == AI_DRUNK) {
			destX = Player._x + Crafty.math.randomInt(-100,100);
			destY = Player._y + Crafty.math.randomInt(-100,100);
				
		} else {
		
		}
		
		var deltaX = destX - this._x;
		var deltaY = destY - this._y;
		var dist = Math.sqrt(deltaX*deltaX+deltaY*deltaY)/OS.config.characters.monster.speed;
		
		this.x += deltaX/dist;
		this.y += deltaY/dist;
		
		
	}
});
