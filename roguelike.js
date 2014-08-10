/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PHASER ///////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'Rogue-like', { preload: preload, create: create, update: update });

function preload () {
	 game.load.atlasJSONHash('tiles', 'tiles/default.png', 'tiles/default.jsona');
}

function create () {
	initBackground();
	initMap();
	initPlayer();	
	initInput();
	drawDebugConsole();
}

function update () {
	
	//drawPlayer();
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
	player.y -= 12;
}

function playerMoveDown(key) {
	player.y += 12;
}

function playerMoveLeft(key) {
	player.x -= 12;
}

function playerMoveRight(key) {
	player.x += 12;
}

function playerMoveUpLeft(key) {
	player.y -= 12;
	player.x -= 12;
}

function playerMoveUpRight(key) {
	player.y -= 12;
	player.x += 12;
}

function playerMoveDownLeft(key) {
	player.y += 12;
	player.x -= 12;
}

function playerMoveDownRight(key) {
	player.y += 12;
	player.x += 12;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MAP //////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

var map;

// Prototype Constructors ///////////////////////////////////////

function room(name, rect) {
	this.name = (typeof name === "undefined") ? 'room' : name;
	this.rect = rect;
	this.center = [this.rect.x + (this.rect.width / 2), this.rect.y + (this.rect.height / 2)];
}

// Objects ////////////////////////////////////////////////////

var map_wall = new tile(0, 0, default_tile_width, default_tile_height, 2, 0, 1);
var map_floor = new tile(0, 0, default_tile_width, default_tile_height, 0, 1, 0);
var room1;

// Functions ////////////////////////////////////////////////////

function initMap() {
	// initialize the map as a two-dimensional array since JavaScript is weird and I'm bitter about it
	map = new Array(map_max_height);
	
	for(var y = 0; y < map_max_height; y++)
	{
		map[y] = new Array(map_max_width);
	}
	

	// fill the map with walls we'll carve from
	for(var y = 0; y < map_max_height; y++)
	{
		for(var x = 0; x < map_max_width; x++)
		{
			map_wall.x = x;
			map_wall.y = y;
			
			map[y][x] = map_wall;
		}
	}
	
	// Create a room
	createRoom();
	
	// Draw the map
	for(var y = 0; y < map_max_height; y++)
	{
		for(var x = 0; x < map_max_width; x++)
		{
			// Get the map_space at this location
			var thisSpace = map[y][x];

			// Draw the map_space sprite
			game.add.sprite(x * thisSpace.width, y * thisSpace.height, 'tiles', thisSpace.sprite);
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
			
			map[y][x] = map_floor;
		}
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PLAYER ///////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var player;

function initPlayer() {
	player = game.add.sprite(room1.center[0] * default_tile_width, room1.center[1] * default_tile_height, 'tiles', 1);
	player.anchor.setTo(0, 0);
	//player.tint = 0xff00ff;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DEBUG ////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function drawDebugConsole() {
	var style = { font: "14px Courier New", fill: "#ff0044", align: "center" };

    game.add.text(32, 30, 'Room 1 Dimensions: x:' + room1.rect.x + ', y:' + room1.rect.y + ', w:' + room1.rect.width + ', h:' + room1.rect.height, style);
}
