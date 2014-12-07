var ed = require('./eventDispatcher')
  , flow = require('./flow')
  , token = require('../model/token')


var update = function(){
    flow.iterateFlow( this.graph.exits )
}

var start = function(){
    this.graph = flow.buildFormBlocks( this.kitchen.blocks )

    ed.listen( 'update' , update.bind(this) , this )
}
var stop = function(){
    this.graph = null

    ed.unlisten( 'update' , this )
}

var init = function( modelBall ){
    this.kitchen = modelBall.kitchen

    ed.listen( 'start-production' , start.bind( this ) , this )
    ed.listen( 'stop-production' , stop.bind( this ) , this )
}



 module.exports = {
     init: init
 }
