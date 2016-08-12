(function() {
    "use strict";
    var e = {
       // LFWLinkPrefixet:  $(".collection_json_feed"),
       // LFWLinkPrefixftp: "/SearchDisplay"
    };
    var i = {
        settings: e,
        changeCart: function() {
        	$('.sd-delivery .wrap label').text('Same-day Shipping');
        	$('.sd-delivery .wrap').show();
            if($('#newCheckoutGiftMessageArea').is(":visible") == true ){  
                updateWrapBox(); 
                shipLocalStorage();
                console.log('visible')  
            }
            $(".giftWrapped").change(function() {
                updateWrapBox();
                console.log('change');
                $( document ).ajaxStop(function( saveGiftOptions,request, settings ) {
                //updateWrapBox();
                    if($('#newCheckoutGiftMessageArea').is(":visible") == true ){ 
                        shipLocalStorage();
                        console.log('saveGiftOptions');
                    }else{
                       if (localStorage.getItem("shipMethod") != null){
                            localStorage.removeItem('shipMethod');
                            console.log('uncheck');
                       }
                       console.log('uncheck');
                    }
                });
            });
        	
            function updateWrapBox() {
                $('#newCheckoutGiftMessageArea').addClass('shipping-instructions');
                $('#newCheckoutGiftMessageArea h3').html('Shipping Instructions <span>(Optional)</span>');
                $('#theGiftMessage label').html('<span>Max 150 characters</span>');
                $('#giftMessage').attr('rows', '3').attr('placeholder', 'Go to my hotel room');
                $('#WC_SingleShipmentOrderTotalsSummary_td_Custom_5').text('Same-Day Shipping');
                $('#WC_SingleShipmentOrderTotalsSummary_td_7').hide();
                $('#WC_SingleShipmentOrderTotalsSummary_td_8').hide();
            }
            function shipLocalStorage() {
                var shipMethod = {};
                shipMethod.upc = 4;
                shipMethod.sameDay = true;
                console.log( shipMethod );
                localStorage.setItem('shipMethod', JSON.stringify(shipMethod));
                console.log('local: '+ JSON.parse(localStorage.shipMethod));
            }
           console.log('changeCart');
        },
        init: function() {
            return this.changeCart(), this;
        }
    };
    window.expSameDay = i;

}()), $(function() {
    expSameDay.init();
});