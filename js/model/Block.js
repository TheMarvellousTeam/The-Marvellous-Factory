var Abstract = require('../utils/Abstract')

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

module.exports = Object.create( Abstract )
.extend({
    getInputs : function(){ return getSymbols.call(this,2)},
    getOutputs : function(){ return getSymbols.call(this,3)},
    clone: clone
})
