var Abstract = require('../utils/Abstract'),
	Block = require('../model/Block')

var init = function(store, kitchen) {
	this.kitchen = kitchen ;

	this.store = store ;

	this.selected = null ;

	var self = this ;

	this.store.blocks.forEach( function(block){
		if( block._sprite ){
			block._sprite.mouseup = function(event) {
				self.selected = null ;
			}

			block._sprite.mousedown = function(event) {
				self.selected = block ;
			}

			block._sprite.mouseupoutside = function(event) {

				var position = { x: Math.floor(event.global.x / 48), y: Math.floor(event.global.y / 48 )};

				if( self.kitchen.check(self.selected.shape, position) ){
					var newBlock = Object.create(Block).clone(self.selected);
					newBlock.origin = position;
					self.kitchen.addBlock(newBlock);
				}
				self.selected = null;
			}
		}
	})

}

module.exports = Object.create( Abstract )
.extend({
    init : init
})