var Abstract = require('../utils/Abstract')

var listener = {};

var dispatch = function( eventName, data ){
    var l = listener[ eventName ] || []
    for( var i = l.length; i--;)
        l[i].fn(data, eventName)

    if(true)
        switch(eventName){
            case 'update':
            case 'post-update':
            case 'pre-update':
            case 'post-render':
            case 'pre-render':
                break;
            default:
                console.log(eventName)
        }

    return this
}
var listen = function( eventName, fn , key ){
    ( listener[ eventName ] = listener[ eventName ] || [] ).push({
        fn: fn,
        key: key
    })
    return this
}
var unlisten = function( eventName, key ){
    var l = ( listener[ eventName ] = listener[ eventName ] || [] )
    for( var i = l.length; i--;)
        if( l[i].key == key )
            l.splice(i,1)
    return this
}

module.exports = Object.create( Abstract )
.extend({
    dispatch: dispatch,
    listen: listen,
    unlisten: unlisten
})
