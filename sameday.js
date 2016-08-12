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
        	$( document ).ajaxStop(function( saveGiftOptions,request, settings ) {
			  console.log('saveGiftOptions');
			});
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