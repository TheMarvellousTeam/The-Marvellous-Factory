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
