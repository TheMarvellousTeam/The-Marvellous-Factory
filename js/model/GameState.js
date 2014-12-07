var Abstract = require('../utils/Abstract')

var init = function( ){
    return this
}

module.exports = Object.create( Abstract )
.extend({
    init: init,
})
