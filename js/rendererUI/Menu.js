var Abstract = require('../utils/Abstract'),
    ed = require('../system/eventDispatcher')


var init = function() {
	var button1 = document.getElementById('menu-button1')
	button1.onmousedown = function(event){
		ed.dispatch('button1-down');
	}
	var button2 = document.getElementById('menu-button2')
	button2.onmousedown = function(event){
		ed.dispatch('button2-down');
	}
    return this;
}

var render = function() {
    
}

module.exports = Object.create( Abstract )
.extend({
    init: init,
    render: render
})
