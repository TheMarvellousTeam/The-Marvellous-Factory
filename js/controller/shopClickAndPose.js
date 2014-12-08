var ed = require('../system/eventDispatcher')
  , machine = require('../data/machine')
  , Block = require('../model/Block')


var init = function( modelBall ){

    this.controlState = modelBall.controlState
    this.kitchen = modelBall.kitchen

    ed.listen( 'ui-shop-mousedown' , shopMouseDown.bind( this ) , this )

    this.documentMouseDown = documentMouseDown.bind( this )
    this.documentKeyDown = documentKeyDown.bind( this )

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
var documentKeyDown = function( e ){
    if( this.controlState.pose ){
        var m = this.controlState.pose.machine
        switch( e.which ){
            case 82 :
                rotateArray( m.shape )
                break
            case 84 :
                rotateArray( m.shape )
                rotateArray( m.shape )
                rotateArray( m.shape )
                break
            default :
                return
        }

        var y = this.controlState.pose.center.y - m.shape.length / 2 + 0.5
        var x = this.controlState.pose.center.x - m.shape[0].length /2 + 0.5

        m.origin = {
            x: Math.floor( x ),
            y: Math.floor( y )
        }

        this.controlState.pose.accept = this.kitchen.check( m.shape , m.origin )
    }
}

var shopMouseDown = function( data ){

    cleanUp.call(this)

    document.addEventListener('mousedown', this.documentMouseDown, false)
    document.addEventListener('keydown', this.documentKeyDown, false)

    ed.listen( 'scene-mousedown' , mousedown.bind( this ) , this )
    ed.listen( 'scene-mouseup' , mouseup.bind( this ) , this )
    ed.listen( 'scene-mousemove' , mousemove.bind( this ) , this )

    window.setTimeout(function(){

        var b = Object.create( Block ).init( data.id )

        this.controlState.pose = {
            machine: b,
            accept: false
        }

    }.bind(this),0)
}

var cleanUp = function( ){

    document.removeEventListener('mousedown', this.documentMouseDown, false)
    document.removeEventListener('mousedown', this.documentKeyDown, false)

    ed.unlisten( 'scene-mousedown' , this )
    ed.unlisten( 'scene-mouseup' , this )
    ed.unlisten( 'scene-mousemove' , this )

    this.controlState.pose = null
}

var mousemove = function( data ){

    var m = this.controlState.pose.machine

    this.controlState.pose.center = {
        y: data.gridY,
        x: data.gridX
    }

    var y = this.controlState.pose.center.y - m.shape.length / 2 + 0.5
    var x = this.controlState.pose.center.x - m.shape[0].length /2 + 0.5

    m.origin = {
        x: Math.floor( x ),
        y: Math.floor( y )
    }

    this.controlState.pose.accept = this.kitchen.check( m.shape , m.origin )

}
var mousedown = function( data ){
    // TODO check left button
    pose.call( this )
}
var mouseup = function( data ){
    pose.call( this )
}

var pose = function(){
    if( this.controlState.pose.accept )
        this.kitchen.addBlock( this.controlState.pose.machine )
    cleanUp.call( this )
}


module.exports = {
    init: init
}
