var testFactory = require('../tests/sampleFactory')
  , mainRenderer = require('./renderer3d/main')
  , menuRenderer = require('./rendererUI/Menu')

  , kitchen = Object.create( require('./model/Kitchen') )
  , gameState = Object.create( require('./model/GameState') )
  , store = Object.create( require('./model/Store') )

  , storeSystem = Object.create( require('./system/StoreSystem'))
  , deleteSystem = Object.create( require('./system/DeleteSystem'))
  , eventDispatcher = require('./system/eventDispatcher')
  , productionPhase = require('./system/productionPhase')

// init model
kitchen.init()
gameState.init()
store.init()

// init system
var modelBall = {
    kitchen: kitchen,
    store: store,
    gameState: gameState
}

productionPhase.init( modelBall )

// init renderer
var renderer = Object.create( mainRenderer ).init( modelBall )
var menu = Object.create( menuRenderer ).init()

// test
testFactory.copyKitchen( kitchen , 14 )

// start render loop

window.requestAnimationFrame(function cycle(){
    eventDispatcher.dispatch('pre-update')
    eventDispatcher.dispatch('update')
    eventDispatcher.dispatch('post-update')

    eventDispatcher.dispatch('pre-render')
    renderer.render()
    menu.render()
    eventDispatcher.dispatch('post-render')

    window.requestAnimationFrame(cycle)
})

// manage phases
eventDispatcher.dispatch('start-production')
