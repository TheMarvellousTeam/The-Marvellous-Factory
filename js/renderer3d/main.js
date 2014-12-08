var machineRenderer = require('./machine')
  , gridRenderer = require('./grid')
  , tokenRenderer = require('./token')
  , userInput = require('./userInput')
  , ed = require('../system/eventDispatcher')



var bootstrapThree = function(){

	var camera = this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.z = 14;
	camera.position.y = 10;



	var scene = this.scene = new THREE.Scene();


	// lights

	var light = new THREE.PointLight( 0xffffff , 0.1 , 0);
	light.position.set( 8, 100, 8 );
	//scene.add( light );

	var light = new THREE.DirectionalLight( 0x333333 );
	light.position.set( 8, 10, 8 );
    //scene.add( light );

    var hemiLight = new THREE.HemisphereLight( 0x333333, 0x333333, 0.6 );
    hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
    hemiLight.position.set( 0, 1000, 0 );
    scene.add( hemiLight );

	var light = new THREE.AmbientLight( 0x555555 );
	scene.add( light );


	// renderer

	var renderer = this.renderer = new THREE.WebGLRenderer( );
	renderer.setSize( window.innerWidth, window.innerHeight );

    document.getElementById("gamescreen").appendChild(renderer.domElement);

    var controls = this.controls =  new THREE.OrbitControls( camera , renderer.domElement );
    controls.center.x = 8
    controls.center.y = 1
    controls.center.z = 8
    controls.update()
    controls.addEventListener( 'change', function render() {
        ed.dispatch('render3D-camera-change')
    });

}

var init = function( modelBall ) {

    bootstrapThree.call(this)

    this.kitchen = modelBall.kitchen
    this.tokenPool = modelBall.tokenPool

    this.machineRenderer = Object.create( machineRenderer ).init( modelBall )
    this.gridRenderer = Object.create( gridRenderer ).init( modelBall )
    this.tokenRenderer = Object.create( tokenRenderer ).init( modelBall )

    this.scene.add( this.machineRenderer.layer )
    this.scene.add( this.tokenRenderer.layer )
    this.scene.add( this.gridRenderer.layer )


    this.userInput = Object.create( userInput ).init( this.scene , this.camera, this.renderer.domElement )

    ed.listen( 'scene-stop-drag', enableCameraControl.bind(this) , this )
    ed.listen( 'scene-start-drag', disableCameraControl.bind(this) , this )

    return this
}

var enableCameraControl = function(){
    this.controls.enabled = true
}
var disableCameraControl = function(){
    this.controls.enabled = false
}

var render = function( kitchen ){
    this.machineRenderer.render( this.kitchen.blocks )
    this.tokenRenderer.render( this.tokenPool )

    this.renderer.render( this.scene, this.camera );
}

module.exports = {
    init: init,
    render: render
}
