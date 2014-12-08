var ed = require('../system/eventDispatcher')


var init = function( modelBall ){

    ed.listen( 'ui-shop-mousedown' , shopMouseDown.bind( this ) , this )

    this.documentMouseDown = documentMouseDown.bind( this )

    return this
}

var documentMouseDown = function(){
    if( this.dragging )
        cleanUp.call(this);
}

var shopMouseDown = function( data ){

    if( this.dragging ){


        return
    }

    document.addEventListener('mousedown', this.documentMouseDown, false)

    ed.listen( 'scene-mouseup' , mouseup.bind( this ) , this )
    ed.listen( 'scene-mousemove' , mousemove.bind( this ) , this )

    window.setTimeout(function(){this.dragging=true}.bind(this),0)
}

var cleanUp = function( ){

    document.removeEventListener('mousedown', this.documentMouseDown, false)

    ed.unlisten( 'scene-mouseup' , this )
    ed.unlisten( 'scene-mousemove' , this )

    this.dragging = false
}

var mousemove = function( data ){
    console.log( data )

}
var mouseup = function( data ){

}


module.exports = {
    init: init
}
