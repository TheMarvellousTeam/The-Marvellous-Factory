var Abstract = require('../utils/Abstract')
  , machineSpec = require('../data/machine')
  , pipe = require('./Pipe')
  , Token = require('../model/Token')


var create = function( block ){
    var base;
    switch( block.type ){

        case 'dummy' :
            base = dummy
            break

        case 'emiter' :
            base = emiter
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
    process : function(){
        // instant transfert
        this.outTokens = this.outTokens.concat(this.waitBuffer.splice(0,Infinity))
    },
})

var generic = Object.create(pipe).extend({
})

var emiter = Object.create(pipe).extend({
    tokenAcceptable : function(token){
        return false
    },
    process : function(){

        this.d = (this.d || 0) + 1

        if ( this.d > 200 ){
            this.d = 0

            var token = Object.create( Token ).init()

            this.outTokens.push( token )
            token.entrerInPipe( this )
        }
    },
})


module.exports = {
     create: create
}
