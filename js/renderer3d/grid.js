
var init = function( modelBall ){
    this.layer = new THREE.Object3D()

    this.kitchen = modelBall.kitchen

    this.layer.add( buildFloor( modelBall.kitchen.width, modelBall.kitchen.height ) )

    return this
}

var buildFloor = function( width , height ){
    var container = new THREE.Object3D()

    var geometry = new THREE.PlaneGeometry( width , height );

    var ts = 256
    var canvas = document.createElement('canvas')
    canvas.height = ts
    canvas.width = ts
    var ctx = canvas.getContext('2d')

    ctx.lineWidth = 10
    ctx.strokeStyle = "#333333";
    ctx.fillStyle = "#ffffff";
    ctx.rect(0,0,ts,ts)
    ctx.fill()
    ctx.stroke()

    var texture = new THREE.Texture( canvas ) ;
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    //texture.generateMipmaps = false
	texture.needsUpdate = true


    var material = new THREE.MeshPhongMaterial( {
        color: 0xFFFFFF,
        shininess : 60,
        specular: 0xFFFFFF,
        map : texture,
        side: THREE.DoubleSide,
        bumpMap: texture,
		bumpScale: 0.01,
    } );


geometry.faceVertexUvs = [[
    [
        new THREE.Vector2(0, height),
        new THREE.Vector2(0, 0),
        new THREE.Vector2(width, height)
    ],
    [
        new THREE.Vector2(0, 0),
        new THREE.Vector2(width, 0),
        new THREE.Vector2(width, height)
    ]
]]
geometry.uvsNeedUpdate= true



    var plane = new THREE.Mesh( geometry, material );
    plane.rotation.x = Math.PI/2
    plane.position.x = width/2
    plane.position.z = height/2
    plane.name = 'ground'

    return plane
}


var render = function( blocks ){

}

module.exports = {
    render : render,
    init: init
}
