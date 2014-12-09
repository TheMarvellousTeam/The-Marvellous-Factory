var steel = THREE.ImageUtils.loadTexture( "/assets/DessinsTM/4848/steel.gif" );
steel.wrapS = steel.wrapT = THREE.RepeatWrapping;
steel.repeat.set( 1, 1 );

var belt = THREE.ImageUtils.loadTexture( "/assets/DessinsTM/4848/tapis1.gif" );
belt.wrapS = THREE.RepeatWrapping;
belt.wrapT = THREE.RepeatWrapping;
belt.repeat.set( 1, 1 );



var ghostMat  =new THREE.MeshPhongMaterial( {
    color: 0x3eb114,
    transparent: true,
    opacity: 0.4,
    shininess : 2,
    specular: 0xFFFFFF,
});
var ghostMat2  =new THREE.MeshPhongMaterial( {
    color: 0xaf1213,
    transparent: true,
    opacity: 0.4,
    shininess : 2,
    specular: 0xFFFFFF,
} );

var init = function( modelBall ){
    this.layer = new THREE.Object3D()

    this.kitchen = modelBall.kitchen
    this.controlState = modelBall.controlState

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

    //var bottom = new THREE.BoxGeometry( 1, 0.4, 1 );
    //bottom.applyMatrix( (new THREE.Matrix4()).setPosition(new THREE.Vector3(0,0.2,0) ) )

    var arrow = buildArrow();
    arrow.applyMatrix( (new THREE.Matrix4()).setPosition(new THREE.Vector3(0,0.85,0) ) )

    //top.merge( bottom )
    top.merge( arrow )
    top.merge( left )
    top.merge( right )

    return top
}

var buildConvBody = function( materials ){
    var bottom = new THREE.BoxGeometry( 1, 0.4, 1, materials );
    bottom.applyMatrix( (new THREE.Matrix4()).setPosition(new THREE.Vector3(0,0.2,0) ) )
    return bottom
}

var buildMachine = function( block ){
    var container = new THREE.Object3D()

    var material = new THREE.MeshPhongMaterial( {
        color: 0xD0D9D9,
        map: steel,
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
                var cube = new THREE.Mesh( buildMachineOpening(), material );
                cube.position.x = x+0.5
                cube.position.z = y+0.5
                cube.rotation.y = Math.PI/2

                container.add( cube )
            }
        }
    return container
}

var buildEmiter = function( block ) {
    var container = new THREE.Object3D();

    var material = new THREE.MeshPhongMaterial( {
        color: 0xD0D9D9,
        map: steel,
        shininess : 12,
        specular: 0xFFFFFF,
    } );

    var geometry = new THREE.CylinderGeometry( 0.2, 0.2, 50 , 20 );
    var cylinder = new THREE.Mesh( geometry, material);
    cylinder.position.x = 0.5;
    cylinder.position.z = 0.5;
    cylinder.position.y = 26;
    container.add(cylinder);

    var geometry = new THREE.CylinderGeometry( 0.2, 0.5, 0.5 , 20 );
    var cylinder = new THREE.Mesh( geometry, material);
    cylinder.position.x = 0.5;
    cylinder.position.z = 0.5;
    cylinder.position.y = 1.25;
    container.add(cylinder);

    return container;
}

var buildConv = function( block ){
    var container = new THREE.Object3D()

    var materialBelt = new THREE.MeshPhongMaterial( {
        color: 0xD0D9D9,
        map: belt,
        shininess : 1,
        specular: 0xFFFFFF,

    } );

    var materialSteel = new THREE.MeshPhongMaterial( {
        color: 0xD0D9D9,
        map: steel,
        shininess : 12,
        specular: 0xFFFFFF,

    } );

    var materials = [materialSteel, materialSteel, materialBelt, materialSteel, materialSteel, materialSteel];

    for(var y=block.shape.length; y--; )
    for(var x=block.shape[y].length; x--; )
        {
            if( block.shape[y][x] > 0 )
            {
                var cube = new THREE.Mesh( buildConvBody(), new THREE.MeshFaceMaterial(materials) );
                cube.position.x = x+0.5
                cube.position.z = y+0.5

                container.add( cube )
            }
        }
    return container
}


var renderId=0
var render = function( ){
    var layer = this.layer

    renderId ++
    this.kitchen.blocks.forEach(function(block){
        var visual;
        if (!(visual = block._visual)){
            var build ;
            switch(block.type) {
                case 'conveyor':
                    build = buildConv(block);
                    break;
                case 'emiter':
                    build = buildEmiter(block);
                    break;
                default:
                    build = buildMachine( block );
            }
            block._visual = visual = build;
            layer.add(visual)
        }

        visual._m_renderId = renderId

        // alter visual geometry
        visual.position.x = block.origin.x
        visual.position.z = block.origin.y
    });


    // TODO clean up useless visual
    this.layer.children


    renderFlyingMachine.call( this )
    renderFlyingConveyor.call( this )

}

var arrayHash = function( a ){
    var x=0
    return 'x'+a.reduce(function(p,a){
        return p + ''+(a.x+''+a.y+' '+(x++))
    },'|')
}
var shapeHash = function( a ){
    var x=0
    return a.reduce(function(p,a){
        return p + 'x'+a.reduce(function(p,a){
            return p + ''+(a+''+(x++))
        },'|')
    },'')
}

var renderFlyingMachine = function(){
    if( this.controlState.pose ){

        var m = this.controlState.pose.machine

        if(!this._flying || ( this._flying.shapeHash != shapeHash( m.shape ) )){

            if( this._flying )
                this.layer.remove( this._flying )

            this._flying = buildMachine( m )
            this._flying.shapeHash = shapeHash( m.shape )
            this.layer.add( this._flying )
        }

        var material = this._flying.children[0].material
        material.color = new THREE.Color( !this.controlState.pose.accept ? 0xaf1213 : 0x3eb114 );
        material.transparent = true
        material.opacity = 0.5

        this._flying.position.x = m.origin.x
        this._flying.position.z = m.origin.y



    }else if( this._flying ){
        this.layer.remove( this._flying )
        this._flying = null
    }
}


var renderFlyingConveyor = function(){
    if( this.controlState.conveyor ){

        var path = this.controlState.conveyor.path

        if(!this._flyingConveyor || ( this._flyingConveyor.pathHash != arrayHash( path ) )){

            if( this._flyingConveyor )
                this.layer.remove( this._flyingConveyor )

            this._flyingConveyor = new THREE.Object3D()

            for( var i=path.length;i--;){
                var b = new THREE.Mesh( buildMachineBody(), this.controlState.conveyor.accept ? ghostMat2 : ghostMat )
                this._flyingConveyor.add( b )
                b.position.x = path[i].x + 0.5
                b.position.z = path[i].y + 0.5
            }

            this._flyingConveyor.pathHash = arrayHash( path )
            this.layer.add( this._flyingConveyor )
        }

    }else if( this._flyingConveyor ){
        this.layer.remove( this._flyingConveyor )
        this._flyingConveyor = null
    }
}

module.exports = {
    render : render,
    init: init
}
