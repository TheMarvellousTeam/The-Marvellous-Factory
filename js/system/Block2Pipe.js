var Abstract = require('../utils/Abstract')
var Pipe = require('../model/Pipe')
var Graph = require('../model/Graph')


module.exports = Object.create( Abstract )
.extend({

	compute: function(blocks) {
		var graph = Object.create(Graph);
		var pipes = [];

		for(var i = 0; i < blocks.length ; i++) {

			var pipe = Object.create(Pipe); 
			pipe.init('you_need_to_set_the_type');

			pipes.push(pipe);
			graph.addPipe(pipe);
		}

		for(var i=blocks.length; i-- ;) {
			var inputs = blocks[i].getInputs();

			for(var j=blocks.length; j--;) {
				if ( j==i )
					continue ;

				var outputs = blocks[j].getOutputs();

				var done = false ;
				for (var k=inputs.length; k-- && !done;) {
					for(var l=outputs.length; l-- && !done;) {

						if( inputs[k] == outputs[l] ){
							graph.addQueue( pipes[j], pipes[i].bufferSize, pipes[i] );
							done = true ;
						}

					}
				}

			}

		}
		return graph;
	},

})
