var Abstract = require('../utils/Abstract')
  , ed = require('../system/eventDispatcher')

var init = function( ){

    this.pool = []

    ed.listen('token-spawn' , spawn.bind(this), this)
    ed.listen('token-removed' , remove.bind(this), this)

    return this
}

var remove = function( data ){
    var token = data.token

    for( var i=this.pool.length; i--;)
        if( this.pool[i] == token )
            this.pool.splice(i,1)
}

var spawn = function( data ){
    var token = data.token

    this.pool.push( token )
}


module.exports = Object.create( Abstract )
.extend({
    init: init,
})
