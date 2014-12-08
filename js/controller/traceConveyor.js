var ed = require('../system/eventDispatcher')
  , grid = require('../system/grid')
  , machine = require('../data/machine')
  , Block = require('../model/Block')


var init = function( modelBall ){

    this.controlState = modelBall.controlState
    this.kitchen = modelBall.kitchen

    ed.listen( 'ui-shop-conveyor-mousedown' , shopMouseDown.bind( this ) , this )

    this.documentMouseDown = documentMouseDown.bind( this )


    this.find = grid.findAround.bind( null, this.kitchen.availablesCells )
    this.acceptableStart = function( x,y ){
        return this.kitchen.availablesCells[y][x] == 0
    }

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

    this.controlState.conveyor.accept = this.acceptableStart(x,y)
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

    var path = this.controlState.conveyor.path

    // analyse the path
    var input0 = this.find( 3 , path[0].x, path[0].y )
    var output0 = this.kitchen.availablesCells[ path[0].y ][ path[0].x ] == 2

    var inputL = this.find( 3 , path[path.length-1].x, path[path.length-1].y )
    var outputL = this.kitchen.availablesCells[ path[path.length-1].y ][ path[path.length-1].x ] == 2

    // consistent branching
    if( !( input0.length>0 && inputL.length>0 ) && !( output0 && outputL ) ){

        if( inputL.length>0 ){
            path.reverse()

            var tmp = input0
            input0 = inputL
            inputL = tmp
        }

        var o
        if( input0.length>0 ){
            o = input0[0]
        }else{
            o = {
                x: path[0].x,
                y: path[0].y+1
            }
        }


        var getShapeFor = function( start, end , b ){
            if( start.x - end.x == -1 ){
                b.shape = [[2,3]]
                b.origin.x = start.x
                b.origin.y = start.y
            }

            else if( start.x - end.x == 1 ){
                b.shape = [[3,2]]
                b.origin.x = end.x
                b.origin.y = end.y
            }

            else if( start.y - end.y == -1 ){
                b.shape = [[3],[2]]
                b.origin.x = start.x
                b.origin.y = start.y
            }

            else if( start.y - end.y == 1 ){
                b.shape = [[2],[3]]
                b.origin.x = end.x
                b.origin.y = end.y
            }
        }

        for(var i=0;i<path.length;i++){

            var k = path[i]
            var b = Object.create( Block ).init('conveyor')
            b.shape = []
            getShapeFor( o , k , b )
            this.kitchen.addBlock( b )

            o=k
        }


    }

    cleanUp.call(this)
}


module.exports = {
    init: init
}
