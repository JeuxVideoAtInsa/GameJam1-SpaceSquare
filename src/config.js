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
	
	nbTiles: 30,
	
	tile: {
		width: 20,
		height: 20
	},
	
	characters: {
		astronaut: {
			width: 33,
			height: 47,
			speed: 20,
			jump: 20
		},
		
		monster: {
			width: 45,
			height: 33,
			speed: 2,
			jump: 10
		}
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
				walk: FRAMERATE/5,
				die: FRAMERATE/10
			}
		}
	}
};
