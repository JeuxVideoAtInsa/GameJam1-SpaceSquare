Crafty.c("Weapon", {

	name:"",
	damage: 0,

	
	init: function() {
		this.name = "default";
		this.damage = 10;
		return this;
	},
	
	weapon: function(name, damage) {
		this.name = name;
		this.damage = damage;
		return this;
	}

});