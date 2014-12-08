var Shop = require('./shop')

var init = function(){
    this.shop = Object.create(Shop).init()
}

var build = function(){
    
}

module.exports = {
    init: init
}
