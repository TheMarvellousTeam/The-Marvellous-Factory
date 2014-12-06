var PIXI = require('pixi.js')


var init = function(){
    this.stage = new PIXI.Stage(0xFFFFFF);

    return this
}

var tileSize = 50

var initBlockSprite = function( block ){
    var graphics = new PIXI.Graphics();

    // set a fill and line style
    graphics.beginFill(0xFF3300);
    graphics.lineStyle(1, 0xffd900, 1);


    // draw a shape
    graphics.moveTo(0,0);
    graphics.lineTo(tileSize, 0);
    graphics.lineTo(tileSize, tileSize);
    graphics.lineTo(0, tileSize);
    graphics.lineTo(0, 0);

    return graphics
}

var renderId=0
var render = function( blocks ){
    var stage = this.stage

    renderId ++
    blocks.forEach(function(block){
        var sprite;
        if (!(sprite = block._sprite)){
            sprite = initBlockSprite( block )
            stage.addChild(sprite)
        }

        sprite._m_renderId = renderId

        // alter sprite geometry
        sprite.position.x = block.origin.x
        sprite.position.y = block.origin.y
    });


    // TODO clean up useless sprite
    this.stage.children

}

module.exports = {
    render : render,
    init: init
}
