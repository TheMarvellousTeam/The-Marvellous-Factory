var ed = require('../system/eventDispatcher')
  , machine = require('../data/machine')
  , Block = require('../model/Block')


var init = function( modelBall ){

    this.controlState = modelBall.controlState
    this.kitchen = modelBall.kitchen

    ed.listen( 'ui-shop-mousedown' , shopMouseDown.bind( this ) , this )

    this.documentMouseDown = documentMouseDown.bind( this )

    return this
}

var documentMouseDown = function(){
    if( this.controlState.pose )
        cleanUp.call(this);
}

var shopMouseDown = function( data ){

    if( this.controlState.pose ){

        if( this.controlState.pose.accept ){

            // create a block

            this.kitchen.addBlock()

        }

        cleanUp.call(this);
        return
    }

    document.addEventListener('mousedown', this.documentMouseDown, false)

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

    ed.unlisten( 'scene-mouseup' , this )
    ed.unlisten( 'scene-mousemove' , this )

    this.controlState.pose = null
}

var mousemove = function( data ){
    console.log( data )

    var m = this.controlState.pose.machine

    var y = data.gridY - m.shape.length / 2
    var x = data.gridX - m.shape[0].length /2

    m.origin = {
        x: Math.floor( x ),
        y: Math.floor( y )
    }

    this.controlState.pose.accept = this.kitchen.check( m.shape , m.origin )

}
var mouseup = function( data ){

}


module.exports = {
    init: init
}
