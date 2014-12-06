var factory = require('../tests/sampleFactory')
  , mainRenderer = require('./renderer/main')
  , kitchen = Object.create( require('./model/Kitchen') )


factory.copyKitchen( kitchen )

var mr = Object.create( mainRenderer ).init()
mr.render( kitchen )
