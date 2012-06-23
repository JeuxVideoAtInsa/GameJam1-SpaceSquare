var debugging = true;

function debug(str) {
	if(debugging) console.log(str);
}

window.onload = function() {
	Crafty.init(850, 850, 60);
	
	Crafty.scene("main", function (e) {
		debug("main scene");
		var pl = Crafty.e("World").world(425, 425, 600, 600);
		
	});
	
	Crafty.scene("main");
}
