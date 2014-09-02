/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PLAYER ///////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Prototype Constructors ///////////////////////////////////////

function player(sprite, x, y, floor) {
	var x = (typeof x === "undefined") ? 0 : x;
	var y = (typeof y === "undefined") ? 0 : y;
	
	this.__proto__ = new Object();
	this.sprite = sprite;
	this.point = new Phaser.Point(x, y);
	this.floor = (typeof floor === "undefined") ? 0 : floor;
	this.recalculateFOV = false;
	this.viewRadius = 5;
	this.visibleSpaces = [];
}

function initPlayer() {
	var freeSpace = findFreeSpace(0);
	
	var playerSprite = game.add.sprite(freeSpace.point.x * game.map.tiles.default_width, freeSpace.point.y * game.map.tiles.default_width, 'sprites', 1);
	game.player = new player(playerSprite, freeSpace.point.x, freeSpace.point.y);
	game.player.sprite.anchor.setTo(0, 0);
	//playerSprite.tint = 0xff00ff;
	
	game.camera.follow(game.player.sprite, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);
	
	// allow the player to see themself
	game.player.visibleSpaces.push(game.map.floors[game.player.floor][game.player.point.x][game.player.point.y].point);
	
	recalculateFOV(game.player.floor);
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