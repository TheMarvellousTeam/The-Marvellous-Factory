var factory = require('../tests/sampleFactory')
  , mainRenderer = require('./renderer/main')
  , kitchen = Object.create( require('./model/Kitchen') )
  , store = Object.create( require('./model/Store') )


factory.copyKitchen( kitchen )
factory.copyStore( store )

var mr = Object.create( mainRenderer ).init()
mr.render( kitchen, store )
