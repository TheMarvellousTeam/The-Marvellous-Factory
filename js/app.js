var factory = require('../tests/sampleFactory')
  , mainRenderer = require('./renderer/main')
  , kitchen = Object.create( require('./model/Kitchen') )
  , store = Object.create( require('./model/Store') )
  , storeSystem = Object.create( require('./system/StoreSystem'))
  , deleteSystem = Object.create( require('./system/DeleteSystem'))



if ( true )
{


factory.copyKitchen( kitchen )
factory.copyStore( store )

var main = Object.create( mainRenderer ).init()

storeSystem.init(store, kitchen)
deleteSystem.init(kitchen)


var gameLoop = function() {
	main.render(kitchen, store)
	main.stage.interactionManager.update()

	storeSystem.update()
	deleteSystem.update()

	window.requestAnimationFrame(gameLoop)
}

window.requestAnimationFrame(gameLoop)


}else{


factory.copyKitchen( kitchen , 4 )

var main = Object.create( require('./renderer3d/main') ).init()

main.render(kitchen)

}
