(function() {
    "use strict";
    var e = {
       // LFWLinkPrefixet:  $(".collection_json_feed"),
       // LFWLinkPrefixftp: "/SearchDisplay"
    };
    var i = {
        settings: e,
        changeCart: function() {
            if($('#ShopCartPagingDisplay').length) {
            	$('.sd-delivery .wrap label').html('Click here for <span>same-day delivery</span> ($4.99)');
            	$('.sd-delivery .wrap').append('<a class="see-details tool-open-close">See details</a> <span class="tooltipContent">Select Same-Day Shipping at checkout for just $4.99 more and we’ll get them to you today. Your items will arrive within 5 hours of your order being placed. Same-day delivery only available in select zip codes. Available in select zip codes only. Zip codes include: 10002, 10003, 10005, 10006, 10007, 10008, 10009, 10010, 10011, 10012, 10013, 10014, 10015, 10016, 10017, 10018, 10019, 10021, 10022, 10023, 10024, 10025, 10029, 10036, 10044, and 10128. Orders must be placed by 5pm local time in order to guarantee a 10pm delivery. Orders placed after the cutoff time will arrive by 2pm the next day. Same-day orders require a signature when the delivery arrives. Items subject to local availability. Same-day orders can be returned in store or can be returned via mail. <a target="_blank" title="Print Return Label" href="http://sunglass.upsrow.com/">Click here</a> to print a return label.<span class="close-tool tool-open-close">&#10006;</span><span class="arrow"></span></span>')
                $('.sd-delivery .wrap').show();
                if($('#newCheckoutGiftMessageArea').is(":visible") == true ){  
                    updateWrapBox(); 
                    shipLocalStorage();
                    updatePayPal()
                    if($('#newCheckoutShowGiftMessageArea').is(":visible") == true ){
                        updateWrapmessage();
                    }
                    console.log('visible')  
                }
                checkNoneQualify();
                $(".giftWrapped").change(function() {
                    updateWrapBox();
                    if($('#newCheckoutGiftMessageArea').is(":visible") == true ){
                        updatePayPal();
                        shipLocalStorage();
                    }else{
                        if (localStorage.getItem("shipMethod") != null){
                            localStorage.removeItem('shipMethod');
                            console.log('localStorage.removeItem');
                        }
                        $('#WC_SingleShipmentOrderTotalsSummary_td_7').show();
                        $('#WC_SingleShipmentOrderTotalsSummary_td_8').show();
                        removeUpdatePayPal();
                        console.log('change uncheck');
                    }
                    console.log('change');
                    $( document ).ajaxStop(function( saveGiftOptions,request, settings ) {
                    //updateWrapBox();
                        if($('#newCheckoutGiftMessageArea').is(":visible") == true ){ 
                            updateWrapmessage();
                            console.log('saveGiftOptions');
                        }else{
                           console.log('uncheck');
                        }
                    });
                });
                $('.tool-open-close').on('click', function() {
                    $( '.wrap .tooltipContent' ).toggle();
                });
                console.log('changeCart');
            }
            function checkNoneQualify() {
                if($('.cart-form .row').length >= 2 && $('.cart-form .row:not(.sd-delivery)').length){
                    $('.sd-delivery').append('<p class="exp-non-qualify">Your order contains an item that doesn’t qualify for same-day delivery. All items will now ship via 2-day delivery. To receive same-day delivery, please remove non-qualifying item.</p>');
                    $('.sd-delivery .wrap').addClass('hide-button');
                    if($('.sd-delivery input.giftWrapped').is(':checked')){
                        $('.sd-delivery .wrap label' ).trigger( "click" );
                    }
                    console.log('none qualify');

                }

            }
            function updatePayPal() {
                $('.paypalbutton').addClass('hide-button');
                if(!$('.paypal-sameday').length){
                    $('.paypalbutton').after('<p class="paypal-sameday">Check Out with PayPal is not available with same-day shipping</p>');
                }
            }
            function removeUpdatePayPal() {
                $('.paypalbutton').removeClass('hide-button');
                if($('.paypal-sameday').length){
                    $('.paypal-sameday').remove();
                }
            }
        	
            function updateWrapBox() {
                if($('#newCheckoutShowGiftMessageArea').is(":visible") == true ){
                    updateWrapmessage();
                }
                $('#newCheckoutGiftMessageArea').addClass('shipping-instructions');
                $('#newCheckoutGiftMessageArea h3').html('Delivery Instructions For Courier <span>(Optional)</span>');
                //$('#theGiftMessage label').html('<span>Max 150 characters</span>');
                $('#giftMessage').attr('rows', '3').attr('placeholder', 'Example (max 150 characters): Gate code, ring the door bell, etc');
                $('#WC_SingleShipmentOrderTotalsSummary_td_Custom_5').text('Same-day Delivery');
                $('#WC_SingleShipmentOrderTotalsSummary_td_7').hide();
                $('#WC_SingleShipmentOrderTotalsSummary_td_8').hide();
            }
            function updateWrapmessage() {
                $('#newCheckoutShowGiftMessageArea h3').text('Delivery Instructions For Courier:');
                $('.giftMessageMessage .left').text('Instructions:').hide();
            }
            function shipLocalStorage() {
                var upc = utag.data["cp.product_id"];
                var shipMethod = {};
                shipMethod.upc = upc;
                shipMethod.sameDay = true;
                console.log( shipMethod );
                localStorage.setItem('shipMethod', JSON.stringify(shipMethod));
                console.log('local: '+ JSON.parse(localStorage.shipMethod));
            }
           
        },
        changeShipping: function() {
            if(($('#shippingAddressCreateEditFormDiv_1').length && localStorage.getItem("shipMethod") != null) || ($('#cart-body.has-steps.review').length && localStorage.getItem("shipMethod") != null) || ($('#cart-body.has-steps.review').length && localStorage.getItem("shipMethod") != null))  {
                if($('#WC_SingleShipmentOrderTotalsSummary_td_Custom_5').length){
                    var total = Number(piAmount).toFixed(2);
                        total =  Number(total);
                    var newTotal = total + 4.99;
                    $('#WC_SingleShipmentOrderTotalsSummary_td_13').text('$'+newTotal.toFixed(2));
                }
                $('#newCheckoutShowGiftMessageArea h3').text('Delivery Instructions For Courier:');
                $('#newCheckoutShowGiftMessageArea').append('<div class="ship-edit-container"><a href="/webapp/wcs/stores/servlet/AjaxOrderItemDisplayView?catalogId=10101&langId=-1&storeId=10152" class="ship-edit">Edit</a></div>');
                $('#WC_SingleShipmentOrderTotalsSummary_td_Custom_5').text('Same-day Delivery');
                $('#WC_SingleShipmentOrderTotalsSummary_td_7').hide();
                $('#WC_SingleShipmentOrderTotalsSummary_td_8').hide();
                
                if($('#shippingAddressCreateEditFormDiv_1').length)  {
                    $('#WC_SingleShipmentShippingMethodDetails_div_1 h3').after('<p class="same-day-method">Same-day Delivery: <span>$4.99</span> <a href="/webapp/wcs/stores/servlet/AjaxOrderItemDisplayView?catalogId=10101&langId=-1&storeId=10152" class="ship-edit">Edit</a></div></p>');
                    $('.shipping_method_content').hide();
                }

                if($('#cart-body .section-header.billing').length) {
                    $('.paypal').addClass('hide-button');
                    $('.paypal').after('<p class="paypal-sameday">Check Out with PayPal is not available with same-day shipping</p>');
                }
                if($('#cart-body.has-steps.review').length) {
                    $('#WC_SingleShipmentOrderTotalsSummary_td_Custom_5').text('Same-day Delivery');
                    $('.shipping_method_content').text('Same-day Delivery: $4.99');
                    $('#shippingMethodDiv .edit-link a').attr('href', '/webapp/wcs/stores/servlet/AjaxOrderItemDisplayView?catalogId=10101&langId=-1&storeId=10152');
                }
                console.log('changeShipping');

                function shipCheckZip() {
                    var zipCode = ['10002', '10003', '10005', '10006', '10007', '10008', '10009', '10010', '10011', '10012', '10013', '10014', '10015', '10016', '10017', '10018', '10019', '10021', '10022', '10023', '10024', '10025', '10029', '10036', '10044', '10128'];

                }
            }
        },
        init: function() {
            return this.changeCart(), this.changeShipping(), this;
        }
    };
    window.expSameDay = i;

}()), $(function() {
    if($('.sd-delivery').length || localStorage.getItem("shipMethod") != null){
        expSameDay.init();
    }
});