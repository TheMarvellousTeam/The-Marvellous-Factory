
var init = function( info ){
    this.layer = new THREE.Object3D()
    return this
}

var buildArrow = (function(){
    var shape = new THREE.Shape([
        new THREE.Vector2 ( 0,0.3 ),
        new THREE.Vector2 ( 0.2,0 ),
        new THREE.Vector2 ( 0.1,0 ),
        new THREE.Vector2 ( 0.1,-0.2 ),
        new THREE.Vector2 ( -0.1,-0.2 ),
        new THREE.Vector2 ( -0.1,0 ),
        new THREE.Vector2 ( -0.2,0 ),
        new THREE.Vector2 ( 0,0.3 ),
    ]);
    var extrudeSettings = {
					amount			: 0.1,
					steps			: 1,
					bevelEnabled	: false,
				};
    return function(){
        var geom = new THREE.ExtrudeGeometry( shape,extrudeSettings );
        geom.applyMatrix( (new THREE.Matrix4()).makeRotationX( Math.PI/2 ) )
        return geom
    }
})()

var buildMachineBody = function( ){
    var geom = new THREE.BoxGeometry( 1, 0.8, 1  );
    geom.applyMatrix( (new THREE.Matrix4()).setPosition(new THREE.Vector3(0,0.4,0) ) )
    return geom
}
var buildMachineOpening = function( ){

    var top = new THREE.BoxGeometry( 1, 0.1, 1 );
    top.applyMatrix( (new THREE.Matrix4()).setPosition(new THREE.Vector3(0,0.75,0) ) )

    var left = new THREE.BoxGeometry( 0.2, 0.3, 1 );
    left.applyMatrix( (new THREE.Matrix4()).setPosition(new THREE.Vector3(-0.4,0.55,0) ) )

    var right = new THREE.BoxGeometry( 0.2, 0.3, 1 );
    right.applyMatrix( (new THREE.Matrix4()).setPosition(new THREE.Vector3(0.4,0.55,0) ) )

    var bottom = new THREE.BoxGeometry( 1, 0.4, 1 );
    bottom.applyMatrix( (new THREE.Matrix4()).setPosition(new THREE.Vector3(0,0.2,0) ) )

    var arrow = buildArrow();
    arrow.applyMatrix( (new THREE.Matrix4()).setPosition(new THREE.Vector3(0,0.85,0) ) )

    //top.merge( bottom )
    top.merge( arrow )
    top.merge( left )
    top.merge( right )

    return top
}

var buildConvBody = function( ){
    var bottom = new THREE.BoxGeometry( 1, 0.4, 1 );
    bottom.applyMatrix( (new THREE.Matrix4()).setPosition(new THREE.Vector3(0,0.2,0) ) )
    return bottom
}

var buildMachine = function( block ){
    var container = new THREE.Object3D()

    var color = 0|(Math.random()*(255*255*255))
    var material = new THREE.MeshPhongMaterial( {
        color: color,
        shininess : 12,
        specular: 0xFFFFFF,

    } );

    for(var y=block.shape.length; y--; )
    for(var x=block.shape[y].length; x--; )
        {
            if( block.shape[y][x] == 1 )
            {
                var cube = new THREE.Mesh( buildMachineBody(), material );
                cube.position.x = x+0.5
                cube.position.z = y+0.5

                container.add( cube )
            }
            if( block.shape[y][x] == 2 || block.shape[y][x] == 3 )
            {
                var geometry = new THREE.CylinderGeometry( 0.2, 0.2, 1.05 , 20 );

                var cube = new THREE.Mesh( buildMachineOpening(), material );
                cube.position.x = x+0.5
                cube.position.z = y+0.5
                cube.rotation.y = Math.PI/2

                container.add( cube )
            }
        }
    return container
}
var buildConv = function( block ){
    var container = new THREE.Object3D()

    var color = 0|(Math.random()*(255*255*255))
    var material = new THREE.MeshPhongMaterial( {
        color: color,
        shininess : 1,
        specular: 0xFFFFFF,

    } );

    for(var y=block.shape.length; y--; )
    for(var x=block.shape[y].length; x--; )
        {
            if( block.shape[y][x] > 0 )
            {
                var cube = new THREE.Mesh( buildConvBody(), material );
                cube.position.x = x+0.5
                cube.position.z = y+0.5

                container.add( cube )
            }
        }
    return container
}


var renderId=0
var render = function( blocks ){
    var layer = this.layer

    renderId ++
    blocks.forEach(function(block){
        var visual;
        if (!(visual = block._visual)){
            block._visual = visual = block.type == 'conveyor' ? buildConv( block ) : buildMachine( block )
            layer.add(visual)
        }

        visual._m_renderId = renderId

        // alter visual geometry
        visual.position.x = block.origin.x
        visual.position.z = block.origin.y
    });


    // TODO clean up useless visual
    this.layer.children

}

module.exports = {
    render : render,
    init: init
}
