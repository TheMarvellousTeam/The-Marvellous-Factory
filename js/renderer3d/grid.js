
var init = function( info ){
    this.layer = new THREE.Object3D()

    this.layer.add( buildFloor() )

    return this
}

var buildFloor = function( ){
    var container = new THREE.Object3D()

    var width = 16
    var height = 16

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

    return plane
}


var render = function( blocks ){

}

module.exports = {
    render : render,
    init: init
}
