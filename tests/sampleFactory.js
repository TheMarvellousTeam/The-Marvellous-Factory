var samples = require('./samples'),
    block = require('../js/model/Block')

var get = function( k ){
    return samples[(0|k)%samples.length].blocks
    .map(function(o){
        return Object.create(block).extend( o )
    })
}

var copyKitchen = function( kitchen , k ){

    var s = samples[(0|k)%samples.length]

    kitchen.init( s.width , s.height )

    s.blocks
    .map(function(o){
        return Object.create(block).extend( o )
    })
    .forEach(kitchen.addBlock.bind(kitchen))

    return kitchen
}


module.exports = {
    get : get,
    copyKitchen : copyKitchen
}
