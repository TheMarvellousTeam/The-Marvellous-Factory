var pipeFactory = require('../../js/model/PipeFactory')

describe('machine ', function(){

    beforeEach(function(){
        this.pipe = pipeFactory.create({type: 'machine1'})
    })

    describe('tokenAcceptable ', function(){

        describe('no link with recipe ', function(){
            it(' should not accept',function(){
                expect( this.pipe.tokenAcceptable({type:'zob'}) ).toBe( false )
            })
        })
        describe('in recipe ', function(){
            it(' should accept', function(){
                expect( this.pipe.tokenAcceptable({type:'A'}) ).toBe( true )
            })
        })

        describe('to many token for this type ', function(){
            it(' should not accept', function(){
                this.pipe.tokenAcceptable({type:'A'})
                this.pipe.waitBuffer = [{type: 'A'},{type: 'A'},{type: 'A'}]
                expect( this.pipe.tokenAcceptable({type:'A'}) ).toBe( false )
            })
        })

        describe('last token for this type ', function(){
            it(' should accept', function(){
                this.pipe.tokenAcceptable({type:'B'})
                this.pipe.waitBuffer = [{type: 'A'},{type: 'B'}]
                expect( this.pipe.tokenAcceptable({type:'A'}) ).toBe( true )
            })
        })
    })
})
