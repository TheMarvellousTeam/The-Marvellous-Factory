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

    var texture = THREE.ImageUtils.loadTexture( "../DessinsTM/4848/poisson2.gif" );
    this.spriteMaterials[ 'B' ] = new THREE.SpriteMaterial( { map: texture, fog: true } );

    var texture = THREE.ImageUtils.loadTexture( "./assets/crab-colour-reduce.svg" );
    this.spriteMaterials[ 'C' ] = new THREE.SpriteMaterial( { map: texture, fog: true } );

    var texture = THREE.ImageUtils.loadTexture( "../DessinsTM/4848/poisson3.gif" );
    this.spriteMaterials[ 'A' ] = new THREE.SpriteMaterial( { map:texture, fog: true } );

    var texture = THREE.ImageUtils.loadTexture( "../DessinsTM/4848/poisson4.gif" );
    this.spriteMaterials[ 'D' ] = new THREE.SpriteMaterial( { map:texture, fog: true } );
    this.spriteMaterials[ 'default' ] = new THREE.SpriteMaterial( { map:texture, fog: true } );
}

var remove = function( data ){
    var token = data.token

    for( var i =this.layer.children.length; i--;)
        if( this.layer.children[i].model == token )
            this.layer.remove( this.layer.children[i] )
}

var spawn = function( data ){
    var token = data.token

    var sp = new THREE.Sprite( this.spriteMaterials[ token.type ] || this.spriteMaterials.default );
    sp.scale.x= sp.scale.y= sp.scale.z= 0.3

    sp.model = token

    this.layer.add( sp )
}

var render = function(  ){
    this.layer.children.forEach(function(token){
        var model = token.model

        var p = model.getPosition()
        token.position.x = p.x + 0.5
        token.position.y = 0.6
        token.position.z = p.y + 0.5
    })
}

module.exports = {
    render : render,
    init: init
}
