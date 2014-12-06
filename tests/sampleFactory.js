var samples = require('./samples'),
    block = require('../js/model/Block')

var get = function( k ){
    return samples[(0|k)%samples.length].blocks
    .map(function(o){
        return Object.create(block).extend( o )
    })
}


module.exports = {
    get : get
}
