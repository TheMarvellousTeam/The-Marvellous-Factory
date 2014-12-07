var Abstract = require('../utils/Abstract')
  , Pipe = require('../model/Pipe')

var init = function(){
    return this
}


// ancestor in in|out
var getRoots = function( node , ancestor ){
    var parents = node[ancestor].reduce(function(soFar, parent){
        return merge( soFar , getRoots(parent, ancestor) )
    },[])
    if( parents.length )
        return parents
    else
        return [node]
}

// merge array B in array A without duplication ( side effect on A )
var merge = function( A , B ){
    return A.concat( B.filter(function( node ){
        return A.indexOf( node ) < 0
    }))
}

var buildFormBlocks = function( blocks ){

    var done = []

    //build the graph
    for(var i=blocks.length; i--;){

        var A = Object.create( Pipe ).init( blocks[i] )

        blocks[i].pipe = A

        var Ai = blocks[i].getInputs()
        var Ao = blocks[i].getOutputs()

        for(var k=done.length;k--;){

            var B = done[k].node

            var Bo = done[k].outPoints
            var Bi = done[k].inPoints

            // search match with A input and B ouput
            for( var u=Ai.length;u--;)
            for( var v=Bo.length;v--;)
                if( Ai[u].x == Bo[v].x && Ai[u].y == Bo[v].y ){
                    A.in.push( B )
                    B.out.push( A )
                }

            // search match with A ouput and B input
            for( var u=Ao.length;u--;)
            for( var v=Bi.length;v--;)
                if( Ao[u].x == Bi[v].x && Ao[u].y == Bi[v].y ){
                    A.out.push( B )
                    B.in.push( A )
                }
        }

        done.push({
            node : A,
            outPoints : Ao,
            inPoints : Ai
        })
    }

    // determine the root elements
    return {
        entries : done.reduce(function( soFar , el ){
            return merge( soFar , getRoots( el.node , 'in') )
        },[]),

        exits : done.reduce(function( soFar , el ){
            return merge( soFar , getRoots( el.node , 'out') )
        },[]),
    }
}

var iterateFlow = (function(){

    var rec_follow_stream = function( pipe ){

        // 1 the pipe consume token from the pipe branched to the input
        //   if the token does not belong in any recipe for the pipe, trash it
        //   else pass it to the pipe transform function
        //   if the transform function buffer is full, trash the oldest token to make room

        // 2 apply transformations on the token stored
        //   eventually leads to emit a token on the outside buffer

        // the capacity of the waiting to transform buffer + the outside buffer should not exeed the maximal buffer capacity
        // -> transformation can not create more ressource than it reauire

        // 3 propage to the inputs

        // 1
        for(var i=pipe.in.length; i--;){

            var outTokens = pipe.in[i].outTokens

            // consume
            for( var k=outTokens.length; k--;)
                if( pipe.tokenAcceptable( outTokens[k] ) )
                    pipe.consumeToken( outTokens.splice(k,1)[0] )
        }

        // 2
        pipe.process()

        // 3
        for(var i=pipe.in.length; i--;)
            rec_follow_stream( pipe.in[i] )

    }

    return function( exits ){
        exits.forEach(rec_follow_stream)
    }

})()



module.exports = Object.create( Abstract )
.extend({
    init: init,
    buildFormBlocks : buildFormBlocks,
    iterateFlow: iterateFlow
})
