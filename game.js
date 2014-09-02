/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PHASER ///////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'Rogue-like', { preload: preload, create: create, update: update, render: render });

function preload () {
	 game.load.atlasJSONHash('sprites', 'sprites/default.png', 'sprites/default.jsona');
}

function create () {
	game.world.setBounds(0, 0, 1200, 1200);
	game.stage.smoothed = false;

	initBackground();
	initMap();
	initPlayer();	
	initInput();
}

function update () {
}

function render() {
	game.debug.renderShadow = false;
	game.debug.cameraInfo(game.camera, 32, 32, '#FF0000');
    game.debug.spriteCoords(game.player.sprite, 32, 500, '#FF0000')
}

function initBackground() {
	this.game.stage.backgroundColor = '#000000';
}