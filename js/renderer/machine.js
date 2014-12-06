var PIXI = require('pixi.js')


var init = function( info ){
    this.layer = new PIXI.DisplayObjectContainer;

    this.tileSize = info.tileSize


    return this
}

var initBlockSprite = function( block , ts ){
    var graphics = new PIXI.Graphics();

    // set a fill and line style
    graphics.beginFill(0xFF3300);
    graphics.lineStyle(1, 0xffd900, 1);


    // draw a shape
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
