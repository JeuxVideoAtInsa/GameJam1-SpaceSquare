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
			width: 33,
			height: 45,
			speed: 20,
			jump: 20
		},
		
		monster: {
			width: 20,
			height: 20,
			speed: 1,
			jump: 10
		}
	},
	
	collision: {
		calculsDepth : 3
	},
	
	frameRate: FRAMERATE,
	
	animation: {
		tile: {
			update: FRAMERATE
		},
		
		characters: {
		
			astronaut: {
				walk: FRAMERATE/5
			},
			
			monster: {
				walk: FRAMERATE/5
			}
		}
	}
};
