var factory = require('../tests/sampleFactory')
  , mainRenderer = require('./renderer/main')
  , kitchen = Object.create( require('./model/kitchen') )


factory.copyKitchen( kitchen )

var mr = Object.create( mainRenderer ).init()
mr.render( kitchen )
