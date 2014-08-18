
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
		this.connected = false;
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
	var roomArray = [];
	
	for(i = 0; i < numberofRooms; i++)
	{
		roomArray[i] = generateRoom(newFloor);
	}
	
	// Create connections between
	generateHallways(newFloor, roomArray);
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
	
	return newRoom;
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

function generateHallways(newFloor, roomArray) {
	// Iterate the rooms
	for(var i = 0; i < roomArray.length; i++)
	{
		var roomA = roomArray[i];
		
		// If room.connected == false OR 33% chance	
		if(!roomA.connected || (game.rnd.integerInRange(1, 100) <= 33))
		{
			// Random generate a number between 0 and roomArray.length - 1 until it is not the same as the current iteration counter
			var randomRoomIndex = i;
			while(randomRoomIndex == i) {
				randomRoomIndex = game.rnd.integerInRange(0, roomArray.length - 1);
			}
				
			var roomB = roomArray[randomRoomIndex];
		
			// Carve a hallway from roomA to roomB
			carveHallway(newFloor, roomA, roomB);
		}
	}
}

function carveHallway(newFloor, roomA, roomB) {
	// Pick a random point inside the rect in roomA and in roomB
	var roomAPoint = new Phaser.Point(game.rnd.integerInRange(roomA.rect.x, roomA.rect.x + roomA.rect.width), game.rnd.integerInRange(roomA.rect.y, roomA.rect.y + roomA.rect.height));
	var roomBPoint = new Phaser.Point(game.rnd.integerInRange(roomB.rect.x, roomB.rect.x + roomB.rect.width), game.rnd.integerInRange(roomB.rect.y, roomB.rect.y + roomB.rect.height));

 	// Pick a random number, 1 - 5 = generate x path first, 6 - 10 = generate y path first
	var firstDirection = game.rnd.integerInRange(1, 10);

	if(firstDirection <= 5)
	{
		var xStart = (roomAPoint.x <= roomBPoint.x) ? roomAPoint.x : roomBPoint.x;
		var xEnd = (roomAPoint.x >= roomBPoint.x) ? roomAPoint.x : roomBPoint.x;
		var yStart = (roomAPoint.y <= roomBPoint.y) ? roomAPoint.y : roomBPoint.y;
		var yEnd = (roomAPoint.y >= roomBPoint.y) ? roomAPoint.y : roomBPoint.y;
		
		// Carve X
 		for(var x = xStart; x <= xEnd; x++)
		{
			newFloor[x][yStart].tile = new game.map.groundTile(x, yStart);
		}
		
		// Carve Y from end of X
 		for(var y = yStart; y <= yEnd; y++)
		{
			newFloor[xEnd][y].tile = new game.map.groundTile(xEnd, y);
		}
 	}
	else
	{
/*		// carve y first
		if(roomAPoint.y <= roomBPoint.y)
		{
			var startRoomPoint = roomAPoint;
			var endRoomPoint = roomBPoint;
		}
		else
		{
			var startRoomPoint = roomBPoint;
			var endRoomPoint = roomAPoint;
		}

 		for(var y = startRoomPoint.y; y <= endRoomPoint.y; y++)
		{
			newFloor[startRoomPoint.x][y].tile = new game.map.groundTile(startRoomPoint.x, y);
		}

		// carve x next
		if(roomAPoint.x <= roomBPoint.x)
		{
			var startRoomPoint = roomAPoint;
			var endRoomPoint = roomBPoint;
		}
		else
		{
			var startRoomPoint = roomBPoint;
			var endRoomPoint = roomAPoint;
		}
		
 		for(var x = startRoomPoint.x; x <= endRoomPoint.x; x++)
		{
			newFloor[x][startRoomPoint.y].tile = new game.map.groundTile(x, startRoomPoint.y);
		}
*/ 	}
	
	// Set connected to true for each room
	roomA.connected = true;
	roomB.connected = true;
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