var PIXI = require('pixi.js')
  , machineRenderer = require('./machine')
  , gridRenderer = require('./grid')
  , menuRenderer = require('./menu')


var bootstrapPixi = function(){
    var renderer = PIXI.autoDetectRenderer(16*48 + 250, 16*48);
	document.body.appendChild(renderer.view);
	renderer.view.style.position = "absolute";
    return renderer
}

var init = function( modelBall ) {

    this.renderer = bootstrapPixi();

    this.stage = new PIXI.Stage('#FFFFFF');

    var info = {
        tileSize: 48
    }

    this.kitchen = modelBall.kitchen
    this.store = modelBall.store

    this.machineRenderer = Object.create( machineRenderer ).init(info)
    this.gridRenderer = Object.create( gridRenderer ).init(info)
    this.menuRenderer = Object.create( menuRenderer ).init(info)

    this.stage.addChild( this.machineRenderer.layer )
    this.stage.addChild( this.gridRenderer.layer )
    this.stage.addChild( this.menuRenderer.layer )

    return this
}

var render = function( ){

    this.machineRenderer.render( this.kitchen.blocks )

    this.menuRenderer.render( this.store )

    this.renderer.render( this.stage )
}

module.exports = {
    render : render,
    init: init
}
