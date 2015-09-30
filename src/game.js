// camera needed for obstacles creation
var camera;

// Start Time of the run
var currentRun;

// player ship
var ship;

(function() {
	
	"use strict";
	
	// UI Elements
	var canvasElement;
	var timerLabelElement;
		
	// scene reference necessay to get textures asynchronous to scene
	var scene;
	
	// array of all speaker pictures
	var textures = [];
	
	// interval handle of box creation timer
	var boxInterval;
	
	// our Game object pointer
	var that;
	
	Pacer.Game =  function(game) {		
	};
	
	Pacer.Game.prototype = {
		constructor: Pacer.Game,
		
		preload: function() {
			canvasElement = document.createElement("canvas");
			canvasElement.style.width = "100%";
			canvasElement.style.height = "100%";
			canvasElement.style.touchAction = "none";
			
			timerLabelElement = document.createElement("div");
			timerLabelElement.id = "timerLabel";
			timerLabelElement.style.position = "absolute";
			timerLabelElement.style.top = "20px";
			timerLabelElement.style.left = "20px";
			timerLabelElement.style.color = "red";
			timerLabelElement.style.fontSize = "2em";
			timerLabelElement.style.fontFamily = "Impact";
						
			document.body.appendChild(canvasElement);
			document.body.appendChild(timerLabelElement);
			document.body.removeChild(this.game.canvas);
		},
		
		create: function() {
			that = this;
			
			var engine = new BABYLON.Engine(canvasElement);
			scene = new BABYLON.Scene(engine);

			// Add the camera
			camera = new BABYLON.FreeCamera("cam", new BABYLON.Vector3(0, 5, -30), scene);
			camera.setTarget(new BABYLON.Vector3(0,0,20));
			camera.maxZ = 1000;
			
			// light the scene up
			var h = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 0.5, 0), scene);
			h.intensity = 0.6;
			
			// directional lighting
			var d = new BABYLON.DirectionalLight("dir", new BABYLON.Vector3(0,-0.5,0.5), scene);
			d.position = new BABYLON.Vector3(0.1,100,-100);
			d.intensity = 0.4;
			d.diffuse = BABYLON.Color3.FromInts(204,196,255);
			
			// the floor
			var ground = BABYLON.Mesh.CreateGround("floor", 4000, 4000, 2, scene);
			
			// the fog
			scene.fogMode = BABYLON.Scene.FOGMODE_EXP2;
			scene.fogDensity = 0.01;

			// load textures synchrously
			for( var n = 0; n < Sessions.length; n++) {
				var material = new BABYLON.StandardMaterial(Sessions[n].id, scene);
				material.diffuseTexture = new BABYLON.Texture(Sessions[n].image, scene);
				textures.push(material);
			}			

			// use the AssetManager to load assets
			// var assetsManager = new BABYLON.AssetsManager(scene);
			// assetsManager.onFinish = function(tasks) {

				// start the babylon game
				// start timer
				currentRun = new Date();
				
				// setup environment, speed and player
				camera.speed = 4;
				ship = new Ship(1, scene);
				boxInterval = setInterval(box, 100);


				// render everything right now!
				engine.runRenderLoop(function() {
					if(!ship.killed) {
						
						// update the timer label through this ship Event
						ship.sendEvent();
						
						// move the ship by player input
						ship.move();

						camera.position.z += ship.speed;
						ship.position.z += ship.speed;
						ground.position.z += ship.speed;						

						scene.render();
					} else {
						clearInterval(boxInterval);

						// restart the phaser game						
						setTimeout(function() {
							window.location.reload();
						}, 10000);
						
					} 
					
				});				
			// };

			// load all textures to kick off this game
			// initializeTextures(assetsManager);
		},
	};
	
	function initializeTextures(assetsManager) {    
		for( var index = 0; index < Sessions.length; index++) {        
			var textureTask = assetsManager.addTextureTask(Sessions[index].id, Sessions[index].image);
			textureTask.onSuccess = function(taskResult) {
				var material = new BABYLON.StandardMaterial(taskResult.name, scene);
				material.diffuseTexture = taskResult.texture;          
				textures.push(material);            
				}
		}
	};
	
	var box = function() {
		var minZ = camera.position.z+500;
		var maxZ = camera.position.z+1500;
		var minX = camera.position.x - 100, maxX = camera.position.x+100;
		var minSize = 2, maxSize = 10;
	
		var randomX, randomZ, randomSize, randomTexture;
	
		randomX = randomNumber(minX, maxX);
		randomZ = randomNumber(minZ, maxZ);
		randomSize = randomNumber(minSize, maxSize);
	
		randomTexture = Math.floor(Math.random() * textures.length);
	
		var b = BABYLON.Mesh.CreateBox("bb", randomSize, scene);
	
		b.scaling.x = randomNumber(0.5, 1.5);
		b.scaling.y = randomNumber(4, 8);
		b.scaling.z = randomNumber(2, 3);
	
		b.position.x = randomX;
		b.position.y = b.scaling.y/2 ;
		b.position.z = randomZ;
		
		b.material = textures[randomTexture];
		b.material.diffuseTexture.vScale = 2;
	
		// action manager
		b.actionManager = new BABYLON.ActionManager(scene);
	
		// on collision with ship
		var trigger = {trigger:BABYLON.ActionManager.OnIntersectionEnterTrigger, parameter: ship};
		var exec = new BABYLON.SwitchBooleanAction(trigger, ship, "killed");
		b.actionManager.registerAction(exec);
		
		setInterval(function() {
			b.dispose();
		}, 10000);
	};	
	
	var randomNumber = function (min, max) {
		if (min == max) {
			return (min);
		}
		var random = Math.random();
		return ((random * (max - min)) + min);
	};
})();