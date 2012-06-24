function createCharacter(health, weight, initialSpeed, maxSpeed, numberJumpMax, player, position, size) {
	return Crafty.e("Character, astronaut").Character(health, weight, initialSpeed, maxSpeed, numberJumpMax, player, position, size);
}


//-----------------------------------------------------------------------------
// Constants
//-----------------------------------------------------------------------------

// Character states :
var CHARACTER_STATE_SPAWNING = 1;
var CHARACTER_STATE_DESTROYING = 2;

// Walking directions :
var CHARACTER_DIR_WEST = 0;
var CHARACTER_DIR_EAST = 1;

//-----------------------------------------------------------------------------
// Globals
//-----------------------------------------------------------------------------

// Character position
var Pos;


//-----------------------------------------------------------------------------
// Character object
//-----------------------------------------------------------------------------

Crafty.c('Character', {

//-----------------------------------------------------------------------------
// Attributes
//-----------------------------------------------------------------------------

	health : 0,
	state : CHARACTER_STATE_SPAWNING,
	maxSpeed : {x:0, y:0},
	numberJump : 0,
	numberJumpMax : 0,
	initialSpeed : {x:0, y:0},
	weapons : [],
	currentWeapon : 0,
	player : 0,
	moving : false,
	skin : null,

//-----------------------------------------------------------------------------
// Init
//-----------------------------------------------------------------------------

	init : function() {
		this.requires('2D, Canvas, Collision, Gravity');
		this.gravity('Cell');
		// this.collisionDepth = 0;
		this.bind('Moved', function(from) {
			// if (this.collisionDepth > OS.config.collision.calculsDepth) {
				// return;
			// }
			var hitted = this.hit('Cell')
			if(hitted){
				var oldX = this._x;
				var oldY = this._y;
				this.x = from.x;
				this.y = from.y;
				// for (var i = 0; i < hitted.length; i++) {
					// var energy = this._gravityConst*this._speed*this._speed;
					// this.x = from.x-energy*hitted[i].normal.x;
					// this.y = from.y+energy*hitted[i].normal.y;
				// }
				// this.collisionDepth++;
				// this.trigger('Moved', { x: oldX, y: oldY });
			}
			else {
				hitted = this.hit('Character')
				if(hitted){
					var oldX = this._x;
					var oldY = this._y;
					this.x = from.x;
					this.y = from.y;
					// for (var i = 0; i < hitted.length; i++) {
						// var energy = hitted[i].obj._gravityConst*hitted[i].obj._speed - this._gravityConst*this._speed;
						// hitted[i].obj.y += energy*hitted[i].normal.y;
						// hitted[i].obj.x -= energy*hitted[i].normal.x;
						// this.x = from.x-energy*hitted[i].normal.x;
						// this.y = from.y+energy*hitted[i].normal.y;
					// }
					// this.collisionDepth++;
					// this.trigger('Moved', { x: oldX, y: oldY });
				}
				// else {
					// this.collisionDepth = 0;
				// }
			}
		});
	},

//-----------------------------------------------------------------------------
// Constructor
//-----------------------------------------------------------------------------

	Character: function (health, weight, initialSpeed, maxSpeed, numberJumpMax, player, position, size) {
		this.player = player;
		this.health = health;
		this.initialSpeed = initialSpeed;
		this.maxSpeed = maxSpeed;
		this.numberJumpMax = numberJumpMax;
		this.gravityConst(weight);
		this.collision(
			new Crafty.polygon([0,0], [0,size[1]], [size[0],size[1]], [0,size[1]])
		);
		
		if (this.player == 1) {
			this.requires('TwowayJ1');
			this.twowayJ1(initialSpeed.x, initialSpeed.y);
		}
		else if (this.player == 2) {
			this.requires('TwowayJ2');
			this.twowayJ2(initialSpeed.x, initialSpeed.y);
		}
	
		this.attr({
			x: position[0],
			y: position[1],
			w: size[0],
			h: size[1]
		});
		
		
		//this.animate("walk_right", [[0, 0],[1,0]]);
		// Setup animation
		// this.animate("spawn", [[12,0],[13,0],[13,0],[14,0],[14,0]])
		// .animate("die", [[14,0],[13,0],[12,0]])
		// .animate("walk_right", [[0,0],[1,0],[0,0],[2,0]])
		// .animate("walk_left", [[3,0],[4,0],[3,0],[5,0]])
		// .animate("walk_up", [[9,0],[10,0],[9,0],[11,0]])
		// .animate("walk_down", [[6,0],[7,0],[6,0],[8,0]])
		// .animate("attack_right", [[15,0], [16,0], [15,0], [17,0]])
		// .animate("attack_left", [[18,0], [19,0], [18,0], [20,0]])
		// .animate("attack_up", [[24,0], [25,0], [24,0], [26,0]])
		// .animate("attack_down", [[21,0], [22,0], [21,0], [23,0]])
		// .onHit("gridBounds", function () {
		// //Move unit out of solid tile
		// });
		//.bind("EnterFrame", this.move);

		return this;
	}
});
