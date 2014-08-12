/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PLAYER ///////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Prototype Constructors ///////////////////////////////////////

function playerObject(x, y) {
	this.x = (typeof x === "undefined") ? 0 : x;
	this.y = (typeof y === "undefined") ? 0 : y;
}

function initPlayer() {
	game.playerSprite = game.add.sprite(game.map.room1.center[0] * game.tiles.default_width, game.map.room1.center[1] * game.tiles.default_height, 'sprites', 1);
	game.playerSprite.anchor.setTo(0, 0);
	//playerSprite.tint = 0xff00ff;
	game.camera.follow(game.playerSprite, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);
	
	game.player = new playerObject(game.map.room1.center[0], game.map.room1.center[1]);
	
	game.map.creatureMap[game.map.room1.center[1]][game.map.room1.center[0]] = game.player;
}
