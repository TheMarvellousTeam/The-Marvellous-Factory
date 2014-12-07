var Abstract = require('../utils/Abstract')
  , machineSpec = require('../data/machine')
  , pipe = require('./Pipe')


var create = function( block ){
    var base;
    switch( block.type ){

        case 'dummy' :
            base = dummy
            break

        default :
            base = generic
            break
    }

    var pipe = Object.create( base ).init()
    pipe.maxStorage = (machineSpec[ block.type ]||{}).storage || 1
    pipe.recipes = (machineSpec[ block.type ]||{}).recipes || []

    return pipe
}

var dummy = Object.create(pipe).extend({
    tokenAcceptable : function(token){
        // always accept
        return this.waitBuffer.length + this.outTokens.length < this.maxStorage
    },
    processToken : function(){

        pipe.processToken.call(this)

        // instant transfert
        this.outTokens = this.outTokens.concat(this.waitBuffer.splice(0,Infinity))
    },
})

var generic = Object.create(pipe).extend({
})


module.exports = {
     create: create
}
