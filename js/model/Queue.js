var Abstract = require('../utils/Abstract')

module.exports = Object.create( Abstract )
.extend({

	init: function(size) {
		this.queue=[];
		this.size=size;
	},

	next: function() {
		if( this.queue.length == this.size )
			return this.queue.shift();
	},

	add: function(item) {
		if ( this.queue.length < this.size ) {
			this.queue.push(item);
			return true;
		}
		return false ;
	},

})
