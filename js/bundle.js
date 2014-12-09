(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var testFactory = require('../tests/sampleFactory')
  , mainRenderer = require('./renderer3d/main')
  , menuRenderer = require('./rendererUI/Menu')
  , UI = require('./rendererUI/main')

  , kitchen = Object.create( require('./model/Kitchen') )
  , gameState = Object.create( require('./model/GameState') )
  , controlState = Object.create( require('./model/ControlState') )
  , Block = Object.create( require('./model/Block') )

  , shopClickAndPose = Object.create( require('./controller/shopClickAndPose') )
  , traceConveyor = Object.create( require('./controller/traceConveyor') )

  , eventDispatcher = require('./system/eventDispatcher')
  , productionPhase = require('./system/productionPhase')

// init model
kitchen.init(16,16)
gameState.init()
controlState.init()

// test
testFactory.copyKitchen( kitchen , 9 )

// init system
var modelBall = {
    kitchen: kitchen,
    gameState: gameState,
    controlState: controlState
}

productionPhase.init( modelBall )

// init renderer
var renderer = Object.create( mainRenderer ).init( modelBall )
var ui = Object.create( UI ).init()

// controller
shopClickAndPose.init( modelBall )
traceConveyor.init( modelBall )



// start render loop

window.requestAnimationFrame(function cycle(){
    eventDispatcher.dispatch('pre-update')
    eventDispatcher.dispatch('update')
    eventDispatcher.dispatch('post-update')

    eventDispatcher.dispatch('pre-render')
    renderer.render()
    eventDispatcher.dispatch('post-render')

    window.requestAnimationFrame(cycle)
})

// manage phases
eventDispatcher.dispatch('start-production')

},{"../tests/sampleFactory":25,"./controller/shopClickAndPose":2,"./controller/traceConveyor":3,"./model/Block":5,"./model/ControlState":6,"./model/GameState":7,"./model/Kitchen":8,"./renderer3d/main":14,"./rendererUI/Menu":17,"./rendererUI/main":18,"./system/eventDispatcher":20,"./system/productionPhase":23}],2:[function(require,module,exports){
var ed = require('../system/eventDispatcher')
  , machine = require('../data/machine')
  , Block = require('../model/Block')


var init = function( modelBall ){

    this.controlState = modelBall.controlState
    this.kitchen = modelBall.kitchen

    ed.listen( 'ui-shop-machine-mousedown' , shopMouseDown.bind( this ) , this )

    this.documentMouseDown = documentMouseDown.bind( this )
    this.documentKeyDown = documentKeyDown.bind( this )

    return this
}


var rotateArray = function( a ){
    var r = []
    for(var x=a[0].length;x--;){
        r[x] = []
        for(var y=a.length;y--;)
            r[x][y] = a[y][ a[0].length - 1 - x]
    }
    a.length = 0
    a.push.apply( a, r )
}

var documentMouseDown = function(){
    if( this.controlState.pose )
        cleanUp.call(this);
}
var documentKeyDown = function( e ){
    if( this.controlState.pose ){
        var m = this.controlState.pose.machine
        switch( e.which ){
            case 82 :
                rotateArray( m.shape )
                break
            case 84 :
                rotateArray( m.shape )
                rotateArray( m.shape )
                rotateArray( m.shape )
                break
            default :
                return
        }

        var y = this.controlState.pose.center.y - m.shape.length / 2 + 0.5
        var x = this.controlState.pose.center.x - m.shape[0].length /2 + 0.5

        m.origin = {
            x: Math.floor( x ),
            y: Math.floor( y )
        }

        this.controlState.pose.accept = this.kitchen.check( m.shape , m.origin )
    }
}

var shopMouseDown = function( data ){

    cleanUp.call(this)

    document.addEventListener('mousedown', this.documentMouseDown, false)
    document.addEventListener('keydown', this.documentKeyDown, false)

    ed.listen( 'scene-mousedown' , mousedown.bind( this ) , this )
    ed.listen( 'scene-mouseup' , mouseup.bind( this ) , this )
    ed.listen( 'scene-mousemove' , mousemove.bind( this ) , this )

    window.setTimeout(function(){

        var b = Object.create( Block ).init( data.id )

        this.controlState.pose = {
            machine: b,
            accept: false
        }

    }.bind(this),0)
}

var cleanUp = function( ){

    document.removeEventListener('mousedown', this.documentMouseDown, false)
    document.removeEventListener('keydown', this.documentKeyDown, false)

    ed.unlisten( 'scene-mousedown' , this )
    ed.unlisten( 'scene-mouseup' , this )
    ed.unlisten( 'scene-mousemove' , this )

    this.controlState.pose = null
}

var mousemove = function( data ){

    var m = this.controlState.pose.machine

    this.controlState.pose.center = {
        y: data.gridY,
        x: data.gridX
    }

    var y = this.controlState.pose.center.y - m.shape.length / 2 + 0.5
    var x = this.controlState.pose.center.x - m.shape[0].length /2 + 0.5

    m.origin = {
        x: Math.floor( x ),
        y: Math.floor( y )
    }

    this.controlState.pose.accept = this.kitchen.check( m.shape , m.origin )

}
var mousedown = function( data ){
    // TODO check left button
    pose.call( this )
}
var mouseup = function( data ){
    pose.call( this )
}

var pose = function(){
    if( this.controlState.pose.accept )
        this.kitchen.addBlock( this.controlState.pose.machine )
    cleanUp.call( this )
}


module.exports = {
    init: init
}

},{"../data/machine":4,"../model/Block":5,"../system/eventDispatcher":20}],3:[function(require,module,exports){
var ed = require('../system/eventDispatcher')
  , grid = require('../system/grid')
  , machine = require('../data/machine')
  , Block = require('../model/Block')


var init = function( modelBall ){

    this.controlState = modelBall.controlState
    this.kitchen = modelBall.kitchen

    ed.listen( 'ui-shop-conveyor-mousedown' , shopMouseDown.bind( this ) , this )

    this.documentMouseDown = documentMouseDown.bind( this )


    this.find = grid.findAround.bind( null, this.kitchen.availablesCells )
    this.acceptableStart = function( x,y ){
        return this.kitchen.availablesCells[y][x] == 0
    }

    return this
}


var rotateArray = function( a ){
    var r = []
    for(var x=a[0].length;x--;){
        r[x] = []
        for(var y=a.length;y--;)
            r[x][y] = a[y][ a[0].length - 1 - x]
    }
    a.length = 0
    a.push.apply( a, r )
}

var documentMouseDown = function(){
    if( this.controlState.pose )
        cleanUp.call(this);
}

var shopMouseDown = function( data ){

    cleanUp.call(this)

    document.addEventListener('mousedown', this.documentMouseDown, false)

    ed.listen( 'scene-mousedown' , mousedown1.bind( this ) , 'conv1' )
    ed.listen( 'scene-mousemove' , mousemove1.bind( this ) , 'conv1' )

    window.setTimeout(function(){

        this.controlState.conveyor = {
            path : [ {x:0, y:0} ]
        }

    }.bind(this),0)
}

var cleanUp = function( ){

    document.removeEventListener('mousedown', this.documentMouseDown, false)

    ed.unlisten( 'scene-mousedown' , 'conv1' )
    ed.unlisten( 'scene-mousemove' , 'conv1' )

    ed.unlisten( 'scene-mousemove' , 'conv2' )
    ed.unlisten( 'scene-mouseup' , 'conv2' )

    this.controlState.conveyor = null
}

var mousemove1 = function( data ){

    var path = this.controlState.conveyor.path

    var x = Math.round( data.gridX - 0.5 )
    var y = Math.round( data.gridY - 0.5 )

    path[0].x = x
    path[0].y = y

    this.controlState.conveyor.accept = this.acceptableStart(x,y)
}
var mousedown1 = function( data ){

    ed.unlisten( 'scene-mousedown' , 'conv1' )
    ed.unlisten( 'scene-mousemove' , 'conv1' )

    ed.dispatch( 'scene-start-drag' )

    ed.listen( 'scene-mouseup' , mouseup2.bind( this ) , 'conv2' )
    ed.listen( 'scene-mousemove' , mousemove2.bind( this ) , 'conv2' )
}

var mousemove2 = function( data ){

    var path = this.controlState.conveyor.path

    var x = Math.round( data.gridX - 0.5 )
    var y = Math.round( data.gridY - 0.5 )

    for( var i=0;i<path.length;i++)
        if( path[i].x ==x && path[i].y ==y )
            break

    path.splice(i,Infinity,{x:x,y:y})

}
var mouseup2 = function( data ){

    ed.dispatch( 'scene-stop-drag' )

    var path = this.controlState.conveyor.path

    // analyse the path
    var input0 = this.find( 3 , path[0].x, path[0].y )
    var output0 = this.kitchen.availablesCells[ path[0].y ][ path[0].x ] == 2

    var inputL = this.find( 3 , path[path.length-1].x, path[path.length-1].y )
    var outputL = this.kitchen.availablesCells[ path[path.length-1].y ][ path[path.length-1].x ] == 2

    // consistent branching
    if( !( input0.length>0 && inputL.length>0 ) && !( output0 && outputL ) ){

        if( inputL.length>0 ){
            path.reverse()

            var tmp = input0
            input0 = inputL
            inputL = tmp
        }

        var o
        if( input0.length>0 ){
            o = input0[0]
        }else{
            o = {
                x: path[0].x,
                y: path[0].y+1
            }
        }


        var getShapeFor = function( start, end , b ){
            if( start.x - end.x == -1 ){
                b.shape = [[2,3]]
                b.origin.x = start.x
                b.origin.y = start.y
            }

            else if( start.x - end.x == 1 ){
                b.shape = [[3,2]]
                b.origin.x = end.x
                b.origin.y = end.y
            }

            else if( start.y - end.y == -1 ){
                b.shape = [[3],[2]]
                b.origin.x = start.x
                b.origin.y = start.y
            }

            else if( start.y - end.y == 1 ){
                b.shape = [[2],[3]]
                b.origin.x = end.x
                b.origin.y = end.y
            }
        }

        for(var i=0;i<path.length;i++){

            var k = path[i]
            var b = Object.create( Block ).init('conveyor')
            b.shape = []
            getShapeFor( o , k , b )
            this.kitchen.addBlock( b )

            o=k
        }


    }

    cleanUp.call(this)
}


module.exports = {
    init: init
}

},{"../data/machine":4,"../model/Block":5,"../system/eventDispatcher":20,"../system/grid":22}],4:[function(require,module,exports){
module.exports = {
    'conveyor': {
        description: 'unit conveyor',
        recipes: [
            {
                inputs : {'all':1},
                outputs : {'all':1},
                delay : 120
            }
        ],
        storage: 1,
        shape:[[2,3]],
        cost: 1,
    },

    'buffer': {
        description: 'store tokens',
        recipes: [
            {
                inputs : {'all':1},
                outputs : {'all':1},
                delay : 120
            }
        ],
        storage: 8,
        shape:[[2,1,1,3]],
        cost: 1,
    },

    'machine1': {
        description: 'a machine, whatever',
        recipes: [
            {
                inputs : {
                    'B': 1,
                    'A': 2,
                },
                outputs : {
                    'C': 1,
                    //'D': 2,
                },
                delay : 200
            },
        ],
        storage: 5,
        shape:[
            [0,2,0],
            [1,1,1],
            [1,3,1],
        ],
        cost: 1,
    },

    'cutter': {
        description: 'This fucking machine cut fucking things',
        recipes: [
            {
                inputs : {
                    'ugly fish': 1,
                },
                outputs : {
                    'cut fish': 1,
                },
                delay : 50
            },
            {
                inputs : {
                    'drunk shrimp': 1,
                },
                outputs : {
                    'cut shrimp': 1,
                },
                delay : 50
            },
        ],
        storage: 1,
        shape:[
            [0,2,0],
            [1,1,1],
            [1,3,1],
        ],
        cost: 1,
    },

    'rice cooker': {
        description: 'Like a boiling stuff I guess, but rice on it',
        recipes: [
            {
                inputs : {
                    'rice': 8,
                },
                outputs : {
                    'cooked rice': 8,
                },
                delay : 250
            },
        ],
        storage: 8,
        shape:[
            [0,2,0],
            [1,1,1],
            [1,1,1],
            [1,1,1],
            [1,1,1],
            [1,3,1],
        ],
        cost: 1,
    },

}

},{}],5:[function(require,module,exports){
var Abstract = require('../utils/Abstract')
  , machine = require('../data/machine')
  , ed = require('../system/eventDispatcher')

/*
 * shapes : [][] contains for each cells :
 *     - 0 empty cell
 *     - 1 machine cell
 *     - 2 input cell ( does not belong to the machine )
 *     - 3 output cell ( does belong to the machine )
 */


var getSymbols = function( symbol ){
    var points = [];
    for(var y=this.shape.length; y--; )
    for(var x=this.shape[y].length; x--; )
        if( this.shape[y][x] == symbol )
            points.push({x:x+this.origin.x, y:y+this.origin.y})
    return points
}

var clone = function(block) {
	this.shape=[]
	for(var y=block.shape.length; y--; ){
		this.shape[y] = [];
    	for(var x=block.shape[y].length; x--; ){
    		this.shape[y][x]=block.shape[y][x];
    	}
	}
	return this;
}

var init = function( type ){

    this.type = type

    var patron = machine[ type ] || {}

    this.shape = []
    for(var y=(patron.shape||[]).length;y--;){
        this.shape[y] = []
        for(var x=patron.shape[y].length;x--;){
            this.shape[y][x] = patron.shape[y][x]
        }
    }

    this.origin = {
        x: 0,
        y: 0
    }

    ed.dispatch( 'machine-spawn', {
        machine: this
    })

    return this
}

var remove = function(){
    ed.dispatch( 'machine-removed', {
        machine: this
    })
}

module.exports = Object.create( Abstract )
.extend({
    getInputs : function(){ return getSymbols.call(this,2)},
    getOutputs : function(){ return getSymbols.call(this,3)},
    clone: clone,
    init: init,
    remove: remove
})

},{"../data/machine":4,"../system/eventDispatcher":20,"../utils/Abstract":24}],6:[function(require,module,exports){
var Abstract = require('../utils/Abstract')

var init = function( ){
    return this
}

module.exports = Object.create( Abstract )
.extend({
    init: init,
})

},{"../utils/Abstract":24}],7:[function(require,module,exports){
module.exports=require(6)
},{"../utils/Abstract":24,"C:\\Data\\GitHub\\The-Marvellous-Factory\\js\\model\\ControlState.js":6}],8:[function(require,module,exports){
var Abstract = require('../utils/Abstract')


var init = function(width, height){

    this.width = width;
    this.height = height;

    this.blocks = []
    this.tokens = []

    this.availablesCells = []
    this.blockRef = []
    for(var i=height;i--;) {
        this.availablesCells.push(new Array(width))
        this.blockRef.push(new Array(width))
    }
    return this
}

var check = function(shape,origin) {
    for(var y=shape.length; y--; )
    for(var x=shape[y].length; x--; )
        if( (shape[y][x] == 1 || shape[y][x] == 3 ) &&
            ( y+origin.y < 0 || y+origin.y >= this.height ||
            x+origin.x < 0 || x+origin.x >= this.width ||
            this.availablesCells[y+origin.y][x+origin.x] ) )
            return false
    return true
}

var addBlock = function(block) {
    for(var y=block.shape.length; y--; )
    for(var x=block.shape[y].length; x--; )
        if( block.shape[y][x] > 1 ){
            if( this.availablesCells[y+block.origin.y][x+block.origin.x] + block.shape[y][x] == 5 )
                this.availablesCells[y+block.origin.y][x+block.origin.x] = 5;
            else
                this.availablesCells[y+block.origin.y][x+block.origin.x] = block.shape[y][x];
            this.blockRef[y+block.origin.y][x+block.origin.x] = block;
        }
    this.blocks.push(block)
    return this
}

var removeBlock = function(block) {
    for(var y=block.shape.length; y--; )
    for(var x=block.shape[y].length; x--; )
        if( block.shape[y][x] == 1 || block.shape[y][x] == 3 ){
            this.availablesCells[y+block.origin.y][x+block.origin.x] = 0;
            this.blockRef[y+block.origin.y][x+block.origin.x] = null;
        }
    if( block._sprite ){
        block._sprite.removeChildren()
    }
    this.blocks.splice( this.blocks.indexOf(block), 1 )
    return this
}

var getBlock = function(x, y) {
    return this.blockRef[y][x] ;
}

module.exports = Object.create( Abstract )
.extend({
    reset : function(){
        this.init( this.width, this.height )
        return this
    },
    check : check,
    init : init,
    addBlock : addBlock,
    removeBlock : removeBlock,
    getBlock : getBlock
})

},{"../utils/Abstract":24}],9:[function(require,module,exports){
var Abstract = require('../utils/Abstract')

var init = function( ){
    this.in = []
    this.out = []

    this.waitBuffer = [];
    this.outTokens = [];

    return this
}


var tokenAcceptable = function( token ){
    return true
}
var consumeToken = function( token ){

    token.entrerInPipe( this )

    this.waitBuffer.push(token)
}
var process = function( token ){

}

module.exports = Object.create( Abstract )
.extend({
    init: init,
    tokenAcceptable : tokenAcceptable,
    process : process,
    consumeToken: consumeToken
})

},{"../utils/Abstract":24}],10:[function(require,module,exports){
var Abstract = require('../utils/Abstract')
  , machineSpec = require('../data/machine')
  , pipe = require('./Pipe')
  , Token = require('./Token')
  , ed = require('../system/eventDispatcher')


var create = function( block ){
    var base;
    switch( block.type ){

        case 'dummy' :
            base = dummy
            break

        case 'emiter' :
            base = emiter
            break

        case 'conveyor' :
            base = conveyor
            break

        case 'receiver':
            base = receiver
            break

        default :
            base = generic
            break
    }

    var pipe = Object.create( base ).init()
    pipe.maxStorage = (machineSpec[ block.type ]||{}).storage || 1
    pipe.recipes = (machineSpec[ block.type ]||{}).recipes || []

    return pipe
}

var dummy = Object.create(pipe).extend({
    tokenAcceptable : function(token){
        // always accept
        return this.waitBuffer.length + this.outTokens.length < this.maxStorage
    },
    process : function(){
        // instant transfert
        this.outTokens = this.outTokens.concat(this.waitBuffer.splice(0,Infinity))
    },
})

var recipeWithToken = function( recipes, tokenType ){
    for(var k = recipes.length; k--;)
        if( recipes[k].inputs[tokenType] || recipes[k].inputs['all'] )
            return recipes[k]
}
var containsEveryThingForRecipe = function( recipe, pool ){
    if( recipe.inputs.all )
        return pool.length >= recipe.inputs.all
    for( var type in recipe.inputs )
        if( pool.reduce(function(v,t){ return v + (t.type==type) },0) < recipe.inputs[type] )
            return false
    return true
}

var generic = Object.create(pipe).extend({
    tokenAcceptable : function(token){

        if( this.processing || this.waitBuffer.length + this.outTokens.length >= this.maxStorage)
            return false

        var recipe

        // grab the recipe, either the one pending, or one possible with this token, or null
        if( !(recipe = this.currentRecipe = this.currentRecipe || recipeWithToken( this.recipes , token.type ) ) )
            return false

        // recipe accept all
        if( recipe.inputs.all )
            return ( this.waitBuffer.length == 0  || this.waitBuffer[0].type == token.type )

        // does we have enougth token of this type for the recipe ?
        var sameTypeAlreadyIn = this.waitBuffer.reduce(function(v,t){
            return v + (t.type==token.type)
        },0)
        if ( sameTypeAlreadyIn < recipe.inputs[token.type] )
            return true

        return false
    },
    process : function(){

        if( this.processing ){
            if(  this.d -- <= 0 ){

                //// end of recipe
                var recipe = this.currentRecipe

                // calc the max age
                var age = this.waitBuffer.reduce(function(v,t){
                    return Math.max(v,t.age)
                },0)

                // create new tokens
                for( var type in recipe.outputs )
                    for ( var k=recipe.outputs[type]; k--;){
                        if( type == 'all' )
                            type = this.waitBuffer[0].type
                        var out = Object.create( Token ).init({type: type})
                        out.age = age
                        this.outTokens.push( out )
                        out.entrerInPipe( this )
                    }

                // remove inputs
                var age = this.waitBuffer.forEach(function(t){
                    t.remove()
                })
                this.waitBuffer.length=0

                this.processing = false
                this.currentRecipe = null
            }
        }else if( this.currentRecipe ){
            if ( containsEveryThingForRecipe( this.currentRecipe , this.waitBuffer ) ){
                // start recipe
                this.processing = true
                this.d = this.currentRecipe.delay
            }
        }

    },
})

var emiter = Object.create(pipe).extend({
    tokenAcceptable : function(token){
        return false
    },
    process : function(){

        this.d = (this.d || 0) + 1

        if ( this.d >= 200 && this.waitBuffer.length + this.outTokens.length < this.maxStorage ){
            this.d = 0

            var token = Object.create( Token ).init({type: this.machine.tokenType})

            this.outTokens.push( token )
            token.entrerInPipe( this )
        }
    },
})

var conveyor = Object.create(pipe).extend({
    tokenAcceptable : function(token){
        // always accept
        return this.waitBuffer.length + this.outTokens.length < this.maxStorage
    },
    process : function(){

        for( var i = this.waitBuffer.length; i--;)
            if( this.waitBuffer[i].age - this.waitBuffer[i].ageInPipe > 110 )
                this.outTokens.push( this.waitBuffer.splice(i,1)[0] )

    },
})

var receiver = Object.create(pipe).extend({
    tokenAcceptable: function(token){
        return true;
    },
    process: function(){
        for( var i = this.waitBuffer.length; i--; ){
            ed.dispatch('receive-token', {
                token: this.waitBuffer[i]
            });
            this.waitBuffer[i].remove();
        }
    },
})

module.exports = {
     create: create
}

},{"../data/machine":4,"../system/eventDispatcher":20,"../utils/Abstract":24,"./Pipe":9,"./Token":11}],11:[function(require,module,exports){
var Abstract = require('../utils/Abstract')
  , ed = require('../system/eventDispatcher')




var init = function( o ){

    o = o||{}

    this.type = o.type
    this.age = 0

    ed.listen('update' , update.bind(this), this)

    ed.dispatch( 'token-spawn', {
        token: this
    })

    return this
}

var remove = function(){
    ed.dispatch( 'token-removed', {
        token: this
    })
}

var entrerInPipe = function( pipe ){
    this.ageInPipe = this.age
    this.pipe = pipe
}

var update = function( ){
    this.age ++
}

var getPosition = function(){

    var machine = this.pipe.machine

    var i = machine.getInputs()[0],
        o = machine.getOutputs()[0]

    var d = 100

    var k = Math.min( ( this.age - this.ageInPipe ) / d , 1 )

    if( i && o )
        return {
            x : i.x * (1-k) + o.x * (k),
            y : i.y * (1-k) + o.y * (k)
        }
    else
        return i || o || machine.origin
}

module.exports = Object.create( Abstract )
.extend({
    init: init,
    entrerInPipe: entrerInPipe,
    getPosition: getPosition,
    remove: remove
})

},{"../system/eventDispatcher":20,"../utils/Abstract":24}],12:[function(require,module,exports){

var init = function( modelBall ){
    this.layer = new THREE.Object3D()

    this.kitchen = modelBall.kitchen

    this.layer.add( buildFloor( modelBall.kitchen.width, modelBall.kitchen.height ) )

    return this
}

var buildFloor = function( width , height ){
    var container = new THREE.Object3D()

    var geometry = new THREE.PlaneGeometry( width , height );

    var ts = 256
    var canvas = document.createElement('canvas')
    canvas.height = ts
    canvas.width = ts
    var ctx = canvas.getContext('2d')

    ctx.lineWidth = 10
    ctx.strokeStyle = "#333333";
    ctx.fillStyle = "#ffffff";
    ctx.rect(0,0,ts,ts)
    ctx.fill()
    ctx.stroke()

    var texture = new THREE.Texture( canvas ) ;
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    //texture.generateMipmaps = false
	texture.needsUpdate = true


    var material = new THREE.MeshPhongMaterial( {
        color: 0xFFFFFF,
        shininess : 60,
        specular: 0xFFFFFF,
        map : texture,
        side: THREE.DoubleSide,
        bumpMap: texture,
		bumpScale: 0.01,
    } );


geometry.faceVertexUvs = [[
    [
        new THREE.Vector2(0, height),
        new THREE.Vector2(0, 0),
        new THREE.Vector2(width, height)
    ],
    [
        new THREE.Vector2(0, 0),
        new THREE.Vector2(width, 0),
        new THREE.Vector2(width, height)
    ]
]]
geometry.uvsNeedUpdate= true



    var plane = new THREE.Mesh( geometry, material );
    plane.rotation.x = Math.PI/2
    plane.position.x = width/2
    plane.position.z = height/2
    plane.name = 'ground'

    return plane
}


var render = function( blocks ){

}

module.exports = {
    render : render,
    init: init
}

},{}],13:[function(require,module,exports){
var steel = THREE.ImageUtils.loadTexture( "/assets/DessinsTM/4848/steel.gif" );
steel.wrapS = steel.wrapT = THREE.RepeatWrapping;
steel.repeat.set( 1, 1 );

var belt = THREE.ImageUtils.loadTexture( "/assets/DessinsTM/4848/tapis1.gif" );
belt.wrapS = THREE.RepeatWrapping;
belt.wrapT = THREE.RepeatWrapping;
belt.repeat.set( 1, 1 );



var ghostMat  =new THREE.MeshPhongMaterial( {
    color: 0x3eb114,
    transparent: true,
    opacity: 0.4,
    shininess : 2,
    specular: 0xFFFFFF,
});
var ghostMat2  =new THREE.MeshPhongMaterial( {
    color: 0xaf1213,
    transparent: true,
    opacity: 0.4,
    shininess : 2,
    specular: 0xFFFFFF,
} );

var init = function( modelBall ){
    this.layer = new THREE.Object3D()

    this.kitchen = modelBall.kitchen
    this.controlState = modelBall.controlState

    return this
}

var buildArrow = (function(){
    var shape = new THREE.Shape([
        new THREE.Vector2 ( 0,0.3 ),
        new THREE.Vector2 ( 0.2,0 ),
        new THREE.Vector2 ( 0.1,0 ),
        new THREE.Vector2 ( 0.1,-0.2 ),
        new THREE.Vector2 ( -0.1,-0.2 ),
        new THREE.Vector2 ( -0.1,0 ),
        new THREE.Vector2 ( -0.2,0 ),
        new THREE.Vector2 ( 0,0.3 ),
    ]);
    var extrudeSettings = {
					amount			: 0.1,
					steps			: 1,
					bevelEnabled	: false,
				};
    return function(){
        var geom = new THREE.ExtrudeGeometry( shape,extrudeSettings );
        geom.applyMatrix( (new THREE.Matrix4()).makeRotationX( Math.PI/2 ) )
        return geom
    }
})()

var buildMachineBody = function( ){
    var geom = new THREE.BoxGeometry( 1, 0.8, 1  );
    geom.applyMatrix( (new THREE.Matrix4()).setPosition(new THREE.Vector3(0,0.4,0) ) )
    return geom
}
var buildMachineOpening = function( ){

    var top = new THREE.BoxGeometry( 1, 0.1, 1 );
    top.applyMatrix( (new THREE.Matrix4()).setPosition(new THREE.Vector3(0,0.75,0) ) )

    var left = new THREE.BoxGeometry( 0.2, 0.3, 1 );
    left.applyMatrix( (new THREE.Matrix4()).setPosition(new THREE.Vector3(-0.4,0.55,0) ) )

    var right = new THREE.BoxGeometry( 0.2, 0.3, 1 );
    right.applyMatrix( (new THREE.Matrix4()).setPosition(new THREE.Vector3(0.4,0.55,0) ) )

    //var bottom = new THREE.BoxGeometry( 1, 0.4, 1 );
    //bottom.applyMatrix( (new THREE.Matrix4()).setPosition(new THREE.Vector3(0,0.2,0) ) )

    var arrow = buildArrow();
    arrow.applyMatrix( (new THREE.Matrix4()).setPosition(new THREE.Vector3(0,0.85,0) ) )

    //top.merge( bottom )
    top.merge( arrow )
    top.merge( left )
    top.merge( right )

    return top
}

var buildConvBody = function( materials ){
    var bottom = new THREE.BoxGeometry( 1, 0.4, 1, materials );
    bottom.applyMatrix( (new THREE.Matrix4()).setPosition(new THREE.Vector3(0,0.2,0) ) )
    return bottom
}

var buildMachine = function( block ){
    var container = new THREE.Object3D()

    var material = new THREE.MeshPhongMaterial( {
        color: 0xD0D9D9,
        map: steel,
        shininess : 12,
        specular: 0xFFFFFF,
    } );

    for(var y=block.shape.length; y--; )
    for(var x=block.shape[y].length; x--; )
        {
            if( block.shape[y][x] == 1 )
            {
                var cube = new THREE.Mesh( buildMachineBody(), material );
                cube.position.x = x+0.5
                cube.position.z = y+0.5

                container.add( cube )
            }
            if( block.shape[y][x] == 2 || block.shape[y][x] == 3 )
            {
                var cube = new THREE.Mesh( buildMachineOpening(), material );
                cube.position.x = x+0.5
                cube.position.z = y+0.5
                cube.rotation.y = Math.PI/2

                container.add( cube )
            }
        }
    return container
}

var buildEmiter = function( block ) {
    var container = new THREE.Object3D();

    var material = new THREE.MeshPhongMaterial( {
        color: 0xD0D9D9,
        map: steel,
        shininess : 12,
        specular: 0xFFFFFF,
    } );

    var geometry = new THREE.CylinderGeometry( 0.2, 0.2, 50 , 20 );
    var cylinder = new THREE.Mesh( geometry, material);
    cylinder.position.x = 0.5;
    cylinder.position.z = 0.5;
    cylinder.position.y = 26;
    container.add(cylinder);

    var geometry = new THREE.CylinderGeometry( 0.2, 0.5, 0.5 , 20 );
    var cylinder = new THREE.Mesh( geometry, material);
    cylinder.position.x = 0.5;
    cylinder.position.z = 0.5;
    cylinder.position.y = 1.25;
    container.add(cylinder);

    return container;
}

var buildConv = function( block ){
    var container = new THREE.Object3D()

    var materialBelt = new THREE.MeshPhongMaterial( {
        color: 0xD0D9D9,
        map: belt,
        shininess : 1,
        specular: 0xFFFFFF,

    } );

    var materialSteel = new THREE.MeshPhongMaterial( {
        color: 0xD0D9D9,
        map: steel,
        shininess : 12,
        specular: 0xFFFFFF,

    } );

    var materials = [materialSteel, materialSteel, materialBelt, materialSteel, materialSteel, materialSteel];

    for(var y=block.shape.length; y--; )
    for(var x=block.shape[y].length; x--; )
        {
            if( block.shape[y][x] > 0 )
            {
                var cube = new THREE.Mesh( buildConvBody(), new THREE.MeshFaceMaterial(materials) );
                cube.position.x = x+0.5
                cube.position.z = y+0.5

                container.add( cube )
            }
        }
    return container
}


var renderId=0
var render = function( ){
    var layer = this.layer

    renderId ++
    this.kitchen.blocks.forEach(function(block){
        var visual;
        if (!(visual = block._visual)){
            var build ;
            switch(block.type) {
                case 'conveyor':
                    build = buildConv(block);
                    break;
                case 'emiter':
                    build = buildEmiter(block);
                    break;
                default:
                    build = buildMachine( block );
            }
            block._visual = visual = build;
            layer.add(visual)
        }

        visual._m_renderId = renderId

        // alter visual geometry
        visual.position.x = block.origin.x
        visual.position.z = block.origin.y
    });


    // TODO clean up useless visual
    this.layer.children


    renderFlyingMachine.call( this )
    renderFlyingConveyor.call( this )

}

var arrayHash = function( a ){
    var x=0
    return 'x'+a.reduce(function(p,a){
        return p + ''+(a.x+''+a.y+' '+(x++))
    },'|')
}
var shapeHash = function( a ){
    var x=0
    return a.reduce(function(p,a){
        return p + 'x'+a.reduce(function(p,a){
            return p + ''+(a+''+(x++))
        },'|')
    },'')
}

var renderFlyingMachine = function(){
    if( this.controlState.pose ){

        var m = this.controlState.pose.machine

        if(!this._flying || ( this._flying.shapeHash != shapeHash( m.shape ) )){

            if( this._flying )
                this.layer.remove( this._flying )

            this._flying = buildMachine( m )
            this._flying.shapeHash = shapeHash( m.shape )
            this.layer.add( this._flying )
        }

        var material = this._flying.children[0].material
        material.color = new THREE.Color( !this.controlState.pose.accept ? 0xaf1213 : 0x3eb114 );
        material.transparent = true
        material.opacity = 0.5

        this._flying.position.x = m.origin.x
        this._flying.position.z = m.origin.y



    }else if( this._flying ){
        this.layer.remove( this._flying )
        this._flying = null
    }
}


var renderFlyingConveyor = function(){
    if( this.controlState.conveyor ){

        var path = this.controlState.conveyor.path

        if(!this._flyingConveyor || ( this._flyingConveyor.pathHash != arrayHash( path ) )){

            if( this._flyingConveyor )
                this.layer.remove( this._flyingConveyor )

            this._flyingConveyor = new THREE.Object3D()

            for( var i=path.length;i--;){
                var b = new THREE.Mesh( buildMachineBody(), this.controlState.conveyor.accept ? ghostMat2 : ghostMat )
                this._flyingConveyor.add( b )
                b.position.x = path[i].x + 0.5
                b.position.z = path[i].y + 0.5
            }

            this._flyingConveyor.pathHash = arrayHash( path )
            this.layer.add( this._flyingConveyor )
        }

    }else if( this._flyingConveyor ){
        this.layer.remove( this._flyingConveyor )
        this._flyingConveyor = null
    }
}

module.exports = {
    render : render,
    init: init
}

},{}],14:[function(require,module,exports){
var machineRenderer = require('./machine')
  , gridRenderer = require('./grid')
  , tokenRenderer = require('./token')
  , userInput = require('./userInput')
  , ed = require('../system/eventDispatcher')



var bootstrapThree = function(){

	var camera = this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.z = 14;
	camera.position.y = 10;



	var scene = this.scene = new THREE.Scene();


	// lights

	var light = new THREE.PointLight( 0xffffff , 0.1 , 0);
	light.position.set( 8, 100, 8 );
	//scene.add( light );

	var light = new THREE.DirectionalLight( 0x333333 );
	light.position.set( 8, 10, 8 );
    //scene.add( light );

    var hemiLight = new THREE.HemisphereLight( 0x333333, 0x333333, 0.6 );
    hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
    hemiLight.position.set( 0, 1000, 0 );
    scene.add( hemiLight );

	var light = new THREE.AmbientLight( 0x555555 );
	scene.add( light );


	// renderer

	var renderer = this.renderer = new THREE.WebGLRenderer( );
	renderer.setSize( window.innerWidth, window.innerHeight );

    document.getElementById("gamescreen").appendChild(renderer.domElement);

    var controls = this.controls =  new THREE.OrbitControls( camera , renderer.domElement );
    controls.center.x = 8
    controls.center.y = 1
    controls.center.z = 8
    controls.update()
    controls.addEventListener( 'change', function render() {
        ed.dispatch('render3D-camera-change')
    });

}

var init = function( modelBall ) {

    bootstrapThree.call(this)

    this.kitchen = modelBall.kitchen
    this.tokenPool = modelBall.tokenPool

    this.machineRenderer = Object.create( machineRenderer ).init( modelBall )
    this.gridRenderer = Object.create( gridRenderer ).init( modelBall )
    this.tokenRenderer = Object.create( tokenRenderer ).init( modelBall )

    this.scene.add( this.machineRenderer.layer )
    this.scene.add( this.tokenRenderer.layer )
    this.scene.add( this.gridRenderer.layer )


    this.userInput = Object.create( userInput ).init( this.scene , this.camera, this.renderer.domElement )

    ed.listen( 'scene-stop-drag', enableCameraControl.bind(this) , this )
    ed.listen( 'scene-start-drag', disableCameraControl.bind(this) , this )

    return this
}

var enableCameraControl = function(){
    this.controls.enabled = true
}
var disableCameraControl = function(){
    this.controls.enabled = false
}

var render = function( kitchen ){
    this.machineRenderer.render( this.kitchen.blocks )
    this.tokenRenderer.render( this.tokenPool )

    this.renderer.render( this.scene, this.camera );
}

module.exports = {
    init: init,
    render: render
}

},{"../system/eventDispatcher":20,"./grid":12,"./machine":13,"./token":15,"./userInput":16}],15:[function(require,module,exports){
var ed = require('../system/eventDispatcher')


var init = function( info ){
    this.layer = new THREE.Object3D()

    ed.listen('token-spawn' , spawn.bind(this), this)
    ed.listen('token-removed' , remove.bind(this), this)

    initSpriteMaterial.call(this)

    return this
}

var initSpriteMaterial = function(){

    this.spriteMaterials = {}

    var texture = THREE.ImageUtils.loadTexture( "/assets/DessinsTM/4848/poisson2.gif" );
    this.spriteMaterials[ 'B' ] = new THREE.SpriteMaterial( { map: texture, fog: true } );

    var texture = THREE.ImageUtils.loadTexture( "/assets/crab-colour-reduce.svg" );
    this.spriteMaterials[ 'C' ] = new THREE.SpriteMaterial( { map: texture, fog: true } );

    var texture = THREE.ImageUtils.loadTexture( "/assets/DessinsTM/4848/poisson3.gif" );
    this.spriteMaterials[ 'A' ] = new THREE.SpriteMaterial( { map:texture, fog: true } );

    var texture = THREE.ImageUtils.loadTexture( "/assets/DessinsTM/4848/poisson4.gif" );
    this.spriteMaterials[ 'D' ] = new THREE.SpriteMaterial( { map:texture, fog: true } );
    this.spriteMaterials[ 'default' ] = new THREE.SpriteMaterial( { map:texture, fog: true } );
}

var remove = function( data ){
    var token = data.token

    for( var i =this.layer.children.length; i--;)
        if( this.layer.children[i].model == token )
            this.layer.remove( this.layer.children[i] )
}

var spawn = function( data ){
    var token = data.token

    var sp = new THREE.Sprite( this.spriteMaterials[ token.type ] || this.spriteMaterials.default );
    sp.scale.x= sp.scale.y= sp.scale.z= 0.3

    sp.model = token

    this.layer.add( sp )
}

var render = function(  ){
    this.layer.children.forEach(function(token){
        var model = token.model

        var p = model.getPosition()
        token.position.x = p.x + 0.5
        token.position.y = 0.6
        token.position.z = p.y + 0.5
    })
}

module.exports = {
    render : render,
    init: init
}

},{"../system/eventDispatcher":20}],16:[function(require,module,exports){
var ed = require('../system/eventDispatcher')

var mouseEvent = function( event ){

    var eventName;

    switch( event.type ){
        case 'mousedown' :
            eventName = 'scene-mousedown'
            break
        case 'mouseup' :
            eventName = 'scene-mouseup'
            break
        case 'mousemove' :
            eventName = 'scene-mousemove'
            break
        default :
            return
    }

    if( !ed.hasListener(eventName) )
        return


    var xScreen = (event.x / this.dom.offsetWidth)*2 - 1
    var yScreen = -( (event.y / this.dom.offsetHeight)*2 - 1 )

    var vector = new THREE.Vector3( xScreen, yScreen, this.camera.near );
    // Convert the [-1, 1] screen coordinate into a world coordinate on the near plane
    vector.unproject( this.camera );

    vector.sub( this.camera.position ).normalize()

    var raycaster = new THREE.Raycaster( this.camera.position, vector );

    // See if the ray from the camera into the world hits one of our meshes
    var intersects = raycaster.intersectObject( this.ground );

    // Toggle rotation bool for meshes that we clicked
    if ( intersects.length > 0 ) {

        ed.dispatch( eventName , {
            gridX : intersects[ 0 ].point.x ,
            gridY : intersects[ 0 ].point.z ,
        })
    }

}

var init = function( scene, camera, dom ){

    this.scene = scene
    this.camera = camera

    this.ground = scene.getObjectByName('ground')

    this.dom = dom

    dom.addEventListener('mousedown', mouseEvent.bind(this), false )
    dom.addEventListener('mouseup', mouseEvent.bind(this), false )
    dom.addEventListener('mousemove', mouseEvent.bind(this), false )

    return this
}


module.exports = {
    init: init,
}

},{"../system/eventDispatcher":20}],17:[function(require,module,exports){
var Abstract = require('../utils/Abstract'),
    ed = require('../system/eventDispatcher')


var init = function() {
	var button1 = document.getElementById('menu-button1')
	button1.onmousedown = function(event){
		ed.dispatch('button1-down');
	}
	var button2 = document.getElementById('menu-button2')
	button2.onmousedown = function(event){
		ed.dispatch('button2-down');
	}
    return this;
}

var render = function() {
    
}

module.exports = Object.create( Abstract )
.extend({
    init: init,
    render: render
})

},{"../system/eventDispatcher":20,"../utils/Abstract":24}],18:[function(require,module,exports){
var Shop = require('./shop')

var init = function(){
    this.shop = Object.create(Shop).init()
}

var build = function(){
    
}

module.exports = {
    init: init
}

},{"./shop":19}],19:[function(require,module,exports){
var machines = require('../data/machine')
  , ed = require('../system/eventDispatcher')

var mouseEvent = function(event){

    // machine
    var id;
    var el = event.target
    while( el.getAttribute && !(id=el.getAttribute('data-machine-id')) )
        el = el.parentNode

    if( id )
        ed.dispatch( 'ui-shop-machine-'+event.type , {id:id} )

    //conveyor
    var el = event.target
    while( el.getAttribute && !(id=el.getAttribute('data-conveyor')) )
        el = el.parentNode

    if( id )
        ed.dispatch( 'ui-shop-conveyor-'+event.type )
}

var init = function( info ){

    this.$shop = document.getElementById('shop')

    this.updateShopList( ['rice cooker', 'cutter'] )

    this.$shop.addEventListener('mousedown', mouseEvent , false )

    return this
}

var updateShopList = function( m ){

    var $ul = this.$shop.querySelector('.shop-machines')

    var lis = ''


    for( var i=0; i<m.length; i++ ){
        lis +=  '<li class="machine" data-machine-id="'+ m[i] + '">'+
                    '<span style="background-image:url(./assets/machine/'+m[i].replace(/ /g,'-')+'.png)"></span>'+
                    '<h3>'+m[i]+'</h3>'+
                '</li>'
    }

    $ul.innerHTML = lis
}

var setVisibility = function(){

}

module.exports = {
    updateShopList : updateShopList,
    init: init
}

},{"../data/machine":4,"../system/eventDispatcher":20}],20:[function(require,module,exports){
var Abstract = require('../utils/Abstract')

var listener = {};

var dispatch = function( eventName, data ){
    var l = listener[ eventName ] || []
    for( var i = l.length; i--;)
        l[i].fn(data, eventName)

    if(!true)
        switch(eventName){
            case 'update':
            case 'post-update':
            case 'pre-update':
            case 'post-render':
            case 'pre-render':
            case 'render3D-camera-change':
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
var hasListener = function( eventName, key ){
    return ( listener[ eventName ] || [] ).length
}

module.exports = Object.create( Abstract )
.extend({
    dispatch: dispatch,
    listen: listen,
    unlisten: unlisten,
    hasListener: hasListener
})

},{"../utils/Abstract":24}],21:[function(require,module,exports){
var PipeFactory = require('../model/PipeFactory')


// merge array B in array A without duplication ( side effect on A )
var merge = function( A , B ){
    return A.concat( B.filter(function( node ){
        return A.indexOf( node ) < 0
    }))
}

// ancestor in in|out
var getRoots = function( node , ancestor ){
    var parents = node[ancestor].reduce(function(soFar, parent){
        return merge( soFar , getRoots(parent, ancestor) )
    },[])
    if( parents.length )
        return parents
    else
        return [node]
}



var buildFormBlocks = function( blocks ){

    var done = []

    //build the graph
    for(var i=blocks.length; i--;){

        var A = PipeFactory.create( blocks[i] )

        blocks[i].pipe = A
        A.machine = blocks[i]

        var Ai = blocks[i].getInputs()
        var Ao = blocks[i].getOutputs()

        for(var k=done.length;k--;){

            var B = done[k].node

            var Bo = done[k].outPoints
            var Bi = done[k].inPoints

            // search match with A input and B ouput
            for( var u=Ai.length;u--;)
            for( var v=Bo.length;v--;)
                if( Ai[u].x == Bo[v].x && Ai[u].y == Bo[v].y ){
                    A.in.push( B )
                    B.out.push( A )
                }

            // search match with A ouput and B input
            for( var u=Ao.length;u--;)
            for( var v=Bi.length;v--;)
                if( Ao[u].x == Bi[v].x && Ao[u].y == Bi[v].y ){
                    A.out.push( B )
                    B.in.push( A )
                }
        }

        done.push({
            node : A,
            outPoints : Ao,
            inPoints : Ai
        })
    }

    // determine the root elements
    return {
        entries : done.reduce(function( soFar , el ){
            return merge( soFar , getRoots( el.node , 'in') )
        },[]),

        exits : done.reduce(function( soFar , el ){
            return merge( soFar , getRoots( el.node , 'out') )
        },[]),
    }
}

var iterateFlow = (function(){

    var rec_follow_stream = function( pipe ){

        // 1 the pipe consume token from the pipe branched to the input
        //   if the token does not belong in any recipe for the pipe, trash it
        //   else pass it to the pipe transform function
        //   if the transform function buffer is full, trash the oldest token to make room

        // 2 apply transformations on the token stored
        //   eventually leads to emit a token on the outside buffer

        // the capacity of the waiting to transform buffer + the outside buffer should not exeed the maximal buffer capacity
        // -> transformation can not create more ressource than it reauire

        // 3 propage to the inputs

        // 1
        for(var i=pipe.in.length; i--;){

            var outTokens = pipe.in[i].outTokens

            // consume
            for( var k=outTokens.length; k--;)
                if( pipe.tokenAcceptable( outTokens[k] ) )
                    pipe.consumeToken( outTokens.splice(k,1)[0] )
        }

        // 2
        pipe.process()

        // 3
        for(var i=pipe.in.length; i--;)
            rec_follow_stream( pipe.in[i] )

    }

    return function( exits ){
        exits.forEach(rec_follow_stream)
    }

})()



module.exports = {
    buildFormBlocks : buildFormBlocks,
    iterateFlow: iterateFlow
}

},{"../model/PipeFactory":10}],22:[function(require,module,exports){

var around = (function(){

    var dir=[
        {x:1,y:0},
        {x:-1,y:0},
        {x:0,y:1},
        {x:0,y:-1}
    ]

    return function( fn , tab , cx , cy ){

        for(var i=4; i--;){
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
    }, tab, cx , cy)
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

},{}],23:[function(require,module,exports){
var ed = require('./eventDispatcher')
  , flow = require('./flow')
  , token = require('../model/Token')


var update = function(){
    flow.iterateFlow( this.graph.exits )
}

var start = function(){
    this.graph = flow.buildFormBlocks( this.kitchen.blocks )

    ed.listen( 'update' , update.bind(this) , this )
}
var stop = function(){
    this.graph = null

    ed.unlisten( 'update' , this )
}

var init = function( modelBall ){
    this.kitchen = modelBall.kitchen

    ed.listen( 'start-production' , start.bind( this ) , this )
    ed.listen( 'stop-production' , stop.bind( this ) , this )
}



 module.exports = {
     init: init
 }

},{"../model/Token":11,"./eventDispatcher":20,"./flow":21}],24:[function(require,module,exports){
module.exports = {
    init:function(){ return this},
    extend:function(o){
        for(var i in o ){
            this[i] = o[i]
        }
        return this
    }
}

},{}],25:[function(require,module,exports){
var samples = require('./samples'),
    block = require('../js/model/Block')

var get = function( k ){
    return samples[(0|k)%samples.length].blocks
    .map(function(o){
        return Object.create(block).extend( o )
    })
}

var copyKitchen = function( kitchen , k ){

    var s = samples[(0|k)%samples.length]

    kitchen.init( s.width , s.height )

    s.blocks
    .map(function(o){
        return Object.create(block).extend( o )
    })
    .forEach(kitchen.addBlock.bind(kitchen))

    return kitchen
}

var copyStore = function( store, k ) {
    var s = samples[(0|k)%samples.length]

    store.init()

    s.store
    .map(function(o){
        return Object.create(block).extend( o )
    })
    .forEach(store.addBlock.bind(store))

    return store
}


module.exports = {
    get : get,
    copyKitchen : copyKitchen,
    copyStore : copyStore
}

},{"../js/model/Block":5,"./samples":26}],26:[function(require,module,exports){
module.exports = [
{
    label: 'one block',
    width: 16,
    height: 16,
    blocks: [],
    store: [
        {
            origin: {x:25, y:15},
            type: "Bidule1",
            price: 1,
            shape: [
                [2,3]
            ]
        },
        {
            origin: {x:25, y:50},
            type: "Bidule2",
            price: 1,
            shape: [
                [2],
                [3]
            ]
        },
        {
            origin: {x:25, y:90},
            type: "Truc1",
            price: 10,
            shape: [
                [1,1,2],
                [3,1,1]
            ]
        },
        {
            origin: {x: 25, y: 150},
            type: "Truc2",
            price: 25,
            shape: [
                [1,2,2,1],
                [1,1,1,1],
                [3,1,1,3],
                [1,3,3,1]
            ]
        }
    ]
},
{
    label: 'multiples blocks',
    width: 16,
    height: 16,
    blocks: [
        {
            origin: {x:5,y:5},
            shape: [
                [0,0,2,0],
                [1,1,1,1],
                [0,1,1,0],
                [0,0,3,0]
            ]
        },
        {
            origin: {x:5,y:10},
            shape: [
                [0,0,2,0],
                [1,1,1,1],
                [0,1,1,0],
                [0,0,3,0]
            ]
        }
    ]
},
{
    label: 'chained blocks',
    width: 16,
    height: 16,
    blocks: [
        {
            origin: {x:5,y:5},
            shape: [
                [0,0,2,0],
                [0,1,1,1],
                [0,0,1,0],
                [0,0,3,0]
            ],
            type: 'dummy'
        },
        {
            origin: {x:5,y:8},
            shape: [
                [0,0,2,0],
                [0,0,3,0]
            ],
            type: 'dummy'
        },
    ]
},
{
    label: 'loop forks',
    width: 16,
    height: 16,
    blocks: [
        {
            origin: {x:4,y:5},
            shape: [
                [0,0,0,2],
                [0,1,1,0],
                [0,1,1,0],
                [0,0,0,3]
            ]
        },
        {
            origin: {x:10,y:5},
            shape: [
                [2,0,0,0],
                [0,1,1,0],
                [0,1,1,0],
                [3,0,0,0]
            ]
        },
        {
            origin: {x:7,y:8},
            shape: [
                [2,0,0,2],
                [0,1,1,0],
                [0,1,1,0],
                [0,3,0,0]
            ]
        },
        {
            origin: {x:7,y:2},
            shape: [
                [0,0,2,0],
                [0,0,1,0],
                [0,1,1,0],
                [3,0,0,3]
            ]
        },
    ]
},
{
    label: 'fork entry',
    width: 16,
    height: 16,
    blocks: [
        {
            origin: {x:4,y:5},
            shape: [
                [0,0,0,2],
                [0,1,1,0],
                [0,1,1,0],
                [0,0,0,3]
            ]
        },
        {
            origin: {x:10,y:5},
            shape: [
                [2,0,0,0],
                [0,1,1,0],
                [0,1,1,0],
                [3,0,0,0]
            ]
        },
        {
            origin: {x:7,y:8},
            shape: [
                [2,0,0,2],
                [0,1,1,0],
                [0,1,1,0],
                [0,3,0,0]
            ]
        },
    ]
},

{
    label: 'parallel chains',
    width: 16,
    height: 16,
    blocks: [
        {
            origin: {x:5,y:5},
            shape: [
                [0,0,2,0],
                [0,1,1,1],
                [0,0,1,0],
                [0,0,3,0]
            ]
        },
        {
            origin: {x:9,y:8},
            shape: [
                [0,0,2,0],
                [0,0,3,0]
            ]
        },

        {
            origin: {x:9,y:5},
            shape: [
                [0,0,2,0],
                [0,1,1,1],
                [0,0,1,0],
                [0,0,3,0]
            ]
        },
        {
            origin: {x:5,y:8},
            shape: [
                [0,0,2,0],
                [0,0,3,0]
            ]
        },
    ]
},

{
    label: 'conveyor',
    width: 16,
    height: 16,
    blocks: [
        {
            origin: {x:5,y:5},
            type: 'emiter',
            tokenType: 'B',
            shape: [
                [0,3]
            ]
        },
        {
            origin: {x:6,y:5},
            type: 'conveyor',
            shape: [
                [2,3]
            ]
        },
        {
            origin: {x:7,y:5},
            type: 'conveyor',
            shape: [
                [2,3]
            ]
        },
        {
            origin: {x:8,y:5},
            type: 'conveyor',
            shape: [
                [2,3]
            ]
        },
        {
            origin: {x:9,y:5},
            type: 'conveyor',
            shape: [
                [2],
                [3]
            ]
        },
        {
            origin: {x:9,y:6},
            type: 'conveyor',
            shape: [
                [2],
                [3]
            ]
        },
        {
            origin: {x:9,y:7},
            type: 'conveyor',
            shape: [
                [2],
                [3]
            ]
        },
        {
            origin: {x:8,y:8},
            type: 'conveyor',
            shape: [
                [3,2]
            ]
        },
        {
            origin: {x:5,y:8},
            type: 'conveyor',
            shape: [
                [3,1,1,2]
            ]
        },
        {
            origin: {x:5,y:7},
            type: 'conveyor',
            shape: [
                [3],
                [2],
            ]
        },
        {
            origin: {x:5,y:6},
            type: 'conveyor',
            shape: [
                [3],
                [2],
            ]
        },
        /*
        {
            origin: {x:5,y:5},
            type: 'conveyor',
            shape: [
                [3],
                [2],
            ]
        },*/
    ]
},
{
    label: 'small conveyor',
    width: 16,
    height: 16,
    blocks: [
        {
            origin: {x:5,y:5},
            type: 'emiter',
            shape: [
                [0,3]
            ]
        },
        {
            origin: {x:6,y:5},
            type: 'conveyor',
            shape: [
                [2,3]
            ]
        },
    ]
},

{
    label: 'machine1',
    width: 16,
    height: 16,
    blocks: [
        {
            origin: {x:4,y:5},
            type: 'conveyor',
            shape: [
                [2,1,3]
            ]
        },
        {
            origin: {x:4,y:7},
            type: 'conveyor',
            shape: [
                [2,1,3]
            ]
        },
        {
            origin: {x:3,y:5},
            type: 'emiter',
            tokenType: 'B',
            shape: [
                [0,3]
            ]
        },
        {
            origin: {x:3,y:7},
            type: 'emiter',
            tokenType: 'A',
            shape: [
                [0,3]
            ]
        },
        {
            origin: {x:6,y:5},
            type: 'machine1',
            shape: [
                [2,1],
                [0,3],
                [2,1],
            ]
        },
        {
            origin: {x:7,y:6},
            type: 'conveyor',
            shape: [
                [2,3]
            ]
        },
        {
            origin: {x:8,y:6},
            type: 'conveyor',
            shape: [
                [2,1,1,1,3]
            ]
        },
        {
            origin: {x:12,y:6},
            type: 'conveyor',
            shape: [
                [2,3]
            ]
        },
    ]
},

{
    label: 'machine1',
    width: 16,
    height: 16,
    blocks: [
        {
            origin: {x:4,y:5},
            type: 'conveyor',
            shape: [
                [2,1,3]
            ]
        },
        {
            origin: {x:1,y:5},
            type: 'conveyor',
            shape: [
                [2,3]
            ]
        },
        {
            origin: {x:4,y:7},
            type: 'conveyor',
            shape: [
                [2,1,3]
            ]
        },
        {
            origin: {x:2,y:5},
            type: 'conveyor',
            shape: [
                [2,1,3]
            ]
        },
        {
            origin: {x:2,y:7},
            type: 'conveyor',
            shape: [
                [2,1,3]
            ]
        },
        {
            origin: {x:1,y:5},
            type: 'emiter',
            tokenType: 'B',
            shape: [
                [3]
            ]
        },
        {
            origin: {x:2,y:7},
            type: 'emiter',
            tokenType: 'A',
            shape: [
                [3]
            ]
        },
        {
            origin: {x:6,y:5},
            type: 'machine1',
            shape: [
                [2,1],
                [1,3],
                [2,1],
            ]
        },
        {
            origin: {x:7,y:6},
            type: 'conveyor',
            shape: [
                [2,3]
            ]
        },
        {
            origin: {x:8,y:6},
            type: 'conveyor',
            shape: [
                [2,1,1,1,3]
            ]
        },
        {
            origin: {x:12,y:6},
            type: 'conveyor',
            shape: [
                [2,3]
            ]
        },
        {
            origin: {x:13,y:6},
            type: 'conveyor',
            shape: [
                [2],
                [3]
            ]
        },
        {
            origin: {x:13,y:7},
            type: 'conveyor',
            shape: [
                [2],
                [3]
            ]
        },
        {
            origin: {x:13,y:8},
            type: 'conveyor',
            shape: [
                [2],
                [3]
            ]
        },
        {
            origin: {x:13,y:9},
            type: 'conveyor',
            shape: [
                [2],
                [3]
            ]
        },
        {
            origin: {x:13,y:10},
            type: 'conveyor',
            shape: [
                [2,3],
            ]
        },
        {
            origin: {x:14,y:10},
            type: 'conveyor',
            shape: [
                [2,3],
            ]
        },
        {
            origin: {x:15,y:10},
            type: 'receiver',
            shape: [
                [2],
                [1],
                [1],
            ]
        }
    ]
}

]

},{}]},{},[1]);
