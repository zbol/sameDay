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
            	$('.sd-delivery .wrap').append('<a class="see-details tool-open-close">See details</a> <span class="tooltipContent">Select Same-Day Shipping at checkout for just $4.99 more and we’ll get them to you today. Your items will arrive within 5 hours of your order being placed. Same-day delivery only available in select zip codes. Zip codes include: 10002, 10003, 10005, 10006, 10007, 10008, 10009, 10010, 10011, 10012, 10013, 10014, 10015, 10016, 10017, 10018, 10019, 10021, 10022, 10023, 10024, 10025, 10029, 10036, 10044, and 10128. Orders must be placed by 5pm local time in order to guarantee a 10pm delivery. Orders placed after the cutoff time will arrive by 2pm the next day. Same-day orders require a signature when the delivery arrives. Items subject to local availability. Same-day orders can be returned in store or can be returned via mail. <a target="_blank" title="Print Return Label" href="http://sunglass.upsrow.com/">Click here</a> to print a return label.<span class="close-tool tool-open-close">&#10006;</span><span class="arrow"></span></span>')
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
                multipleQualify();
                $(".giftWrapped").change(function() {
                    updateWrapBox();
                    multipleQualify();
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
                    var $parent = $(this).closest('.wrap');
                    $parent.find('.tooltipContent').toggle();
                });
                console.log('changeCart');
            }
            function multipleQualify() {
                if($('.row.sd-delivery').length <= 2 && $('input[type="checkbox"]:checked').length){
                    $('.wrap input[type="checkbox"]').addClass('is-checked');
                    console.log('multipleQualify');
                }
                if($('.row.sd-delivery').length <= 2 && $('input[type="checkbox"]:checked').length < 1 ){
                    $('.wrap input[type="checkbox"]').removeClass('is-checked');
                    console.log('non-multipleQualify');
                }
            }
            function checkNoneQualify() {
                if($('.cart-form .row').length >= 2 && $('.cart-form .row:not(.sd-delivery)').length){
                    $('.sd-delivery').append('<p class="exp-non-qualify">Your order contains an item that doesn’t qualify for same-day delivery. All items will now ship via 2-day delivery. To receive same-day delivery, please remove non-qualifying item.</p>');
                    $('.sd-delivery .wrap').addClass('hide-button');
                    var $checked = $('.sd-delivery .giftWrapped:checked');
                    if ($checked.length) {
                        for (i = 0; i < $checked.length; i++) { 
                            var $input = $checked[i].next( 'label.no-span');
                            $input.trigger('click');
                            console.log("unchecked");
                        }
                        console.log("checked");
                    }
                    /*if($('.sd-delivery input.giftWrapped').is(':checked')){
                        $('.sd-delivery .wrap label' ).trigger( "click" );
                    }*/
                    console.log('none qualify');

                }
                if ($('.row.sd-delivery .value-qty').val() > 1){
                    $('.sd-delivery .wrap').addClass('hide-button');
                    var $checked = $('.sd-delivery .giftWrapped:checked');
                    if ($checked.length) {
                        $checked.each(function( index ) { { 
                            var $input = $(this).next( 'label.no-span');
                            $input.trigger('click');
                            console.log("unchecked");
                         });
                        console.log("checked");
                    }
                    $('.row.sd-delivery .value-qty').each(function( index ) {
                     var val = parseInt($(this).val());
                      if(val > 1){
                        var $parentSD = $(this).closest('.row.sd-delivery');
                        if ($checked.length) {
                            $(this).css( "border", "solid 1px #E74C3C" );
                        }
                        $parentSD.append('<p class="exp-non-qualify">Maximum quanity selected cannot exceed 1 for same-day delivery.</p>');
                        console.log( 'index' + ": " +val );
                        }
                    });
                    console.log('MAXIMUM QUANITY SELECTED CANNOT EXCEED 1 FOR SAME-DAY DELIVERY ')
                }
                if ($('.row.sd-delivery .value-qty').val() > 1){
                    console.log('go')
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
                var upc = $('input.orderItemIds').val();
                var shipMethod = {};
                shipMethod.upc = upc;
                shipMethod.sameDay = true;
                console.log( shipMethod );
                localStorage.setItem('shipMethod', JSON.stringify(shipMethod));
                console.log('local: '+ JSON.parse(localStorage.shipMethod));
            }
           
        },
        changeShipping: function() {                
            if($('#shippingAddressCreateEditFormDiv_1').length && localStorage.getItem("shipMethod") != null)  {
               var orderItemIds = JSON.parse(localStorage.shipMethod)['upc'],
                    shipValue = 'checked';
               updateOrderSummary();
                $('#WC_SingleShipmentShippingMethodDetails_div_1 h3').after('<p class="same-day-method">Same-day Delivery: <span>$4.99</span> <a href="/webapp/wcs/stores/servlet/AjaxOrderItemDisplayView?catalogId=10101&langId=-1&storeId=10152" class="ship-edit">Edit</a></div></p>');
                $('.shipping_method_content').hide();
                $('#shppingMethodDiv').append('<input id="ship_giftWrapped" type="hidden" value="'+orderItemIds+'" checked="'+shipValue+'">'
                            ).append('<input type="hidden" class="orderItemIds" name="orderItemId_1" value="'+orderItemIds+'">');
                $('.mapquest-lookup').change(function() {
                    shipCheckZip(this);
                });
                if( $('.mapquest-lookup').val()){
                    var $mapquest = $('.mapquest-lookup');
                    shipCheckZip($mapquest);
                }
                console.log('Shipping');
            }
            if($('#cart-body .section-header.billing').length && localStorage.getItem("shipMethod") != null) {
                if (JSON.parse(localStorage.shipMethod)['validZip'] == true){
                    var orderItemIds = JSON.parse(localStorage.shipMethod)['upc'],
                    shipValue = 'checked';
                    //updateTotalOrder();
                    updateOrderSummary();
                    removeGiftWrapText();
                    $('#shppingMethodDiv').append('<input id="ship_giftWrapped" type="hidden" value="'+orderItemIds+'" checked="'+shipValue+'">'
                            ).append('<input type="hidden" class="orderItemIds" name="orderItemId_1" value="'+orderItemIds+'">');
            
                    $('.paypal').addClass('hide-button');
                    $('.paypal').after('<p class="paypal-sameday">Check Out with PayPal is not available with same-day shipping</p>');
                     console.log('validZip = True');
                }else if (JSON.parse(localStorage.shipMethod)['validZip'] == false){
                    var orderItemIds = JSON.parse(localStorage.shipMethod)['upc'],
                        checkBox = $('#ship_giftWrapped');
                    console.log('validZip = false');
                }
                console.log('Billing');
            }
            if($('#cart-body.has-steps.review').length && JSON.parse(localStorage.shipMethod)['validZip'] == true) {
                updateOrderSummary();
                $('#WC_SingleShipmentOrderTotalsSummary_td_Custom_5').text('Same-day Delivery');
                $('.shipping_method_content').text('Same-day Delivery: $4.99');
                $('#shippingMethodDiv .edit-link a').attr('href', '/webapp/wcs/stores/servlet/AjaxOrderItemDisplayView?catalogId=10101&langId=-1&storeId=10152');
                console.log('Review');
            }
            function removeGiftWrapText() {
                var itemWrap = document.getElementsByClassName('brand-container');
                for (i = 0; i < itemWrap.length; i++) { 
                    var text = itemWrap[i].innerHTML.replace(/gift wrap/g, '');
                    itemWrap[i].innerHTML = text;
                    console.log('text: '+text)
                }
            }
            
            function updateOrderSummary() {
                $('#newCheckoutShowGiftMessageArea h3').text('Delivery Instructions For Courier:');
                $('#newCheckoutShowGiftMessageArea').append('<div class="ship-edit-container"><a href="/webapp/wcs/stores/servlet/AjaxOrderItemDisplayView?catalogId=10101&langId=-1&storeId=10152" class="ship-edit">Edit</a></div>');
                $('#WC_SingleShipmentOrderTotalsSummary_td_Custom_5').text('Same-day Delivery');
                $('#WC_SingleShipmentOrderTotalsSummary_td_7').hide();
                $('#WC_SingleShipmentOrderTotalsSummary_td_8').hide();
            }

            function updateTotalOrder() {
                if($('#WC_SingleShipmentOrderTotalsSummary_td_Custom_5').length){
                    var total = Number(piAmount).toFixed(2);
                        total =  Number(total);
                    var newTotal = total + 4.99;
                    $('#WC_SingleShipmentOrderTotalsSummary_td_13').text('$'+newTotal.toFixed(2));
                }
            }
            function updateLocalStorage(e) {
                var shipMethod = {};
                if (localStorage.getItem("shipMethod") != null){
                  var upcStorage = JSON.parse(localStorage.shipMethod)['upc'],
                      sameDayStorage = JSON.parse(localStorage.shipMethod)['sameDay'];
                }                    
                shipMethod.upc = upcStorage;
                shipMethod.sameDay = sameDayStorage;
                shipMethod.validZip = e;
                console.log( shipMethod );
                localStorage.setItem('shipMethod', JSON.stringify(shipMethod));
                console.log('local: '+ JSON.parse(localStorage.shipMethod));
            }

            function shipCheckZip(e) {
                var $this = $(e);
                var zipCode = ['10002', '10003', '10005', '10006', '10007', '10008', '10009', '10010', '10011', '10012', '10013', '10014', '10015', '10016', '10017', '10018', '10019', '10021', '10022', '10023', '10024', '10025', '10029', '10036', '10044', '10128'];
                var zipEntered = $this.val();
                var orderItemIds = JSON.parse(localStorage.shipMethod)['upc'];
              
                if (zipCode.indexOf(zipEntered) < 0){
                    if(!$('.zip-sameday-error').length){
                        $this.addClass('required').after('<span class="zip-sameday-error required">The address you entered is not eligible for same-day delivery. Please Change your address or continue shopping with two-day shipping</span>');
                        $('.same-day-method').addClass('required').hide();
                        $('#WC_SingleShipmentOrderTotalsSummary_td_Custom_5, #gift, #WC_SingleShipmentOrderTotalsSummary_td_Custom_6').hide();
                        $('#WC_SingleShipmentOrderTotalsSummary_td_7, #WC_SingleShipmentOrderTotalsSummary_td_8').show();
                        $('.shipping_method_content').show();
                        var orderItemIds = JSON.parse(localStorage.shipMethod)['upc'];
                        var checkBox = $('#ship_giftWrapped');
                        checkBox.checked = false;
                        $('#shippingAddressCreateEditFormDiv_1 .green-button ').on( "click", function() {
                            console.log('click Billing');
                        });
                        $( document ).ajaxStart(function( getShippingInfoUTagClick, request, settings ) {
                            document.getElementById('monetate_selectorHTML_65bc7c9e_0').innerHTML = '<div data-loader="ball-pulse"></div>';
                            console.log('loading');
                            if (JSON.parse(localStorage.shipMethod)['validZip'] == false){
                                console.log('remove Gift Cart');
                                NewCheckoutJS.removeGiftOptions(checkBox, orderItemIds);
                                if (localStorage.getItem("shipMethod") != null){
                                    localStorage.removeItem('shipMethod');
                                    console.log('localStorage.removeItem');
                                }
                            }
                        });
                        $( document ).ajaxStop(function( continueToBilling, request, settings ) {
                            document.getElementById('monetate_selectorHTML_65bc7c9e_0').innerHTML = '<svg height="15px" id="Capa_1" style="enable-background:new 0 0 397.129 397.129;" version="1.1" viewBox="0 0 397.129 397.129" width="15px" x="0px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" y="0px"> <g> <path fill="#FFFFFF" d="M318.303,163.141h-18.242V85c0-46.869-38.131-85-85-85h-32.993c-46.869,0-85,38.131-85,85v78.141H78.825 c-9.314,0-16.866,7.551-16.866,16.865v200.258c0,9.312,7.552,16.865,16.866,16.865h239.479c9.314,0,16.865-7.553,16.865-16.865 V180.006C335.17,170.692,327.619,163.141,318.303,163.141z M147.068,85.001c0-19.299,15.701-35,35-35h32.993 c19.299,0,35,15.701,35,35v78.141H147.068V85.001z"></path> </g> </svg>';
                            console.log('continueToBilling Stop');
                        });
                       // NewCheckoutJS.removeGiftOptions(checkBox, orderItemIds);
                        //javascript:NewCheckoutJS.removeGiftOptions(this, '2130147');
                    }
                    updateLocalStorage(false);
                    console.log('NOPE' + orderItemIds);
                }else{
                    if($('.zip-sameday-error').length){
                        $('.zip-sameday-error').remove();
                      //  NewCheckoutJS.saveGiftOptions('99999999');
                        console.log('saveGiftOptions');
                    }
                    updateLocalStorage(true);
                    $this.removeClass('required');
                    $('.same-day-method').removeClass('required').show();
                    $('.shipping_method_content').hide();
                    $('#WC_SingleShipmentOrderTotalsSummary_td_Custom_5, #gift, #WC_SingleShipmentOrderTotalsSummary_td_Custom_6').show();
                    $('#WC_SingleShipmentOrderTotalsSummary_td_7, #WC_SingleShipmentOrderTotalsSummary_td_8').hide();
                    $('.same-day-method').removeClass('required');
                    
                    console.log('Zip Fine');
                }
                console.log('zip' + zipEntered );
                console.log('indexOf'+zipCode.indexOf(zipEntered))
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