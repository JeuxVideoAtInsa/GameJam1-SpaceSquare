var debugging = true;

function debug(str) {
	if(debugging) console.log(str);
}

window.onload = function() {
	Crafty.init(860, 860, 60);
	
	Crafty.sprite(15, "resources/img/tiles/simple_tile.png", {
			tile1: [0, 0]
		});
	
	Crafty.scene("loading", function () {
	
		Crafty.load(["resources/img/tiles/simple_tile.png"], function () {
			Crafty.scene("main");
		});

	});
	
	Crafty.scene("main", function (e) {
		debug("main scene");
		var pl = Crafty.e("World").world(430, 430, 600, 600);
		
	});
	
	Crafty.scene("loading");
	
	
}
