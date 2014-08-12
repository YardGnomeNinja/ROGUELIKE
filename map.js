/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TILES ////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Prototype Constructors ///////////////////////////////////////

function tile(x, y, width, height, sprite, passable, blocksFOV) {
	this.x = (typeof x === "undefined") ? 0 : x;
	this.y = (typeof y === "undefined") ? 0 : y;
	this.width = (typeof width === "undefined") ? game.tiles.default_width : width;
	this.height = (typeof height === "undefined") ? game.tiles.default_height : height;
	this.sprite = (typeof sprite === "undefined") ? 2 : sprite;
	this.passable = (typeof passable === "undefined") ? 0 : passable;
	this.blocksFOV = (typeof blocksFOV === "undefined") ? 1 : blocksFOV;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MAPS /////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Prototype Constructors ///////////////////////////////////////

function room(name, rect) {
	this.name = (typeof name === "undefined") ? 'room' : name;
	this.rect = rect;
	this.center = [this.rect.x + Phaser.Math.ceil(this.rect.width / 2), this.rect.y + Phaser.Math.ceil(this.rect.height / 2)];
}

// Objects ////////////////////////////////////////////////////


// Functions ////////////////////////////////////////////////////

function initMaps() {
	game.tiles = [];
	game.tiles.default_width = 12;
	game.tiles.default_height = 12;

	game.map = [];
	game.map.max_height = 100;
	game.map.max_width = 100;
	game.map.min_room_height = 4;
	game.map.min_room_width = 4;
	game.map.max_room_height = 10;
	game.map.max_room_width = 10;

	game.map.max_room_count = 30;

	game.tiles.map_wall = new tile(0, 0, game.tiles.default_width, game.tiles.default_height, 2, 0, 1);
	game.tiles.map_floor = new tile(0, 0, game.tiles.default_width, game.tiles.default_height, 0, 1, 0);
	game.map.room1;

	game.map.dungeonMap;
	game.map.creatureMap;
	game.map.fovMap;
	game.map.itemMap;

	// initialize the dungeonMap as a two-dimensional array since JavaScript is weird and I'm bitter about it
	game.map.dungeonMap = new Array(game.map.max_height);
	
	for(var y = 0; y < game.map.max_height; y++)
	{
		game.map.dungeonMap[y] = new Array(game.map.max_width);
	}

	// initialize the creatureMap as a two-dimensional array since JavaScript is weird and I'm still bitter about it
	game.map.creatureMap = new Array(game.map.max_height);
	
	for(var y = 0; y < game.map.max_height; y++)
	{
		game.map.creatureMap[y] = new Array(game.map.max_width);
	}

	// fill the dungeonMap with walls we'll carve from
	for(var y = 0; y < game.map.max_height; y++)
	{
		for(var x = 0; x < game.map.max_width; x++)
		{
			game.tiles.map_wall.x = x;
			game.tiles.map_wall.y = y;
			
			game.map.dungeonMap[y][x] = game.tiles.map_wall;
		}
	}
	
	// Create a room
	createRoom();
	
	// Draw the dungeonMap
	for(var y = 0; y < game.map.max_height; y++)
	{
		for(var x = 0; x < game.map.max_width; x++)
		{
			// Get the map_space at this location
			var thisSpace = game.map.dungeonMap[y][x];

			// Draw the map_space sprite
			game.add.sprite(x * thisSpace.width, y * thisSpace.height, 'sprites', thisSpace.sprite);
		}
	}
}

function createRoom() {
	// Limit the carvable area to one space around the entire perimeter
	var randx = game.rnd.integerInRange(1, game.map.max_width - game.map.max_room_width - 1);
	var randy = game.rnd.integerInRange(1, game.map.max_height - game.map.max_room_height - 1);
	var randwidth = game.rnd.integerInRange(game.map.min_room_width, game.map.max_room_width);
	var randheight = game.rnd.integerInRange(game.map.min_room_height, game.map.max_room_height);
	
	var rect = new Phaser.Rectangle(randx, randy, randwidth, randheight);
	
	game.map.room1 = new room('room1', rect);
	
	carveRoom(game.map.room1);
}

function carveRoom(newRoom) {
	// Fill the rectangle with floors
	for(var y = newRoom.rect.y; y < (newRoom.rect.y + newRoom.rect.height); y++)
	{
		for(var x = newRoom.rect.x; x < (newRoom.rect.x + newRoom.rect.width); x++)
		{
			game.tiles.map_floor.x = x;
			game.tiles.map_floor.y = y;
			
			game.map.dungeonMap[y][x] = game.tiles.map_floor;
		}
	}
}