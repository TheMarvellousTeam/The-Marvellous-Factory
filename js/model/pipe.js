var Abstract = require('../utils/Abstract')

var bufferSize = function(type) {
	switch(type) {
		default:
			return 1;
	}
}

var production = function(type) {
	switch(type){
		default:

	}
}

module.exports = Object.create( Abstract )
.extend({
	init: function(type) {
		this.type = type ;
		this.bufferSize = 1 ;
	},

	addInput: function(input) {
		this.input.push(input);
	},

	addOutput: function(output) {
		this.output.push(output);
	},

	getBufferSize: function(){
		return bufferSize(this.type);
	}

	consume: function(){
		for(var i=this.input.length; i-- ;) {
			this.buffer.push(this.input[i].next());
		}
	},

	produce: function() {
		production.call(this, this.type);
	},
})
