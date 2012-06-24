var FRAMERATE = 60;

OS = window.OS || {};

OS.config = {
	canvas: {
		width: 860,
		height: 860
	},
	
	scene: {
		width: 600,
		height: 600
	},
		
	tile: {
		width: 20,
		height: 20
	},
	
	characters: {
		astronaut: {
			width: 20,
			height: 40,
			speed: 20,
			jump: 20
		},
		
		monster: {
			width: 20,
			height: 20,
			speed: 10,
			jump: 10
		}
	},
	
	frameRate: FRAMERATE,
	
	animation: {
		tile: {
			update: FRAMERATE
		}
	}
};
