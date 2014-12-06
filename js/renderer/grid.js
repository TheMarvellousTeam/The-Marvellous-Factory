var PIXI = require('pixi.js')


var init = function( info ){
    this.layer = new PIXI.DisplayObjectContainer;

    this.tileSize = info.tileSize

    this.grid = initGridSprite( this.tileSize )
    this.layer.addChild( this.grid )

    return this
}

var initGridSprite = function( ts  ){
    var width = 16
    var height = 16
    var graphics = new PIXI.Graphics();


    graphics.lineStyle(1, 0x999999, 1);

    for(var x=width;x--;) {
        graphics.moveTo(x*ts, 0);
        graphics.lineTo(x*ts, height*ts);
    }
    for(var y=height;y--;) {
        graphics.moveTo(0, y*ts);
        graphics.lineTo(width*ts, y*ts);
    }

    return graphics
}

var render = function( kitchen ){
}

module.exports = {
    render : render,
    init: init
}
