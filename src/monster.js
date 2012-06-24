// AI Levels
var AI_STUPID = 0;
var AI_EASY = 1;
var AI_MEDIUM = 2;
var AI_DRUNK = 3;

// States
var RUNNING = 0;
var JUMPING = 1;

Crafty.c("Monster", {

	destX:0,
	destY:0,
	aiLevel:0,
	state: RUNNING,
	
	init : function() {
		this.requires("2D, Canvas, SpriteAnimation, Character");
		this.Character(10, 1, OS.config.characters.monster.speed, OS.config.characters.monster.speed, 1, 0, [0, 0], [OS.config.characters.monster.width, OS.config.characters.monster.height]);
		this.w = OS.config.characters.monster.width;
		this.h = OS.config.characters.monster.height;
		this.position = new Object();
		this.position.x = 0;
		this.position.y = 0;
		this.origin("middle middle");
		this._speed = OS.config.characters.monster.speed;
		// Default weapon
		this.weapons.push(Crafty.e("Weapon"));
		return this;
	},
	
	monster: function(x, y, aiLevel) {
		this.x = x*OS.config.tile.width;
		this.y = y*OS.config.tile.height;
		this.aiLevel = aiLevel;
		
		this.animate("die", [[0,0],[1,0],[2,0]]);
		this.animate("walk", [[0,0],[4,0]]);
		
		this.bind("EnterFrame", this.moveMonster);
		
		return this;
	},
	
	moveMonster: function() {
		
		if (this.aiLevel == AI_STUPID) {		
			destX = Player._x;
			destY = Player._y;
		
			var deltaX = destX - this._x;
			var deltaY = destY - this._y;
			var dist = Math.sqrt(deltaX*deltaX+deltaY*deltaY)/OS.config.characters.monster.speed;
			
			var oldX = this._x;
			var oldY = this._y;
			
			this.x += deltaX/dist;
			
		} else if (this.aiLevel == AI_EASY) {
			
		} else if (this.aiLevel == AI_DRUNK) {
			destX = Crafty.math.randomInt(2,OS.config.scene.width-2);
			destY = Player._y;
				
			var deltaX = destX - this._x;
			var deltaY = destY - this._y;
			var dist = Math.sqrt(deltaX*deltaX+deltaY*deltaY)/OS.config.characters.monster.speed;
			
			if (deltaY < 0 && this.state!=JUMPING) {
				this.jump();
				this.state = JUMPING;
			}
			
			var oldX = this._x;
			var oldY = this._y;
			
			this.x += deltaX/dist;
			this.y += deltaY/dist;
			
		} else {
		
		}
		
		if ((oldX != this._x) || (oldY != this._y)) {
			this.trigger('Moved', { x: oldX, y: oldY });
		}
	},
	
	jump: function(){

			if (this.disableControls) return;
			if (!this._up) {
				var oldY = this._y;
				this.y -= 10*this.initialSpeed.y;
				this._falling = true;
				this.trigger('Moved', { x: this._x, y: oldY });
			}	
	
	}
	
});