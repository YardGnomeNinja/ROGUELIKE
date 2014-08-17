
// Functions ////////////////////////////////////////////////////

function initMap() {
	game.map = new Object();
	game.map.tiles = new Object();
	game.map.floors = new Array();
	game.map.floors.tiles = new Array();
	
	game.map.tiles.default_width = 12;
	game.map.tiles.default_height = 12;

	game.map.max_height = 100;
	game.map.max_width = 100;
	game.map.min_room_height = 4;
	game.map.min_room_width = 4;
	game.map.max_room_height = 15;
	game.map.max_room_width = 15;

	game.map.max_room_count = 50;

	initMapPrototypes();

	// Create the first floor
	game.map.floors[0] = generateFloor(0);
}

function initMapPrototypes() {
	game.map.floor = function (index, name) {
		this.__proto__ = new Object();
		this.name = (typeof name === "undefined") ? 'floor ' + (index + 1) : name;
	}

	game.map.space = function (x, y) {
		this.__proto__ = new Object();
		this.x = (typeof x === "undefined") ? 0 : x;
		this.y = (typeof y === "undefined") ? 0 : y;
		this.tile = new Object();
		this.creature = new Object();
		this.items = new Array();
	}

	game.map.room = function (name, rect) {
		this.__proto__ = new Object();
		this.name = (typeof name === "undefined") ? 'room' : name;
		this.rect = rect;
	}

	game.map.tile = function (name, width, height, sprite, passable, blocksFOV) {
		this.__proto__ = new Object();
		this.name = (typeof name === "undefined") ? 'unknown' : name;
		this.width = (typeof width === "undefined") ? game.map.tiles.default_width : width;
		this.height = (typeof height === "undefined") ? game.map.tiles.default_height : height;
		this.sprite = (typeof sprite === "undefined") ? 2 : sprite;
		this.passable = (typeof passable === "undefined") ? false : passable;
		this.blocksFOV = (typeof blocksFOV === "undefined") ? true : blocksFOV;
	}

	game.map.groundTile = function (x, y) {
		this.__proto__ = new game.map.tile();
		this.name = 'stone floor';
		this.x = (typeof x === "undefined") ? 0 : x;
		this.y = (typeof y === "undefined") ? 0 : y;
		this.sprite = 0;
		this.passable = true;
		this.blocksFOV = false;
	}

	game.map.wallTile = function (x, y) {
		this.__proto__ = new game.map.tile();
		this.name = 'stone wall';
		this.x = (typeof x === "undefined") ? 0 : x;
		this.y = (typeof y === "undefined") ? 0 : y;
		this.sprite = 2;
		this.passable = false;
		this.blocksFOV = true;
	}
}

function generateFloor(index) {
	var newFloor = new game.map.floor(index);
	
	for(var x = 0; x < game.map.max_width; x++)
	{
		newFloor[x] = new Array(game.map.max_height);
	}

	// fill the floor with spaces and the spaces with walls we'll carve from
	for(var x = 0; x < game.map.max_width; x++)
	{
		for(var y = 0; y < game.map.max_height; y++)
		{		
			newFloor[x][y] = new game.map.space(x, y);
			newFloor[x][y].tile = new game.map.wallTile(x, y);
		}
	}

	// Create the rooms
	generateRooms(newFloor);
	
	return newFloor;
}

function generateRooms(newFloor) {
	// Create rooms
	var numberofRooms = game.rnd.integerInRange(game.map.max_room_count / 2, game.map.max_room_count);
	
	for(i = 0; i < numberofRooms; i++)
	{
		generateRoom(newFloor);
	}
}

function generateRoom(newFloor) {
	// Limit the carvable area to one space around the entire perimeter
	var randx = game.rnd.integerInRange(1, game.map.max_width - game.map.max_room_width - 1);
	var randy = game.rnd.integerInRange(1, game.map.max_height - game.map.max_room_height - 1);
	var randwidth = game.rnd.integerInRange(game.map.min_room_width, game.map.max_room_width);
	var randheight = game.rnd.integerInRange(game.map.min_room_height, game.map.max_room_height);
	
	var rect = new Phaser.Rectangle(randx, randy, randwidth, randheight);
	
	var newRoom = new game.map.room('A room', rect);
	
	carveRoom(newFloor, newRoom);
}

function carveRoom(newFloor, newRoom) {
	// Fill the rectangle with floors
	for(var x = newRoom.rect.x; x < (newRoom.rect.x + newRoom.rect.width); x++)
	{
		for(var y = newRoom.rect.y; y < (newRoom.rect.y + newRoom.rect.height); y++)
		{
			newFloor[x][y].tile = new game.map.groundTile(x, y);
		}
	}
}

function drawFloor(index)
{
	// Draw the floor
	for(var x = 0; x < game.map.max_width; x++)
	{
		for(var y = 0; y < game.map.max_height; y++)
		{
			// Get the tile at this location
			var thisSpaceTile = game.map.floors[index][x][y].tile;

			// Draw the tile sprite
			game.add.sprite(x * thisSpaceTile.width, y * thisSpaceTile.height, 'sprites', thisSpaceTile.sprite);
		}
	}	
}