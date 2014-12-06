var Abstract = require('../utils/Abstract')
var Queue = require('./Queue')

module.exports = Object.create( Abstract )
.extend({

	init: function() {
		this.pipes = [];
		this.queues = [];
	},

	addPipe: function(pipe) {
		this.pipes.push(pipe);
	},

	addQueue: function(input, size, output) {
		var queue = Object.create( Queue ) ;
		queue.init(size);
		input.addOutput(queue);
		output.addInput(queue);
	},

	update: function() {
		for(var i = this.pipes.length; i-- ;) {
			this.pipes.consume();
		}
		for(var i = this.pipes.length; i-- ;) {
			this.pipes.produce();
		}
	},

})