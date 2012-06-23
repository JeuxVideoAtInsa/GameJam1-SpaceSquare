var debugging = true;

function debug(str) {
	if(debugging) console.log(str);
}

window.onload = function() {
	Crafty.init(860, 860, 60);
	
	Crafty.scene("main", function (e) {
		debug("main scene");
		var pl = Crafty.e("World").world(430, 430, 600, 600);
		var box = createCharacter(10, 2, {x:3, y:20}, {x:10, y:40}, 2, 1, [200, 200], [20, 40]);
	});
	
	Crafty.scene("main");
}
