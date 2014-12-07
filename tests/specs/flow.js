var factory = require('../sampleFactory')
   , flow = require('../../js/system/flow')
   , token = require('../../js/model/Token')

var sanity = function( graph ){
    //TODO
    // check for token duplication
}
/*
describe('flow ', function(){

    describe('dummy ', function(){

        beforeEach(function(){
            this.block = factory.get(2)
            this.graph = flow.buildFormBlocks( this.block )
            this.token = Object.create( token ).init()
        })

        describe('should pass after one iteration ', function(){

            beforeEach(function(){
                this.graph.entries[0].outTokens.push( this.token )
                flow.iterateFlow( this.graph.exits )
            })

            it('token should have passed', function(){
                expect( this.graph.exits[0].waitBuffer.length ).toBe(1)
                expect( this.graph.exits[0].waitBuffer[0] ).toBe(this.token)
            })

            it('graph sanity', function(){
                sanity( this.graph )
            })

        })

    })
})
*/
