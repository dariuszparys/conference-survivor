var Starter = {};

(function() {
	
	"use strict";
	
	var SAFE_ZONE_WIDTH = "100%";
	var SAFE_ZONE_HEIGHT = "100%";
		
	Starter.Start =  function() {
		var game = new Phaser.Game(SAFE_ZONE_WIDTH, SAFE_ZONE_HEIGHT, Phaser.AUTO, "");
		
		game.state.add("Boot", Pacer.Boot );
		game.state.add("Preloader", Pacer.Preloader);
		game.state.add("MainMenu", Pacer.MainMenu );
		game.state.add("Game", Pacer.Game);
		
		game.state.start("Boot");		
	};
	
	Starter.Start();
	
})();