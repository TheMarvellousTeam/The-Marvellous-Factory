var factory = require('../tests/sampleFactory')
  , mainRenderer = require('./renderer/main')

var blocks = factory.get()

var mr = Object.create( mainRenderer ).init()

mr.render(blocks)
