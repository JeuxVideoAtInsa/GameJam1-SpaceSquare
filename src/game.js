var debugging = true;

function debug(str) {
	if(debugging) console.log(str);
}

window.onload = function() {
	Crafty.init(OS.config.canvas.width, OS.config.canvas.width, OS.config.framerate);
	
	loadSprites();
	
	Crafty.scene("loading", function () {
	
		Crafty.load(["resources/img/tiles/simple_tile.png"], function () {
			Crafty.scene("main");
		});

	});
	
	Crafty.scene("main", function (e) {
		debug("main scene");
		var pl = Crafty.e("World").world(
			OS.config.canvas.width/2, 
			OS.config.canvas.height/2, 
			OS.config.scene.width, 
			OS.config.scene.height);
		var box = createCharacter(10, 1, [10, 10], [10, 20]);
	});
	
	Crafty.scene("loading");
	
	
	function loadSprites() {
	  Crafty.sprite(OS.config.tile.width, "resources/img/tiles/simple_tile.png", {
			tile1: [0, 0]
		});
	}
	
}
