var Abstract = require('../utils/Abstract'),
	Block = require('../model/Block')

var init = function(kitchen) {
	this.kitchen = kitchen ;
}

var update = function() {
	var self = this ;

	this.kitchen.blocks.forEach( function(block){
		if( block._sprite && !block._callbackDelete ){
			block._sprite.mousedown = function(event) {
				var position = { x: Math.floor(event.global.x / 48), y: Math.floor(event.global.y / 48 )};
				var block = self.kitchen.getBlock(position.x, position.y)
				if(block)
					self.kitchen.removeBlock(block)
			}

			block._callbackDelete = true;
		}
	})
}

module.exports = Object.create( Abstract )
.extend({
    init : init,
    update : update
})