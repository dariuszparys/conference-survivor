var Pacer = {};

Pacer.Boot = function(game) {

};

Pacer.Boot.prototype = {
	
	constructor: Pacer.Boot,
	
	preload: function() {
		this.game.load.image("loading", "assets/loading.png");
	},
	
	create: function() {
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		//this.scale.setScreenSize();
		
		this.game.state.start("Preloader");
	}
	
}