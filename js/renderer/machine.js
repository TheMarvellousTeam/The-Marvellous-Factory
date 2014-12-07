var PIXI = require('pixi.js')


var init = function( info ){
    this.layer = new PIXI.DisplayObjectContainer;

    this.tileSize = info.tileSize

    return this
}

var initBlockSprite = function( block , ts ){
    var container = new PIXI.DisplayObjectContainer;

    for(var y=block.shape.length; y--; )
    for(var x=block.shape[y].length; x--; )
        if( block.shape[y][x] )
        {
            var square = initSquareSprite( ts , block.shape[y][x] == 1 ? 0x126712 : block.shape[y][x] == 2 ? 0x363212 : 0x451200 )
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

var renderId=0
var render = function( blocks ){
    var layer = this.layer
    var ts =this.tileSize

    renderId ++
    blocks.forEach(function(block){
        var sprite;
        if (!(sprite = block._sprite)){
            sprite = initBlockSprite( block , ts )
            layer.addChild(sprite)
        }

        sprite._m_renderId = renderId

        // alter sprite geometry
        sprite.position.x = block.origin.x * ts
        sprite.position.y = block.origin.y * ts
    });


    // TODO clean up useless sprite
    this.layer.children

}

module.exports = {
    render : render,
    init: init
}
