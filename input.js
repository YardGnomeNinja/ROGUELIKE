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
	var x = event.x / game.map.tiles.default_width;
	var y = event.y / game.map.tiles.default_width
	var spaceString = "";
	var tileString = "";
	
	for(i in game.map.floors[game.player.floor][x][y])
		spaceString += "\n" + i + " : " + game.map.floors[game.player.floor][x][y][i];
	
	window.alert(x + "," + y + "\n ---- SPACE ---- " + spaceString);

	for(i in game.map.floors[game.player.floor][x][y].tile)
		tileString += "\n" + i + " : " + game.map.floors[game.player.floor][x][y].tile[i];
	
	window.alert(x + "," + y + "\n ---- TILE ---- " + tileString);
}

function playerMoveUp(key) {
	newY = game.player.point.y - 1;
	newX = game.player.point.x;
	
	var newSpace = game.map.floors[game.player.floor][newX][newY];
	
	if(newSpace.tile.passable)
	{
		game.player.point.y--;
		game.player.sprite.y -= 12;
		recalculateFOV(game.player.floor);
	}
}

function playerMoveDown(key) {
	newY = game.player.point.y + 1;
	newX = game.player.point.x;
	
	var newSpace = game.map.floors[game.player.floor][newX][newY];
	
	if(newSpace.tile.passable)
	{
		game.player.point.y++;
		game.player.sprite.y += 12;
		recalculateFOV(game.player.floor);
	}
}

function playerMoveLeft(key) {
	newY = game.player.point.y;
	newX = game.player.point.x - 1;
	
	var newSpace = game.map.floors[game.player.floor][newX][newY];
	
	if(newSpace.tile.passable)
	{
		game.player.point.x--;
		game.player.sprite.x -= 12;
		recalculateFOV(game.player.floor);
	}
}

function playerMoveRight(key) {
	newY = game.player.point.y;
	newX = game.player.point.x + 1;
	
	var newSpace = game.map.floors[game.player.floor][newX][newY];
	
	if(newSpace.tile.passable)
	{
		game.player.point.x++;
		game.player.sprite.x += 12;
		recalculateFOV(game.player.floor);
	}
}

function playerMoveUpLeft(key) {
	newY = game.player.point.y - 1;
	newX = game.player.point.x - 1;
	
	var newSpace = game.map.floors[game.player.floor][newX][newY];
	
	if(newSpace.tile.passable)
	{
		game.player.point.x--;
		game.player.point.y--;
		game.player.sprite.y -= 12;
		game.player.sprite.x -= 12;
		recalculateFOV(game.player.floor);
	}
}

function playerMoveUpRight(key) {
	newY = game.player.point.y - 1;
	newX = game.player.point.x + 1;
	
	var newSpace = game.map.floors[game.player.floor][newX][newY];
	
	if(newSpace.tile.passable)
	{
		game.player.point.x++;
		game.player.point.y--;
		game.player.sprite.y -= 12;
		game.player.sprite.x += 12;
		recalculateFOV(game.player.floor);
	}
}

function playerMoveDownLeft(key) {
	newY = game.player.point.y + 1;
	newX = game.player.point.x - 1;
	
	var newSpace = game.map.floors[game.player.floor][newX][newY];
	
	if(newSpace.tile.passable)
	{
		game.player.point.x--;
		game.player.point.y++;
		game.player.sprite.y += 12;
		game.player.sprite.x -= 12;
		recalculateFOV(game.player.floor);
	}
}

function playerMoveDownRight(key) {
	newY = game.player.point.y + 1;
	newX = game.player.point.x + 1;
	
	var newSpace = game.map.floors[game.player.floor][newX][newY];
	
	if(newSpace.tile.passable)
	{
		game.player.point.x++;
		game.player.point.y++;
		game.player.sprite.y += 12;
		game.player.sprite.x += 12;
		recalculateFOV(game.player.floor);
	}
}