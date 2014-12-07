var ed = require('../system/eventDispatcher')


var init = function( info ){
    this.layer = new THREE.Object3D()

    ed.listen('token-spawn' , spawn.bind(this), this)
    ed.listen('token-removed' , remove.bind(this), this)

    initSpriteMaterial.call(this)

    return this
}

var initSpriteMaterial = function(){

    this.spriteMaterials = {}

    var texture = THREE.ImageUtils.loadTexture( "./assets/crab-colour-reduce.svg" );
    this.spriteMaterials[ 'default' ] = new THREE.SpriteMaterial( { map: texture, color: 0xffffff, fog: true } );
}

var remove = function( data ){
    var token = data.token
}

var spawn = function( data ){
    var token = data.token

    var sp = new THREE.Sprite( this.spriteMaterials[ 'default' ] );
    sp.model = token

    this.layer.add( sp )
}

var render = function(  ){
    this.layer.children.forEach(function(token){
        var model = token.model

        var p = model.getPosition()
        token.position.x = p.x
        token.position.y = 1
        token.position.z = p.y
    })
}

module.exports = {
    render : render,
    init: init
}
