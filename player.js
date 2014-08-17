/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PLAYER ///////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Prototype Constructors ///////////////////////////////////////

function player(sprite, x, y, floor) {
	this.__proto__ = new Object();
	this.sprite = sprite;
	this.x = (typeof x === "undefined") ? 0 : x;
	this.y = (typeof y === "undefined") ? 0 : y;
	this.floor = (typeof floor === "undefined") ? 0 : floor;
}

function initPlayer() {
	var freeSpace = findFreeSpace(0);
	
	var playerSprite = game.add.sprite(freeSpace.x * game.map.tiles.default_width, freeSpace.y * game.map.tiles.default_width, 'sprites', 1);
	game.player = new player(playerSprite, freeSpace.x, freeSpace.y);
	game.player.sprite.anchor.setTo(0, 0);
	//playerSprite.tint = 0xff00ff;
	
	game.camera.follow(game.player.sprite, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);
}

function findFreeSpace(floorIndex) {
	var freeSpace;
	var foundFreeSpace = false;
	
	while(!foundFreeSpace) {
		var randx = game.rnd.integerInRange(1, game.map.max_width - game.map.max_room_width - 1);
		var randy = game.rnd.integerInRange(1, game.map.max_height - game.map.max_room_height - 1);
		
		if(game.map.floors[floorIndex][randx][randy].tile.passable)
		{
			freeSpace = game.map.floors[floorIndex][randx][randy];
			foundFreeSpace = true;
		}
	}
	
	return freeSpace;
}