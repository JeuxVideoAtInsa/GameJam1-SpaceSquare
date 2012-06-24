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
	
	frameRate: FRAMERATE,
	
	animation: {
		tile: {
			update: FRAMERATE
		}
	}
};