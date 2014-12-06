var PIXI = require('pixi.js')


var init = function( info ){
    this.layer = new PIXI.DisplayObjectContainer;

    this.tileSize = info.tileSize

    return this
}

var initBlockSprite = function( block , ts ){
    var container = new PIXI.DisplayObjectContainer;

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

    graphics.beginFill( color , 0.2 );

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
