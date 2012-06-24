function createSpaceman(health, weight, initialSpeed, maxSpeed, numberJumpMax, player, position, size) {
	return Crafty.e("Spaceman, astronaut").Character(health, weight, initialSpeed, maxSpeed, numberJumpMax, player, position, size).spaceman();
}


Crafty.c("Spaceman", {

	oldDir:{x:0, y:0},

	init : function() {
		this.requires("2D, Canvas, SpriteAnimation, Character");
		this.w = OS.config.characters.astronaut.width;
		this.h = OS.config.characters.astronaut.height;
		this.position = new Object();
		this.position.x = 0;
		this.position.y = 0;
		this.origin("middle middle");
		this._speed = OS.config.characters.astronaut.speed;
		return this;
	},
	
	spaceman: function() {
		this.animate("spawn_left", [[0,0]]);
		this.animate("spawn_right", [[0,1]]);
		this.animate("walk_left", [[0,0],[1,0],[2,0],[3,0]]);
		this.animate("walk_right", [[0,1],[1,1],[2,1],[3,1]]);
		
		this.bind("NewDirection", function(newDir) {

			
			if (newDir.x < 0) {
				this.stop().animate("walk_left", OS.config.animation.characters.astronaut.walk,-1);
				this.oldDir.x = newDir.x;
			} else if (newDir.x > 0) {
				this.stop().animate("walk_right", OS.config.animation.characters.astronaut.walk,-1);
				this.oldDir.x = newDir.x;
			} else {
				if (this.oldDir.x < 0) {
					this.stop().animate("spawn_left", OS.config.animation.characters.astronaut.walk,1);
				} else if (this.oldDir.x > 0) {
					this.stop().animate("spawn_right", OS.config.animation.characters.astronaut.walk,1);
				}
				
			}
		
		});
		
		return this;
	},

});
