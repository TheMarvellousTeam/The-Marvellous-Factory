var Abstract = require('../utils/Abstract')

var init = function( ){
    this.in = []
    this.out = []

    this.waitBuffer = [];
    this.outTokens = [];

    return this
}


var tokenAcceptable = function( token ){
    return true
}
var consumeToken = function( token ){
    /*this.waitBuffer.push({
        token : token,
        age : 0
    })*/
    this.waitBuffer.push(token)
}
var process = function( token ){

    // a step passed
    this.outTokens.concat(this.waitBuffer).forEach(function(o){
        o.age++
    })
}

module.exports = Object.create( Abstract )
.extend({
    init: init,
    tokenAcceptable : tokenAcceptable,
    process : process,
    consumeToken: consumeToken
})
