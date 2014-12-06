var Abstract = require('../utils/Abstract')

var init = function(){
    this.in = []
    this.out = []
    return this
}


module.exports = Object.create( Abstract )
.extend({
    init: init
})
