var Abstract = require('../utils/Abstract'),
	Block = require('../model/Block')

var init = function(kitchen) {
	this.kitchen = kitchen ;
	this.selected = null ;
}

var update = function() {
	var self = this ;

	this.kitchen.blocks.forEach( function(block){
		if( block._sprite && !block._callbackDelete ){
			block._sprite.mousedown = function(event) {
				var position = { x: Math.floor(event.global.x / 48), y: Math.floor(event.global.y / 48 )};
				var block = self.kitchen.getBlock(position.x, position.y)
				if(block)
					self.selected = block;
			}

			block._sprite.mouseup = function(event) {
				self.selected = null ;
			}

			block._sprite.mouseupoutside = function(event) {
				var position = { x: Math.floor(event.global.x / 48), y: Math.floor(event.global.y / 48 )};
				if (position.x > 16)
					self.kitchen.removeBlock(self.selected);
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