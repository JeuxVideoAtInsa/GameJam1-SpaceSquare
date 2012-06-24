var debugging = true;

function debug(str) {
	if(debugging) console.log(str);
}


var Player;

window.onload = function() {
	Crafty.init(OS.config.canvas.width, OS.config.canvas.width, OS.config.framerate);
	
	loadSprites();
	
	Crafty.scene("loading", function () {
	
		Crafty.load(
			[
				"resources/img/bg/infinity.png",
				"resources/img/bg/spaceship.png",
				"resources/img/tiles/simple_tile.png",
				"resources/img/monster.png",
				"resources/img/animation/spaceman/moving/moving.png",
				"resources/img/block/blocks.png"
			], function () {
			Crafty.scene("main");
		});

	});
	
	Crafty.scene("main", function (e) {

		var pl = Crafty.e("World, spaceship").world(
			OS.config.canvas.width/2, 
			OS.config.canvas.height/2, 
			OS.config.scene.width, 
			OS.config.scene.height);
		Player = createSpaceman(9000, 1, {x:5, y:18}, {x:10, y:40}, 2, 1, [200, 200], [33, 45]);

	});
	
	Crafty.scene("loading");
	
	
	function loadSprites() {
		Crafty.sprite(OS.config.scene.width, "resources/img/bg/infinity.png", {
			infinity: [0, 0]
		});
		Crafty.sprite(OS.config.scene.width, "resources/img/bg/spaceship.png", {
			spaceship: [0, 0]
		});
		Crafty.sprite(OS.config.tile.width, "resources/img/tiles/simple_tile.png", {
			tile1: [0, 0]
		});
		Crafty.sprite(OS.config.characters.monster.width, OS.config.characters.monster.height, "resources/img/animation/tentacleAlien/monster.png", {
			monster: [0, 0]
		});
		Crafty.sprite(OS.config.characters.astronaut.width, OS.config.characters.astronaut.height, "resources/img/animation/spaceman/moving/moving.png", {
			astronaut: [0, 0]
		});
		Crafty.sprite(OS.config.tile.width, OS.config.tile.height, "resources/img/block/blocks.png", {
			block: [4, 0]
		});
	}
	
}
