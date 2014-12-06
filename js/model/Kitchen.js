var Abstract = require('../utils/Abstract')


var init = function(width, height){

    this.width = width;
    this.height = height;

    this.blocks = []
    this.availablesCells = []
    for(var i=height;i--;)
        this.availablesCells.push(new Array(width))
    return this
}

var check = function(shape,origin) {
    for(var y=shape.length; y--; )
    for(var x=shape[y].length; x--; )
        if( (shape[y][x] == 1 || shape[y][x] == 3 ) &&
            y+origin.y < 0 || y+origin.y >= this.height ||
            x+origin.x < 0 || x+origin.x >= this.width ||
            this.availablesCells[y+origin.y][x+origin.x] )
            return false
    return true
}

var addBlock = function(block) {
    for(var y=block.shape.length; y--; )
    for(var x=block.shape[y].length; x--; )
        if( block.shape[y][x] == 1 || block.shape[y][x] == 3 )
            this.availablesCells[y+block.origin.y][x+block.origin.x] = 1;
    this.blocks.push(block)
    return this
}

var removeBlock = function(block) {
    for(var y=block.shape.length; y--; )
    for(var x=block.shape[y].length; x--; )
        if( block.shape[y][x] == 1 || block.shape[y][x] == 3 )
            this.availablesCells[y+origin.y][x+origin.x] = 1;
    this.blocks.splice( this.blocks.indexOf(block), 1 )
    return this
}

module.exports = Object.create( Abstract )
.extend({
    reset : function(){
        this.init( this.width, this.height )
        return this
    },
    check : check,
    init : init,
    addBlock : addBlock,
    removeBlock : removeBlock
})