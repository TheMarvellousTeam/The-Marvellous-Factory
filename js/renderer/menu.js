var PIXI = require('pixi.js')
	, Store = require('../model/Store')

var init = function(info) {
	this.layer = new PIXI.DisplayObjectContainer;

	this.border = initBorder(info);
	this.layer.x = info.tileSize * 16;
	this.layer.addChild(this.border);

	return this;
}

var render = function( store ) {
    var layer = this.layer
	store.blocks.forEach(function(block){
		var sprite;
        if (!(sprite = block._sprite)){
            sprite = initBlockSprite( block , 12 )
            layer.addChild(sprite)
        }

        var text;
        if(!(text = block._text)){
            text = initText(block)
            layer.addChild(text)
        }

        sprite.position.x = block.origin.x ;
        sprite.position.y = block.origin.y ;
        text.position.x = block.origin.x + 75 ;
        text.position.y = block.origin.y + 15 ;
	})
}

var initText = function(block) {
    var text = new PIXI.Text(block.type, {font:"14px Arial", fill:"red"});
    return text
}

var initBorder = function(info) {
    var graphics = new PIXI.Graphics();

    graphics.lineStyle(1, 0xFF0000, 1);

    graphics.moveTo(0, 0);
    graphics.lineTo(250-1, 0);
    graphics.lineTo(250-1, info.tileSize * 16 -1);
    graphics.lineTo(0, info.tileSize * 16 -1);
    graphics.lineTo(0, 0);

    return graphics ;
}

var initBlockSprite = function( block , ts ){
    var container = new PIXI.DisplayObjectContainer;

    for(var y=block.shape.length; y--; )
    for(var x=block.shape[y].length; x--; )
        if( block.shape[y][x] )
        {
            var square = initSquareSprite( ts , block.shape[y][x] == 1 ? 0x126712 : 0x451200 )
            square.position.x = x*ts
            square.position.y = y*ts

            container.addChild( square )
        }

    return container
}

var initSquareSprite = function( ts , color ){
    var graphics = new PIXI.Graphics();

    graphics.beginFill(color || 0xFF3300);

    graphics.moveTo(0,0);
    graphics.lineTo(ts, 0);
    graphics.lineTo(ts, ts);
    graphics.lineTo(0, ts);
    graphics.lineTo(0, 0);

    return graphics
}

module.exports = {
	init:init,
	render:render,
}
