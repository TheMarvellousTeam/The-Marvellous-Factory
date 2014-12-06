var PIXI = require('pixi.js')
  , machineRenderer = require('./machine')


var bootstrapPixi = function(){
    var renderer = PIXI.autoDetectRenderer(800, 600);
	document.body.appendChild(renderer.view);
	renderer.view.style.position = "absolute";
    return renderer
}

var init = function() {

    this.renderer = bootstrapPixi();

    this.machineRenderer = Object.create( machineRenderer ).init()

    return this
}

var render = function( machines ){
    this.machineRenderer.render( machines )

    this.renderer.render( this.machineRenderer.stage )
}

module.exports = {
    render : render,
    init: init
}
