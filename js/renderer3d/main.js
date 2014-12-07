var machineRenderer = require('./machine')
  , gridRenderer = require('./grid')



var bootstrapThree = function(){

	var camera = this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.z = 7;
	camera.position.y = 20;

	var controls = new THREE.OrbitControls( camera );
	controls.center.x = 8
	controls.center.z = 8
	controls.addEventListener( 'change', function render() {
        //renderer.render( scene, camera );
    });

	var scene = this.scene = new THREE.Scene();


	// lights

	var light = new THREE.PointLight( 0xffffff , 1 , 0);
	light.position.set( 100, 100, 100 );
	scene.add( light );

	var light = new THREE.DirectionalLight( 0x002288 );
	light.position.set( -100, 10, -100 );
	scene.add( light );

	var light = new THREE.AmbientLight( 0x111111 );
	scene.add( light );


	// renderer

	var renderer = this.renderer = new THREE.WebGLRenderer( );
	renderer.setSize( window.innerWidth, window.innerHeight );

	document.body.appendChild( renderer.domElement );

}

var init = function(info) {

    bootstrapThree.call(this)

    this.machineRenderer = Object.create( machineRenderer ).init(info)
    this.gridRenderer = Object.create( gridRenderer ).init(info)

    this.scene.add( this.machineRenderer.layer )
    this.scene.add( this.gridRenderer.layer )

    return this
}

var render = function( kitchen ){
    this.machineRenderer.render( kitchen.blocks )
    this.renderer.render( this.scene, this.camera );
}

module.exports = {
    init: init,
    render: render
}
