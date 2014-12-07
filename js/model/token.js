var Abstract = require('../utils/Abstract')
  , ed = require('../system/eventDispatcher')

var init = function( ){

    this.age = 0

    ed.listen('update' , update.bind(this), this)

    ed.dispatch( 'token-spawn', {
        token: this
    })

    return this
}

var remove = function(){
    ed.dispatch( 'token-removed', {
        token: this
    })
}

var entrerInPipe = function( pipe ){
    this.ageInPipe = this.age
    this.pipe = pipe
}

var update = function( ){
    this.age ++
}

var getPosition = function(){

    var machine = this.pipe.machine

    var i = machine.getInputs()[0],
        o = machine.getOutputs()[0]

    var d = 100

    var k = Math.min( ( this.age - this.ageInPipe ) / d , 1 )

    if( i && o )
        return {
            x : i.x * (1-k) + o.x * (k),
            y : i.y * (1-k) + o.y * (k)
        }
    else
        return i || o || machine.origin
}

module.exports = Object.create( Abstract )
.extend({
    init: init,
    entrerInPipe: entrerInPipe,
    getPosition: getPosition,
    remove: remove
})
