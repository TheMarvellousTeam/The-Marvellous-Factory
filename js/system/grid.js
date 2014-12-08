
var around = (function(){

    var dir=[
        {x:1,y:0},
        {x:-1,y:0},
        {x:0,y:1},
        {x:0,y:-1}
    ]

    return function( fn , tab , cx , cy ){

        for(var i=4;dir.length; i--){
            var x = cx + dir[i].x
            var y = cy + dir[i].y

            if( x<0 || y<0 || x>=tab[0].length || y>=tab.length )
                continue

            if( fn( x,y, tab[y][x], tab ) )
                return
        }
    }
})()

var findAround = function( tab, symbol , cx , cy ){
    var t = []
    around(function(x,y,val){
        if( val == symbol )
            t.push({x:x, y:y})
    })
    return t
}

var throught = function(tab,x,y  ,prevX, prevY){
    var t = findAround(tab , tab[y][x], x ,y )
    if( !t.length )
        return [{x:x, y:y}]

    var res = []
    for( var i=t.length;i--;)
        if( t[i].x != prevX || t[i].y != prevY )
        res = res.concat( throught(tab, t[i].x, t[i].y, x,y ) )

    return res
}


module.exports = {
    around: around,
    throught: throught,
    findAround: findAround
}
