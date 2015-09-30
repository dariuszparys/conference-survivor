(function() {
	
	"use strict";
	
	var canvasElement;
	var phaserCanvas;
	
	Pacer.Game =  function(game) {		
	};
	
	Pacer.Game.prototype = {
		constructor: Pacer.Game,
		
		preload: function() {
			canvasElement = document.createElement("canvas");
			canvasElement.style.width = "100%";
			canvasElement.style.height = "100%";
			canvasElement.style.touchAction = "none";			
			document.body.appendChild(canvasElement);
			document.body.removeChild(this.game.canvas);
		},
		
		create: function() {
			var engine = new BABYLON.Engine(canvasElement);
			var scene = new BABYLON.Scene(engine);
			var ground = BABYLON.Mesh.CreateGround("floor", 20, 20, 2, scene);
			var light = new BABYLON.PointLight("smallLight", new BABYLON.Vector3(0,2,0), scene);
			var camera = new BABYLON.FreeCamera("cam", new BABYLON.Vector3(0, 3, -10), scene);
			camera.attachControl(canvasElement, true);
			
			var that = this;			
			setTimeout(function() {
				document.body.removeChild(canvasElement);
				that.game.destroy();
				Starter.Start();
			}, 10000);
			
			engine.runRenderLoop(function() {
				scene.render();
			});
		}
		
	};
	
})();