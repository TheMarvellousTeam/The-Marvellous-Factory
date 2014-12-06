module.exports = {
    init:function(){ return this},
    extend:function(o){
        for(var i in o ){
            this[i] = o[i]
        }
        return this
    }
}
