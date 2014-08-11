/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PHASER ///////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'Rogue-like', { preload: preload, create: create, update: update });

function preload () {
	 game.load.atlasJSONHash('sprites', 'sprites/default.png', 'sprites/default.jsona');
}

function create () {
	game.world.setBounds(0, 0, 1200, 1200);
	game.stage.smoothed = false;

	initBackground();
	initMaps();
	initPlayer();	
	initInput();
	initDebugConsole();
}

function update () {
	updateDebugConsole();
}

function initBackground() {
	this.game.stage.backgroundColor = '#000000';
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TILES ////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var default_tile_width = 12;
var default_tile_height = 12;

// Prototype Constructors ///////////////////////////////////////

function tile(x, y, width, height, sprite, passable, blocksFOV) {
	this.x = (typeof x === "undefined") ? 0 : x;
	this.y = (typeof y === "undefined") ? 0 : y;
	this.width = (typeof width === "undefined") ? default_tile_width : width;
	this.height = (typeof height === "undefined") ? default_tile_height : height;
	this.sprite = (typeof sprite === "undefined") ? 2 : sprite;
	this.passable = (typeof passable === "undefined") ? 0 : passable;
	this.blocksFOV = (typeof blocksFOV === "undefined") ? 1 : blocksFOV;
}



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// INPUT ////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Vars ////////////////////////////////////////////////////

var upKey, numpad8, downKey, numpad2, leftKey, numpad4, rightKey, numpad6, numpad7, numpad9, numpad1, numpad3;

// Functions ///////////////////////////////////////////////

function initInput() {
	upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
	numpad8 = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_8);
	downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
	numpad2 = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_2);
	leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
	numpad4 = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_4);
	rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
	numpad6 = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_6);
	numpad7 = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_7);
	numpad9 = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_9);
	numpad1 = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_1);
	numpad3 = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_3);
	
	upKey.onDown.add(playerMoveUp, this);
	numpad8.onDown.add(playerMoveUp, this);
	downKey.onDown.add(playerMoveDown, this);
	numpad2.onDown.add(playerMoveDown, this);
	leftKey.onDown.add(playerMoveLeft, this);
	numpad4.onDown.add(playerMoveLeft, this);
	rightKey.onDown.add(playerMoveRight, this);
	numpad6.onDown.add(playerMoveRight, this);
	numpad7.onDown.add(playerMoveUpLeft, this);
	numpad9.onDown.add(playerMoveUpRight, this);
	numpad1.onDown.add(playerMoveDownLeft, this);
	numpad3.onDown.add(playerMoveDownRight, this);
}

function playerMoveUp(key) {
	newY = player.y - 1;
	newX = player.x;
	
	var newDungeonSpace = dungeonMap[newY][newX];
	
	if(newDungeonSpace.passable === 1)
	{
		// Empty the current space and move the reference to the player to the new space
		creatureMap[player.y][player.x] = "undefined";
		creatureMap[newY][newX] = player;
		player.y--;
		playerSprite.y -= 12;
	}
}

function playerMoveDown(key) {
	newY = player.y + 1;
	newX = player.x;
	
	var newDungeonSpace = dungeonMap[newY][newX];
	
	if(newDungeonSpace.passable === 1)
	{
		// Empty the current space and move the reference to the player to the new space
		creatureMap[player.y][player.x] = "undefined";
		creatureMap[newY][newX] = player;
		player.y++;
		playerSprite.y += 12;
	}
}

function playerMoveLeft(key) {
	newY = player.y;
	newX = player.x - 1;
	
	var newDungeonSpace = dungeonMap[newY][newX];
	
	if(newDungeonSpace.passable === 1)
	{
		// Empty the current space and move the reference to the player to the new space
		creatureMap[player.y][player.x] = "undefined";
		creatureMap[newY][newX] = player;
		player.x--;
		playerSprite.x -= 12;
	}
}

function playerMoveRight(key) {
	newY = player.y;
	newX = player.x + 1;
	
	var newDungeonSpace = dungeonMap[newY][newX];
	
	if(newDungeonSpace.passable === 1)
	{
		// Empty the current space and move the reference to the player to the new space
		creatureMap[player.y][player.x] = "undefined";
		creatureMap[newY][newX] = player;
		player.x++;
		playerSprite.x += 12;
	}
}

function playerMoveUpLeft(key) {
	newY = player.y - 1;
	newX = player.x - 1;
	
	var newDungeonSpace = dungeonMap[newY][newX];
	
	if(newDungeonSpace.passable === 1)
	{
		// Empty the current space and move the reference to the player to the new space
		creatureMap[player.y][player.x] = "undefined";
		creatureMap[newY][newX] = player;
		player.x--;
		player.y--;
		playerSprite.y -= 12;
		playerSprite.x -= 12;
	}
}

function playerMoveUpRight(key) {
	newY = player.y - 1;
	newX = player.x + 1;
	
	var newDungeonSpace = dungeonMap[newY][newX];
	
	if(newDungeonSpace.passable === 1)
	{
		// Empty the current space and move the reference to the player to the new space
		creatureMap[player.y][player.x] = "undefined";
		creatureMap[newY][newX] = player;
		player.x++;
		player.y--;
		playerSprite.y -= 12;
		playerSprite.x += 12;
	}
}

function playerMoveDownLeft(key) {
	newY = player.y + 1;
	newX = player.x - 1;
	
	var newDungeonSpace = dungeonMap[newY][newX];
	
	if(newDungeonSpace.passable === 1)
	{
		// Empty the current space and move the reference to the player to the new space
		creatureMap[player.y][player.x] = "undefined";
		creatureMap[newY][newX] = player;
		player.x--;
		player.y++;
		playerSprite.y += 12;
		playerSprite.x -= 12;
	}
}

