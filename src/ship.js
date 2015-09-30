var _second = 1000;
var _minute = _second * 60;
var _hour = _minute * 60;
var _day = _hour * 24;

Ship = function(size, scene) {
    BABYLON.Mesh.call(this, "ship", scene);
    var vd = BABYLON.VertexData.CreateBox(size);
    vd.applyToMesh(this, false);

    this.killed = false;
    this.position.x = 0;
    this.position.z = 0;
    this.position.y = size/2;

    // Movement attributes
    this.speed = 3;
    this.moveLeft = false;
    this.moveRight = false;

    this._initMovement();
    this._initTimerUpdate();

};

Ship.prototype = Object.create(BABYLON.Mesh.prototype);
Ship.prototype.constructor = Ship;

Ship.prototype.sendEvent = function() {
    var e = new Event('timerUpdated');
    window.dispatchEvent(e);
};

Ship.prototype._initTimerUpdate = function() {

    var updateTimerLabel = function() {
        var elapsed = new Date() - currentRun;
		var minutes = Math.floor(( elapsed % _hour) / _minute);
		var seconds = Math.floor((elapsed % _minute) / _second);
		var milliseconds = Math.floor(elapsed % _second);

        document.getElementById("timerLabel").innerHTML = seconds + "." + milliseconds;
    };

    BABYLON.Tools.RegisterTopRootEvents([{
        name:"timerUpdated",
        handler : updateTimerLabel
    }]);
};

Ship.prototype._initMovement = function() {

    var onKeyDown = function(evt) {
        console.log(evt.keyCode);
        if (evt.keyCode == 37) {
            ship.moveLeft = true;
            ship.moveRight = false;
        } else if (evt.keyCode == 39) {
            ship.moveRight = true;
            ship.moveLeft = false;
        }
    };

    var onKeyUp = function(evt) {
        ship.moveRight = false;
        ship.moveLeft = false;
    };

    // Register events
    BABYLON.Tools.RegisterTopRootEvents([{
        name: "keydown",
        handler: onKeyDown
    }, {
        name: "keyup",
        handler: onKeyUp
    }]);
};

Ship.prototype.move = function() {
    if (ship.moveRight) {
        ship.position.x += 1;
        camera.position.x += 1;
    }
    if (ship.moveLeft) {
        ship.position.x += -1;
        camera.position.x += -1;
    }
};