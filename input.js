/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// INPUT ////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Vars ////////////////////////////////////////////////////

//var game.keys.upKey, game.keys.numpad8, game.keys.downKey, game.keys.numpad2, game.keys.leftKey, game.keys.numpad4, game.keys.rightKey, game.keys.numpad6, game.keys.numpad7, game.keys.numpad9, game.keys.numpad1, game.keys.numpad3;

// Functions ///////////////////////////////////////////////

function initInput() {
	game.keys = [];
	game.keys.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
	game.keys.numpad8 = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_8);
	game.keys.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
	game.keys.numpad2 = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_2);
	game.keys.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
	game.keys.numpad4 = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_4);
	game.keys.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
	game.keys.numpad6 = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_6);
	game.keys.numpad7 = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_7);
	game.keys.numpad9 = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_9);
	game.keys.numpad1 = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_1);
	game.keys.numpad3 = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_3);
	
	game.keys.upKey.onDown.add(playerMoveUp, this);
	game.keys.numpad8.onDown.add(playerMoveUp, this);
	game.keys.downKey.onDown.add(playerMoveDown, this);
	game.keys.numpad2.onDown.add(playerMoveDown, this);
	game.keys.leftKey.onDown.add(playerMoveLeft, this);
	game.keys.numpad4.onDown.add(playerMoveLeft, this);
	game.keys.rightKey.onDown.add(playerMoveRight, this);
	game.keys.numpad6.onDown.add(playerMoveRight, this);
	game.keys.numpad7.onDown.add(playerMoveUpLeft, this);
	game.keys.numpad9.onDown.add(playerMoveUpRight, this);
	game.keys.numpad1.onDown.add(playerMoveDownLeft, this);
	game.keys.numpad3.onDown.add(playerMoveDownRight, this);
}

function onTileSpriteClick(event, sprite) {
	window.alert(event.x / game.map.tiles.default_width + "," + event.y / game.map.tiles.default_width);
}

function playerMoveUp(key) {
	newY = game.player.y - 1;
	newX = game.player.x;
	
	var newSpace = game.map.floors[game.player.floor][newX][newY];
	
	if(newSpace.tile.passable)
	{
		game.player.y--;
		game.player.sprite.y -= 12;
	}
}

function playerMoveDown(key) {
	newY = game.player.y + 1;
	newX = game.player.x;
	
	var newSpace = game.map.floors[game.player.floor][newX][newY];
	
	if(newSpace.tile.passable)
	{
		game.player.y++;
		game.player.sprite.y += 12;
	}
}

function playerMoveLeft(key) {
	newY = game.player.y;
	newX = game.player.x - 1;
	
	var newSpace = game.map.floors[game.player.floor][newX][newY];
	
	if(newSpace.tile.passable)
	{
		game.player.x--;
		game.player.sprite.x -= 12;
	}
}

function playerMoveRight(key) {
	newY = game.player.y;
	newX = game.player.x + 1;
	
	var newSpace = game.map.floors[game.player.floor][newX][newY];
	
	if(newSpace.tile.passable)
	{
		game.player.x++;
		game.player.sprite.x += 12;
	}
}

function playerMoveUpLeft(key) {
	newY = game.player.y - 1;
	newX = game.player.x - 1;
	
	var newSpace = game.map.floors[game.player.floor][newX][newY];
	
	if(newSpace.tile.passable)
	{
		game.player.x--;
		game.player.y--;
		game.player.sprite.y -= 12;
		game.player.sprite.x -= 12;
	}
}

function playerMoveUpRight(key) {
	newY = game.player.y - 1;
	newX = game.player.x + 1;
	
	var newSpace = game.map.floors[game.player.floor][newX][newY];
	
	if(newSpace.tile.passable)
	{
		game.player.x++;
		game.player.y--;
		game.player.sprite.y -= 12;
		game.player.sprite.x += 12;
	}
}

function playerMoveDownLeft(key) {
	newY = game.player.y + 1;
	newX = game.player.x - 1;
	
	var newSpace = game.map.floors[game.player.floor][newX][newY];
	
	if(newSpace.tile.passable)
	{
		game.player.x--;
		game.player.y++;
		game.player.sprite.y += 12;
		game.player.sprite.x -= 12;
	}
}

function playerMoveDownRight(key) {
	newY = game.player.y + 1;
	newX = game.player.x + 1;
	
	var newSpace = game.map.floors[game.player.floor][newX][newY];
	
	if(newSpace.tile.passable)
	{
		game.player.x++;
		game.player.y++;
		game.player.sprite.y += 12;
		game.player.sprite.x += 12;
	}
}