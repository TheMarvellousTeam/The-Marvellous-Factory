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

    token.entrerInPipe( this )

    this.waitBuffer.push(token)
}
var process = function( token ){

}

module.exports = Object.create( Abstract )
.extend({
    init: init,
    tokenAcceptable : tokenAcceptable,
    process : process,
    consumeToken: consumeToken
})
