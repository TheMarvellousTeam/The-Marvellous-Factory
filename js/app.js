var testFactory = require('../tests/sampleFactory')
  , mainRenderer = require('./renderer3d/main')
  , menuRenderer = require('./rendererUI/Menu')
  , UI = require('./rendererUI/main')

  , kitchen = Object.create( require('./model/Kitchen') )
  , gameState = Object.create( require('./model/GameState') )
  , controlState = Object.create( require('./model/ControlState') )
  , Block = Object.create( require('./model/Block') )

  , shopClickAndPose = Object.create( require('./controller/shopClickAndPose') )
  , traceConveyor = Object.create( require('./controller/traceConveyor') )

  , eventDispatcher = require('./system/eventDispatcher')
  , productionPhase = require('./system/productionPhase')

// init model
kitchen.init(16,16)
gameState.init()
controlState.init()

// test
testFactory.copyKitchen( kitchen , 9 )

// init system
var modelBall = {
    kitchen: kitchen,
    gameState: gameState,
    controlState: controlState
}

productionPhase.init( modelBall )

// init renderer
var renderer = Object.create( mainRenderer ).init( modelBall )
var ui = Object.create( UI ).init()

// controller
shopClickAndPose.init( modelBall )
traceConveyor.init( modelBall )



// start render loop

window.requestAnimationFrame(function cycle(){
    eventDispatcher.dispatch('pre-update')
    eventDispatcher.dispatch('update')
    eventDispatcher.dispatch('post-update')

    eventDispatcher.dispatch('pre-render')
    renderer.render()
    eventDispatcher.dispatch('post-render')

    window.requestAnimationFrame(cycle)
})

// manage phases
eventDispatcher.dispatch('start-production')
