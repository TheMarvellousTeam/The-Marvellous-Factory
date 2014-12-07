var Abstract = require('../utils/Abstract'),
    ed = require('../system/eventDispatcher')


var init = function() {
    return this;
}

var render = function() {
    
}

module.exports = Object.create( Abstract )
.extend({
    init: init,
    render: render
})