function playerMoveDownRight(key) {
	newY = player.y + 1;
	newX = player.x + 1;
	
	var newDungeonSpace = dungeonMap[newY][newX];
	
	if(newDungeonSpace.passable === 1)
	{
		// Empty the current space and move the reference to the player to the new space
		creatureMap[player.y][player.x] = "undefined";
		creatureMap[newY][newX] = player;
		player.x++;
		player.y++;
		playerSprite.y += 12;
		playerSprite.x += 12;
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MAPS /////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Vars ////////////////////////////////////////////////////

// in spaces
var map_max_height = 100;
var map_max_width = 100;
var map_min_room_height = 4;
var map_min_room_width = 4;
var map_max_room_height = 10;
var map_max_room_width = 10;

var map_max_room_count = 30;

var dungeonMap;
var creatureMap;
var fovMap;
var itemMap;

// Prototype Constructors ///////////////////////////////////////

function room(name, rect) {
	this.name = (typeof name === "undefined") ? 'room' : name;
	this.rect = rect;
	this.center = [this.rect.x + Phaser.Math.ceil(this.rect.width / 2), this.rect.y + Phaser.Math.ceil(this.rect.height / 2)];
}

// Objects ////////////////////////////////////////////////////

var map_wall = new tile(0, 0, default_tile_width, default_tile_height, 2, 0, 1);
var map_floor = new tile(0, 0, default_tile_width, default_tile_height, 0, 1, 0);
var room1;

// Functions ////////////////////////////////////////////////////

function initMaps() {
	// initialize the dungeonMap as a two-dimensional array since JavaScript is weird and I'm bitter about it
	dungeonMap = new Array(map_max_height);
	
	for(var y = 0; y < map_max_height; y++)
	{
		dungeonMap[y] = new Array(map_max_width);
	}

	// initialize the creatureMap as a two-dimensional array since JavaScript is weird and I'm still bitter about it
	creatureMap = new Array(map_max_height);
	
	for(var y = 0; y < map_max_height; y++)
	{
		creatureMap[y] = new Array(map_max_width);
	}

	// fill the dungeonMap with walls we'll carve from
	for(var y = 0; y < map_max_height; y++)
	{
		for(var x = 0; x < map_max_width; x++)
		{
			map_wall.x = x;
			map_wall.y = y;
			
			dungeonMap[y][x] = map_wall;
		}
	}
	
	// Create a room
	createRoom();
	
	// Draw the dungeonMap
	for(var y = 0; y < map_max_height; y++)
	{
		for(var x = 0; x < map_max_width; x++)
		{
			// Get the map_space at this location
			var thisSpace = dungeonMap[y][x];

			// Draw the map_space sprite
			game.add.sprite(x * thisSpace.width, y * thisSpace.height, 'sprites', thisSpace.sprite);
		}
	}
}

function createRoom() {
	// Limit the carvable area to one space around the entire perimeter
	var randx = game.rnd.integerInRange(1, map_max_width - map_max_room_width - 1);
	var randy = game.rnd.integerInRange(1, map_max_height - map_max_room_height - 1);
	var randwidth = game.rnd.integerInRange(map_min_room_width, map_max_room_width);
	var randheight = game.rnd.integerInRange(map_min_room_height, map_max_room_height);
	
	var rect = new Phaser.Rectangle(randx, randy, randwidth, randheight);
	
	room1 = new room('room1', rect);
	
	carveRoom(room1);
}

function carveRoom(newRoom) {
	// Fill the rectangle with floors
	for(var y = newRoom.rect.y; y < (newRoom.rect.y + newRoom.rect.height); y++)
	{
		for(var x = newRoom.rect.x; x < (newRoom.rect.x + newRoom.rect.width); x++)
		{
			map_floor.x = x;
			map_floor.y = y;
			
			dungeonMap[y][x] = map_floor;
		}
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PLAYER ///////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Vars ////////////////////////////////////////////////////

var player;
var playerSprite

// Prototype Constructors ///////////////////////////////////////

function playerObject(x, y) {
	this.x = (typeof x === "undefined") ? 0 : x;
	this.y = (typeof y === "undefined") ? 0 : y;
}

function initPlayer() {
	playerSprite = game.add.sprite(room1.center[0] * default_tile_width, room1.center[1] * default_tile_height, 'sprites', 1);
	playerSprite.anchor.setTo(0, 0);
	//playerSprite.tint = 0xff00ff;
	game.camera.follow(playerSprite, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);
	
	player = new playerObject(room1.center[0], room1.center[1]);
	
	creatureMap[room1.center[1]][room1.center[0]] = player;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DEBUG ////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Vars ////////////////////////////////////////////////////
var debugLine1, debugLine2;

function initDebugConsole() {
	var style = { font: "14px Courier New", fill: "#ff0044", align: "center" };

    debugLine1 = game.add.text(32, 30, 'Player location: x:' + player.x + ', y:' + player.y, style);
    debugLine2 = game.add.text(32, 44, 'Room 1 Dimensions: x:' + room1.rect.x + ', y:' + room1.rect.y + ', w:' + room1.rect.width + ', h:' + room1.rect.height, style);
}

function updateDebugConsole() {
    debugLine1.setText('Player location: x:' + player.x + ', y:' + player.y);
    debugLine2.setText('Room 1 Dimensions: x:' + room1.rect.x + ', y:' + room1.rect.y + ', w:' + room1.rect.width + ', h:' + room1.rect.height);
}
