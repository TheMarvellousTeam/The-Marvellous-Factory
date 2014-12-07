var factory = require('../tests/sampleFactory')
  , mainRenderer = require('./renderer/main')
  , kitchen = Object.create( require('./model/Kitchen') )
  , store = Object.create( require('./model/Store') )
  , storeSystem = Object.create( require('./system/StoreSystem'))

factory.copyKitchen( kitchen )
factory.copyStore( store )


var main = Object.create( mainRenderer ).init()

main.render(kitchen, store)

storeSystem.init(store, kitchen)

var gameLoop = function() {
	main.render(kitchen, store)
	main.stage.interactionManager.update();

	window.requestAnimationFrame(gameLoop)
}

window.requestAnimationFrame(gameLoop)
