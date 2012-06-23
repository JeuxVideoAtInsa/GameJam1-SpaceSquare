Crafty.c("Monster", {

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
		
		this.bind("EnterFrame", function() {
			this.x+=1;
			this.y+=1;
		
		});
		
		return this;
	},
	
	move: function(destX, destY) {
		
	}


});