(function() {
	
	"use strict";
	
	Pacer.MainMenu =  function(game) {		
	};
	
	Pacer.MainMenu.prototype = {
		constructor: Pacer.MainMenu,
		
		preload: function() {
		},
		
		create: function() {
			var image = this.game.add.sprite(
				this.game.world.centerX, this.game.world.centerY, "welcome");
				
			image.anchor.set(0.5);		
			
			image.inputEnabled = true;
			
			image.events.onInputDown.add(processGameState, this);		
		}		
	};
	
	function processGameState() {
		this.game.state.start("Game");
	}
	
})();