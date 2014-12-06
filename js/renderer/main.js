var PIXI = require('pixi.js')
  , machineRenderer = require('./machine')
  , gridRenderer = require('./grid')


var bootstrapPixi = function(){
    var renderer = PIXI.autoDetectRenderer(16*48, 16*48);
	document.body.appendChild(renderer.view);
	renderer.view.style.position = "absolute";
    return renderer
}

var init = function() {

    this.renderer = bootstrapPixi();

    this.stage = new PIXI.Stage('#FFFFFF');

    var info = {
        tileSize: 48
    }

    this.machineRenderer = Object.create( machineRenderer ).init(info)
    this.gridRenderer = Object.create( gridRenderer ).init(info)

    this.stage.addChild( this.gridRenderer.layer )
    this.stage.addChild( this.machineRenderer.layer )

    return this
}

var render = function( kitchen ){

    this.machineRenderer.render( kitchen.blocks )
    this.gridRenderer.render( kitchen )

    this.renderer.render( this.stage )
}

module.exports = {
    render : render,
    init: init
}
