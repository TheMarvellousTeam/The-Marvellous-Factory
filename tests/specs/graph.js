var factory = require('../sampleFactory')
   , flow = require('../../js/system/flow')

describe('blocks ', function(){

    describe('find the chain ', function(){

        describe('linear chain', function(){
            beforeEach(function(){
                this.blocks = factory.get(2)
                this.res = flow.buildFormBlocks( this.blocks )
            })
            it('should find entries / exits',function(){
                expect( this.res.entries.length ).toBe(1);
                expect( this.res.exits.length ).toBe(1);
            })
            it('should find consistent graph',function(){
                expect( this.res.entries[0].out.length ).toBe(1);
                expect( this.res.entries[0].in.length ).toBe(0);
                expect( this.res.exits[0].out.length ).toBe(0);
                expect( this.res.exits[0].in.length ).toBe(1);
            })
            it('should find consistent graph',function(){
                expect( this.res.entries[0] ).toBe( this.blocks[0].pipe );
            })
        })

        describe('non cyclic loop', function(){
            beforeEach(function(){
                this.res = flow.buildFormBlocks( factory.get(3) )
            })
            it('should find entries / exits',function(){
                expect( this.res.entries.length ).toBe(1);
                expect( this.res.exits.length ).toBe(1);
            })
            it('should find consistent graph',function(){
                expect( this.res.entries[0].out.length ).toBe(2);
                expect( this.res.entries[0].in.length ).toBe(0);
                expect( this.res.exits[0].out.length ).toBe(0);
                expect( this.res.exits[0].in.length ).toBe(2);
            })
        })

        describe('fork entry', function(){
            beforeEach(function(){
                this.res = flow.buildFormBlocks( factory.get(4) )
            })
            it('should find entries / exits',function(){
                expect( this.res.entries.length ).toBe(2);
                expect( this.res.exits.length ).toBe(1);
            })
            it('should find consistent graph',function(){
                expect( this.res.entries[0].out.length ).toBe(1);
                expect( this.res.entries[0].in.length ).toBe(0);
                expect( this.res.entries[1].out.length ).toBe(1);
                expect( this.res.entries[1].in.length ).toBe(0);
                expect( this.res.exits[0].out.length ).toBe(0);
                expect( this.res.exits[0].in.length ).toBe(2);
            })
        })

        describe('parallel chains', function(){
            beforeEach(function(){
                this.res = flow.buildFormBlocks( factory.get(5) )
            })
            it('should find entries / exits',function(){
                expect( this.res.entries.length ).toBe(2);
                expect( this.res.exits.length ).toBe(2);
            })
            it('should find consistent graph',function(){
                expect( this.res.entries[0].out.length ).toBe(1);
                expect( this.res.entries[0].in.length ).toBe(0);
                expect( this.res.entries[1].out.length ).toBe(1);
                expect( this.res.entries[1].in.length ).toBe(0);
                expect( this.res.exits[0].out.length ).toBe(0);
                expect( this.res.exits[0].in.length ).toBe(1);
                expect( this.res.exits[1].out.length ).toBe(0);
                expect( this.res.exits[1].in.length ).toBe(1);
            })
        })

    })

})
