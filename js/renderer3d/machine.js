
var init = function( info ){
    this.layer = new THREE.Object3D()
    return this
}

var buildBlock = function( block ){
    var container = new THREE.Object3D()

    var color = 0|(Math.random()*(255*255*255))
    var material = new THREE.MeshPhongMaterial( {
        color: color,
        //emissive: color,
        shininess : 120,
        specular: 0xFFFFFF,

    } );

    for(var y=block.shape.length; y--; )
    for(var x=block.shape[y].length; x--; )
        {
            if( block.shape[y][x] == 1 || block.shape[y][x] == 3 )
            {
                var geometry = new THREE.BoxGeometry( 1, 0.8, 1  );

                var cube = new THREE.Mesh( geometry, material );
                cube.position.x = x+0.5
                cube.position.z = y+0.5
                cube.position.y = 0.4

                container.add( cube )
            }
            if( block.shape[y][x] == 2 )
            {
                var geometry = new THREE.CylinderGeometry( 0.2, 0.2, 1.2 , 20 );

                var cylinder = new THREE.Mesh( geometry, material );
                cylinder.position.x = x+0.5
                cylinder.position.z = y+0.5
                cylinder.position.y = 0.6

                container.add( cylinder )
            }
            if( block.shape[y][x] == 3 )
            {
                var geometry = new THREE.CylinderGeometry( 0.4, 0.4, 1.1 , 20 );

                var cylinder = new THREE.Mesh( geometry, material );
                cylinder.position.x = x+0.5
                cylinder.position.z = y+0.5
                cylinder.position.y = 0.6

                container.add( cylinder )
            }
        }

    var geometry = new THREE.SphereGeometry( 0.05 , 32, 32 );

    var sphere = new THREE.Mesh( geometry, material );
    sphere.position.x = 0
    sphere.position.y = 0
    sphere.position.z = 0

    container.add( sphere )

    return container
}


var renderId=0
var render = function( blocks ){
    var layer = this.layer

    renderId ++
    blocks.forEach(function(block){
        var visual;
        if (!(visual = block._visual)){
            block._visual = visual = buildBlock( block )
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
