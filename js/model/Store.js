var Abstract = require('../utils/Abstract')

var init = function() {
	this.blocks = [];
}

var addBlock = function(block) {
	this.blocks.push(block);
}

module.exports = Object.create( Abstract )
.extend({
    init : init,
    addBlock : addBlock
})