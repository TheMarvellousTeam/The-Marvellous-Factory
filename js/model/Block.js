var Abstract = require('../utils/Abstract')
  , machine = require('../data/machine')
  , ed = require('../system/eventDispatcher')

/*
 * shapes : [][] contains for each cells :
 *     - 0 empty cell
 *     - 1 machine cell
 *     - 2 input cell ( does not belong to the machine )
 *     - 3 output cell ( does belong to the machine )
 */


var getSymbols = function( symbol ){
    var points = [];
    for(var y=this.shape.length; y--; )
    for(var x=this.shape[y].length; x--; )
        if( this.shape[y][x] == symbol )
            points.push({x:x+this.origin.x, y:y+this.origin.y})
    return points
}

var clone = function(block) {
	this.shape=[]
	for(var y=block.shape.length; y--; ){
		this.shape[y] = [];
    	for(var x=block.shape[y].length; x--; ){
    		this.shape[y][x]=block.shape[y][x];
    	}
	}
	return this;
}

var init = function( type ){

    this.type = type

    this.shape = []
    for(var y=machine[ type ].shape.length;y--;){
        this.shape[y] = []
        for(var x=machine[ type ].shape[y].length;x--;){
            this.shape[y][x] = machine[ type ].shape[y][x]
        }
    }

    this.origin = {
        x: 0,
        y: 0
    }

    ed.dispatch( 'machine-spawn', {
        machine: this
    })

    return this
}

var remove = function(){
    ed.dispatch( 'machine-removed', {
        machine: this
    })
}

module.exports = Object.create( Abstract )
.extend({
    getInputs : function(){ return getSymbols.call(this,2)},
    getOutputs : function(){ return getSymbols.call(this,3)},
    clone: clone,
    init: init,
    remove: remove
})
