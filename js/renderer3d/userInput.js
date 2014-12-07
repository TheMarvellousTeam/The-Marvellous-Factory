var ed = require('../system/eventDispatcher')

var mouseEvent = function( event ){

    var eventName;

    switch( event.type ){
        case 'mousedown' :
            eventName = 'scene-mousedown'
            break
        case 'mouseup' :
            eventName = 'scene-mouseup'
            break
        case 'mousemove' :
            eventName = 'scene-mouseup'
            break
        default :
            return
    }

    if( !ed.hasListener(eventName) )
        return


    var xScreen = (event.x / this.dom.offsetWidth)*2 - 1
    var yScreen = -( (event.y / this.dom.offsetHeight)*2 - 1 )

    var vector = new THREE.Vector3( xScreen, yScreen, this.camera.near );
    // Convert the [-1, 1] screen coordinate into a world coordinate on the near plane
    vector.unproject( this.camera );

    vector.sub( this.camera.position ).normalize()

    var raycaster = new THREE.Raycaster( this.camera.position, vector );

    // See if the ray from the camera into the world hits one of our meshes
    var intersects = raycaster.intersectObject( this.ground );

    // Toggle rotation bool for meshes that we clicked
    if ( intersects.length > 0 ) {

        ed.dispatch( eventName , {
            gridX : intersects[ 0 ].point.x - 8,
            gridY : intersects[ 0 ].point.y - 8,
        })
    }

}

var init = function( scene, camera, dom ){

    this.scene = scene
    this.camera = camera

    this.ground = scene.getObjectByName('ground')

    this.dom = dom

    dom.addEventListener('mousedown', mouseEvent.bind(this), false )
    dom.addEventListener('mouseup', mouseEvent.bind(this), false )
    dom.addEventListener('mousemove', mouseEvent.bind(this), false )

    return this
}


module.exports = {
    init: init,
}
