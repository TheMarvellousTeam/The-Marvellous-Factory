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

var merge = function( A , B ){
    return A.concat( B.filter(function( node ){
        return A.indexOf( node ) < 0
    }))
}

var buildFormBlocks = function( blocks ){

    var done = []

    //build the graph
    for(var i=blocks.length; i--;){

        var A = Object.create( Pipe ).init()

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


module.exports = Object.create( Abstract )
.extend({
    init: init,
    buildFormBlocks : buildFormBlocks
})
