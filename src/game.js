var debugging = true;

function debug(str) {
	if(debugging) console.log(str);
}

window.onload = function() {
	Crafty.init(860, 860, 40);
	
	Crafty.scene("main", function (e) {
		debug("main scene");
		var pl = Crafty.e("World").world(430, 430, 600, 600);
		var box = createCharacter(10, 1, [10, 10], [10, 20]);
	});
	
	Crafty.scene("main");
}
