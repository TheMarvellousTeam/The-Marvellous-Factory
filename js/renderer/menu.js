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
            block._sprite = sprite ;
            layer.addChild(sprite)
        }

        var text;
        if(!(text = block._text)){
            text = initText(block)
            block._text = text ;
            layer.addChild(text)
        }

        sprite.position.x = block.origin.x + 100 ;
        sprite.position.y = block.origin.y ;
        text.position.x = block.origin.x ;
        text.position.y = block.origin.y ;
	})
}

var initText = function(block) {
    var text = new PIXI.Text(block.type + "\n$" + block.price, {font:"14px Arial", fill:"red"});
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
    container.interactive = true;

    var color = 0|(Math.random()*(255*255*255))

    for(var y=block.shape.length; y--; )
    for(var x=block.shape[y].length; x--; )
        {
            if( block.shape[y][x] == 1 || block.shape[y][x] == 3 )
            {
                var square = initSquareSprite( ts , color )
                square.position.x = x*ts
                square.position.y = y*ts

                container.addChild( square )
            }
            if( block.shape[y][x] == 2 )
            {
                var round = new PIXI.Graphics();

                round.beginFill( 0xAB1298 , 0.5 );

                round.moveTo(ts*0.2,ts*0.2);
                round.lineTo(ts*0.6, ts*0.2);
                round.lineTo(ts*0.6, ts*0.6);
                round.lineTo(ts*0.2, ts*0.6);
                round.lineTo(ts*0.2, ts*0.2);

                round.position.x = (x)*ts
                round.position.y = (y)*ts

                container.addChild( round )
            }
            if( block.shape[y][x] == 3 )
            {
                var round = new PIXI.Graphics();

                round.beginFill( 0xba120a , 0.5 );

                round.moveTo(ts*0.2,ts*0.2);
                round.lineTo(ts*0.4, ts*0.2);
                round.lineTo(ts*0.4, ts*0.4);
                round.lineTo(ts*0.2, ts*0.4);
                round.lineTo(ts*0.2, ts*0.2);

                round.position.x = (x+0.2)*ts
                round.position.y = (y+0.2)*ts

                container.addChild( round )
            }
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
