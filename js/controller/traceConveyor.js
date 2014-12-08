var ed = require('../system/eventDispatcher')
  , machine = require('../data/machine')
  , Block = require('../model/Block')


var init = function( modelBall ){

    this.controlState = modelBall.controlState
    this.kitchen = modelBall.kitchen

    ed.listen( 'ui-shop-conveyor-mousedown' , shopMouseDown.bind( this ) , this )

    this.documentMouseDown = documentMouseDown.bind( this )

    return this
}


var rotateArray = function( a ){
    var r = []
    for(var x=a[0].length;x--;){
        r[x] = []
        for(var y=a.length;y--;)
            r[x][y] = a[y][ a[0].length - 1 - x]
    }
    a.length = 0
    a.push.apply( a, r )
}

var documentMouseDown = function(){
    if( this.controlState.pose )
        cleanUp.call(this);
}

var shopMouseDown = function( data ){

    cleanUp.call(this)

    document.addEventListener('mousedown', this.documentMouseDown, false)

    ed.listen( 'scene-mousedown' , mousedown1.bind( this ) , 'conv1' )
    ed.listen( 'scene-mousemove' , mousemove1.bind( this ) , 'conv1' )

    window.setTimeout(function(){



        this.controlState.conveyor = {
            path : [ {x:0, y:0} ]
        }

    }.bind(this),0)
}

var cleanUp = function( ){

    document.removeEventListener('mousedown', this.documentMouseDown, false)

    ed.unlisten( 'scene-mousedown' , 'conv1' )
    ed.unlisten( 'scene-mousemove' , 'conv1' )

    ed.unlisten( 'scene-mousemove' , 'conv2' )
    ed.unlisten( 'scene-mouseup' , 'conv2' )

    this.controlState.conveyor = null
}

var mousemove1 = function( data ){

    var path = this.controlState.conveyor.path

    var x = Math.round( data.gridX - 0.5 )
    var y = Math.round( data.gridY - 0.5 )

    path[0].x = x
    path[0].y = y
}
var mousedown1 = function( data ){

    ed.unlisten( 'scene-mousedown' , 'conv1' )
    ed.unlisten( 'scene-mousemove' , 'conv1' )

    ed.dispatch( 'scene-start-drag' )

    ed.listen( 'scene-mouseup' , mouseup2.bind( this ) , 'conv2' )
    ed.listen( 'scene-mousemove' , mousemove2.bind( this ) , 'conv2' )
}

var mousemove2 = function( data ){

    var path = this.controlState.conveyor.path

    var x = Math.round( data.gridX - 0.5 )
    var y = Math.round( data.gridY - 0.5 )

    for( var i=0;i<path.length;i++)
        if( path[i].x ==x && path[i].y ==y )
            break

    path.splice(i,Infinity,{x:x,y:y})

}
var mouseup2 = function( data ){

    ed.dispatch( 'scene-stop-drag' )

    cleanUp.call(this)
}


module.exports = {
    init: init
}
