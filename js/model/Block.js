var Abstract = require('../utils/Abstract')

var getSymbols = function( symbol ){
    var points = [];
    for(var x=this.shapes.length; x--; )
    for(var y=this.shapes.length; y--; )
        if( this.shapes[x][y] == symbol )
            points.push({x:x, y:y})
    return points
}

module.exports = Object.create( Abstract )
.extend({
    getInputs : getSymbols.bind(this,2),
    getOutputs : getSymbols.bind(this,3)
})
