(function() {
	
	"use strict";
	
	Pacer.Preloader =  function(game) {		
	};
	
	Pacer.Preloader.prototype = {
		constructor: Pacer.Preloader,
		
		preload: function() {
			var loadingBar = this.add.sprite(this.game.world.centerX,
				this.game.world.centerY, "loading");
			loadingBar.anchor.setTo(0.5, 0.5);
			this.load.setPreloadSprite(loadingBar);
			
			this.game.load.image("welcome", "assets/welcome.jpg");
			this.game.load.image("play", "assets/play.png");				
		},
		
		create: function() {
			this.game.state.start("MainMenu");
		}
	};
	
})();