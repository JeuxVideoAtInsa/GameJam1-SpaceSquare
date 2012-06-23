window.onload = function () {
	var STAGE_HEIGHT, STAGE_WIDTH, addBoundaries, addPlayer, getRectangularBound, playerEnterFrame, playerKeyDown, playerKeyUp;
	STAGE_WIDTH = 800;
	STAGE_HEIGHT = 600;
	Crafty.init(STAGE_WIDTH, STAGE_HEIGHT);
	Crafty.canvas.init();
	getRectangularBound = function(positionAndDimensions) {
	var bound;
	bound = Crafty.e("2D, Canvas, Color, Box2D");
	bound.color("#00ff00");
	bound.attr(positionAndDimensions);
	bound.box2d({
		  bodyType: 'static',
		  density: 1.0,
		  friction: 5.0,
		  restitution: 0
	});
	return bound;
	};
	addBoundaries = function() {
	var boundBottom, boundLeft, boundRight, boundUp, platform;
	boundBottom = getRectangularBound({
	  x: 1,
	  y: STAGE_HEIGHT - 1,
	  w: STAGE_WIDTH,
	  h: 1
	});
	boundUp = getRectangularBound({
	  x: 1,
	  y: 1,
	  w: STAGE_WIDTH,
	  h: 1
	});
	boundLeft = getRectangularBound({
	  x: 1,
	  y: 0,
	  w: 1,
	  h: STAGE_HEIGHT
	});
	boundRight = getRectangularBound({
	  x: STAGE_WIDTH - 1,
	  y: 0,
	  w: 1,
	  h: STAGE_HEIGHT
	});
	return platform = getRectangularBound({
	  x: STAGE_WIDTH * 1 / 4,
	  y: STAGE_HEIGHT * 3 / 4,
	  w: STAGE_WIDTH * 1 / 4,
	  h: STAGE_HEIGHT * 1 / 8
	});
	};

	var allowSleep, contactListener, gravityX, gravityY, ptmRatio, world;
	Crafty.box2D.init(gravityX = 0, gravityY = 10, ptmRatio = 32, allowSleep = true);
	Crafty.box2D.showDebugInfo();
	world = Crafty.box2D.world;
	contactListener = new Box2D.Dynamics.b2ContactListener;
	contactListener.BeginContact = function(contact) {
	return console.log('(' + contact.GetFixtureA().GetBody() + ') (' + contact.GetFixtureB().GetBody() + ')');
	};
	world.SetContactListener(contactListener);
	addBoundaries();
	box = createCharacter(10, 1, [10, 10], [10, 20]);
}
	