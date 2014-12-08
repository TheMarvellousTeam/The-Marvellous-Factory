var machines = require('../data/machine')
  , ed = require('../system/eventDispatcher')

var mouseEvent = function(event){

    var id;
    var el = event.target
    while( el.getAttribute && !(id=el.getAttribute('data-id')) )
        el = el.parentNode

    if( id )
        ed.dispatch( 'ui-shop-'+event.type , {id:id} )
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
        lis +=  '<li class="machine" data-id="'+ m[i] + '">'+
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
