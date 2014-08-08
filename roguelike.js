var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'Rogue-like', { preload: preload, create: create, update: update });

function preload () {

	 game.load.atlasJSONHash('tiles', 'tiles/default.png', 'tiles/default.jsona');

}

var player;

var upKey, numpad8, downKey, numpad2, leftKey, numpad4, rightKey, numpad6, numpad7, numpad9, numpad1, numpad3;

function create () {

	this.game.stage.backgroundColor = '#000000';
	player = game.add.sprite(game.world.centerX, game.world.centerY, 'tiles', 1);
	player.anchor.setTo(0.5, 0.5);
	//player.tint = 0xff00ff;
	
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

function update () {
	
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