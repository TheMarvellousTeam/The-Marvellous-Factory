var Abstract = require('../utils/Abstract')

var getSymbols = function(){
    return []
}

module.exports = Object.create( Abstract )
.extend({
    getInputs : getSymbols.bind(this,2),
    getOutputs : getSymbols.bind(this,3)
})
