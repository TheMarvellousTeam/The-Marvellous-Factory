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
				console.log('clic on '+block.type);
			}

			block._sprite.mouseupoutside = function(event) {

				var newBlock = Object.create(Block).clone(self.selected);

				console.log(self.selected.type+' released');
				self.selected = null;

				newBlock.origin = { x: Math.floor(event.global.x / 48), y: Math.floor(event.global.y / 48 )};
				self.kitchen.addBlock(newBlock);
			}
		}
	})

}

module.exports = Object.create( Abstract )
.extend({
    init : init
})