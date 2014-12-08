var Abstract = require('../utils/Abstract')
  , machineSpec = require('../data/machine')
  , pipe = require('./Pipe')
  , Token = require('./Token')
  , ed = require('../system/eventDispatcher')


var create = function( block ){
    var base;
    switch( block.type ){

        case 'dummy' :
            base = dummy
            break

        case 'emiter' :
            base = emiter
            break

        case 'conveyor' :
            base = conveyor
            break

        case 'receiver':
            base = receiver
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

var recipeWithToken = function( recipes, tokenType ){
    for(var k = recipes.length; k--;)
        if( recipes[k].inputs[tokenType] || recipes[k].inputs['all'] )
            return recipes[k]
}
var containsEveryThingForRecipe = function( recipe, pool ){
    if( recipe.inputs.all )
        return pool.length >= recipe.inputs.all
    for( var type in recipe.inputs )
        if( pool.reduce(function(v,t){ return v + (t.type==type) },0) < recipe.inputs[type] )
            return false
    return true
}

var generic = Object.create(pipe).extend({
    tokenAcceptable : function(token){

        if( this.processing || this.waitBuffer.length + this.outTokens.length >= this.maxStorage)
            return false

        var recipe

        // grab the recipe, either the one pending, or one possible with this token, or null
        if( !(recipe = this.currentRecipe = this.currentRecipe || recipeWithToken( this.recipes , token.type ) ) )
            return false

        // recipe accept all
        if( recipe.inputs.all )
            return ( this.waitBuffer.length == 0  || this.waitBuffer[0].type == token.type )

        // does we have enougth token of this type for the recipe ?
        var sameTypeAlreadyIn = this.waitBuffer.reduce(function(v,t){
            return v + (t.type==token.type)
        },0)
        if ( sameTypeAlreadyIn < recipe.inputs[token.type] )
            return true

        return false
    },
    process : function(){

        if( this.processing ){
            if(  this.d -- <= 0 ){

                //// end of recipe
                var recipe = this.currentRecipe

                // calc the max age
                var age = this.waitBuffer.reduce(function(v,t){
                    return Math.max(v,t.age)
                },0)

                // create new tokens
                for( var type in recipe.outputs )
                    for ( var k=recipe.outputs[type]; k--;){
                        if( type == 'all' )
                            type = this.waitBuffer[0].type
                        var out = Object.create( Token ).init({type: type})
                        out.age = age
                        this.outTokens.push( out )
                        out.entrerInPipe( this )
                    }

                // remove inputs
                var age = this.waitBuffer.forEach(function(t){
                    t.remove()
                })
                this.waitBuffer.length=0

                this.processing = false
                this.currentRecipe = null
            }
        }else if( this.currentRecipe ){
            if ( containsEveryThingForRecipe( this.currentRecipe , this.waitBuffer ) ){
                // start recipe
                this.processing = true
                this.d = this.currentRecipe.delay
            }
        }

    },
})

var emiter = Object.create(pipe).extend({
    tokenAcceptable : function(token){
        return false
    },
    process : function(){

        this.d = (this.d || 0) + 1

        if ( this.d >= 200 && this.waitBuffer.length + this.outTokens.length < this.maxStorage ){
            this.d = 0

            var token = Object.create( Token ).init({type: this.machine.tokenType})

            this.outTokens.push( token )
            token.entrerInPipe( this )
        }
    },
})

var conveyor = Object.create(pipe).extend({
    tokenAcceptable : function(token){
        // always accept
        return this.waitBuffer.length + this.outTokens.length < this.maxStorage
    },
    process : function(){

        for( var i = this.waitBuffer.length; i--;)
            if( this.waitBuffer[i].age - this.waitBuffer[i].ageInPipe > 110 )
                this.outTokens.push( this.waitBuffer.splice(i,1)[0] )

    },
})

var receiver = Object.create(pipe).extend({
    tokenAcceptable: function(token){
        return true;
    },
    process: function(){
        for( var i = this.waitBuffer.length; i--; ){
            ed.dispatch('receive-token', {
                token: this.waitBuffer[i]
            });
            this.waitBuffer[i].remove();
        }
    },
})

module.exports = {
     create: create
}
