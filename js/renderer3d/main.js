var machineRenderer = require('./machine')
  , gridRenderer = require('./grid')
  , userInput = require('./userInput')
  , ed = require('../system/eventDispatcher')



var bootstrapThree = function(){

	var camera = this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.z = 7;
	camera.position.y = 20;

	var controls = this.controls =  new THREE.OrbitControls( camera );
	controls.center.x = 8
	controls.center.z = 8
	controls.addEventListener( 'change', function render() {
        ed.dispatch('render3D-camera-change')
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

var init = function( modelBall ) {

    bootstrapThree.call(this)

    this.kitchen = modelBall.kitchen

    this.machineRenderer = Object.create( machineRenderer ).init(  )
    this.gridRenderer = Object.create( gridRenderer ).init(  )

    this.scene.add( this.machineRenderer.layer )
    this.scene.add( this.gridRenderer.layer )


    this.userInput = Object.create( userInput ).init( this.scene , this.camera, this.renderer.domElement )

    return this
}

var render = function( kitchen ){
    this.machineRenderer.render( this.kitchen.blocks )
    this.renderer.render( this.scene, this.camera );
}

module.exports = {
    init: init,
    render: render
}
