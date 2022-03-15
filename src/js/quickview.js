jQuery(function($){
    function currencyToggle(target) {
        // SWITCH CURRENCY
        if ( typeof theme.shopCurrency != 'undefined' ) {
            var newCurrency = Currency.cookie.read();
            Currency.convertAll( theme.shopCurrency, newCurrency, target, 'money_format' );
        }
    };
    $(document.body).on('click', '.quick_view_btn', function(e) {
        e.preventDefault();

        // CONSTRUCTING QUICK VIEW MODAL


        $(document.body).append("\n\t\t\t\t\u003cdiv id=\"product_quick_view\" style=\"display: none;\"\u003e\n\t\t\t\t\t\u003cdiv class=\"product_quick_wrapper\"\u003e\n\t\t\t\t\t\t\u003cdiv class=\"quick_view__left\"\u003e\n\t\t\t\t\t\t\t\u003cdiv id=\"img_big\"\u003e\u003c\/div\u003e\n\t\t\t\t\t\t\t\u003cdiv class=\"product_images\"\u003e\n\t\t\t\t\t\t\t\t\u003cdiv id=\"img_gallery\" class=\"swiper-container\"\u003e\n\t\t\t\t\t\t\t\t\t\u003cdiv class=\"swiper-wrapper\"\u003e\u003c\/div\u003e\n\t\t\t\t\t\t\t\t\u003c\/div\u003e\n\t\t\t\t\t\t\t\u003c\/div\u003e\n\t\t\t\t\t\t\u003c\/div\u003e\n\t\t\t\t\t\t\u003cdiv class=\"quick_view__right\"\u003e\n\t\t\t\t\t\t\t\u003cform action=\"\/cart\/add\" method=\"post\" enctype=\"multipart\/form-data\" id=\"product-actions\" class=\"quick_view_form\"\u003e\n\t\t\t\t\t\t\t\t\u003cp id=\"quick_view__name\" class=\"product_name\"\u003e\u003c\/p\u003e\n\t\t\t\t\t\t\t\t\u003cp id=\"quick_view__price\" class=\"product_price\"\u003e\u003c\/p\u003e\n\t\t\t\t\t\t\t\t\u003cp id=\"quick_view__description\"\u003e\u003c\/p\u003e\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\u003cp id=\"quick_view__variants\"\u003e\n\t\t\t\t\t\t\t\t\t\u003clabel for=\"\"\u003eOptions:\u003c\/label\u003e\n\t\t\t\t\t\t\t\t\t\u003cselect id=\"product-select\" name=\"id\" class=\"hidden\"\u003e\u003c\/select\u003e\n\t\t\t\t\t\t\t\t\u003c\/p\u003e\n\t\t\t\t\t\t\t\t\u003cdiv id=\"quick_view_colors\"\u003e\u003c\/div\u003e\n\t\t\t\t\t\t\t\t\u003cdiv id=\"quick_view_size\"\u003e\u003c\/div\u003e\n\t\t\t\t\t\t\t\t\u003cdiv id=\"quick_view__form\"\u003e\n\t\t\t\t\t\t\t\t\t\u003clabel for=\"quantity\"\u003eQuantity:\u003c\/label\u003e\n\t\t\t\t\t\t\t\t\t\u003cdiv class=\"quantity_box\"\u003e\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\u003cinput min=\"1\" type=\"number\" name=\"quantity\" value=\"1\" class=\"quantity_input\" \/\u003e\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\u003c\/div\u003e\n\t\t\t\t\t\t\t\t\t\u003cbutton class=\"btn btn_inverted btn-cart\" type=\"submit\" id=\"quick_view__add\"\u003e\u003csvg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\"\u003e\n\t\t\t\t\t\t\t\t\t\t\u003cpath d=\"M20 20H0V6H20V20ZM2 18H18V8H2V18Z\"\/\u003e\n\t\t\t\t\t\t\t\t\t\t\u003cpath d=\"M14 3.99995H12C12 3.49995 11.8 2.99995 11.4 2.59995C10.7 1.89995 9.3 1.89995 8.6 2.59995C8.2 2.89995 8 3.39995 8 3.99995H6C6 2.89995 6.4 1.89995 7.2 1.19995C8.7 -0.300049 11.3 -0.300049 12.9 1.19995C13.6 1.89995 14 2.89995 14 3.99995Z\"\/\u003e\n\t\t\t\t\t\t\t\t\t\u003c\/svg\u003e\n\t\t\t\t\t\t\t\t\tAdd to cart\n\t\t\t\t\t\t\t\t\t\u003c\/button\u003e\n\t\t\t\t\t\t\t\t\u003c\/div\u003e\n\t\t\t\t\t\t\t\u003c\/form\u003e\n\t\t\t\t\t\t\t\u003cdiv id=\"product_info_link\" class=\"links_hover\"\u003e\n\t\t\t\t\t\t\t\t\u003ca href=\"#\"\u003eView Full Info\u003c\/a\u003e\n\t\t\t\t\t\t\t\u003c\/div\u003e\n\t\t\t\t\t\t\u003c\/div\u003e\n\t\t\t\t\t\u003c\/div\u003e\n\t\t\t\t\u003c\/div\u003e\n\t\t\t");
        $('#quick_view__add').addClass('hvr-bounce-to-right');

        // SHOWING FANCYBOX LOADING ANIMATION
        $.fancybox.showLoading();
        $.fancybox.helpers.overlay.open({parent: $('body')});

        var href = $(this).attr( 'href' );
        // GETTING PRODUCT INFO (JSON)
        $.getJSON( href + '.js', function( product ) {

            // TOGGLE BIG IMAGE WHEN CLICKING A THUMB
            $(document).on('click', '#img_gallery a', function(e) {
                e.preventDefault();
                var newHREF = $(this).attr('href');
                $('#product_quick_view #img_big img').attr('src', newHREF );
            });

            // PRODUCT TITLE
            if ( product.title.length < 60 ) {
                var productTitle = product.title;
            }
            else {
                var productTitle = $.trim( product.title ).substring(0, 75) + '...';
            }
            $('#quick_view__name').html( '<a href="' + product.url + '">' + productTitle + '</a>' );

            // PRODUCT DESCRIPTION
            var productDescription = $.trim( product.description ).substring(0, 150) + '...';
            $('#quick_view__description').html( productDescription );

            // PRODUCT TYPE
            $('#quick_view__type span').html( product.type );

            // PRODUCT VENDOR
            $('#quick_view__vendor span').html( product.vendor );

            // PRODUCT VARIANTS
            $.each(product.variants, function(i, variant) {
                $('#product-select').append('<option value="' + variant.id + '">' + variant.title + ' - ' + variant.price + '</option>')
            });

            // PRODUCT ALL INFO LINK
            $('#product_info_link a').attr( 'href', product.url );

            // QUANTITY FORM MINI
            $("#quantity").on("focusout",function(){var t=$(this).val();$(this).val(isNaN(parseFloat(t))&&!isFinite(t)||0==parseInt(t)||""==t?1:parseInt(t)<0?parseInt(t)-2*parseInt(t):parseInt(t))}),$("#quantity_up").on("click",function(){var t=$("#quantity").val();$("#quantity").val(!isNaN(parseFloat(t))&&isFinite(t)?parseInt(t)+1:1)}),$("#quantity_down").on("click",function(){var t=$("#quantity").val();$("#quantity").val(!isNaN(parseFloat(t))&&isFinite(t)&&t>1?parseInt(t)-1:1)});

            // UPLOADING option_selection.js TO MANAGE PRODUCT VARIANTS
            $.getScript( "//cdn.shopify.com/shopifycloud/shopify/assets/themes_support/option_selection-fe6b72c2bbdd3369ac0bfefe8648e3c889efca213baefd4cfb0dd9363563831f.js", function() {

                // IMAGES PRELOADER (FUNCTION)
                function preloadImages(images, callback) {
                    var count = images.length;
                    if (count === 0) {
                        callback();
                    }
                    var loaded = 0;
                    $(images).each(function() {
                        $('<img>').attr('src', this).load(function() {
                            loaded++;
                            if (loaded === count) {
                                callback();
                            }
                        });
                    });
                };

                // IMAGES PRELOADER (INIT)
                preloadImages( product.images, function() {
                    // APPENDING BIG IMAGE
                    var bigImgUrl = product.images[0].replace('.png', '_377x380_crop_center.png').replace('.jpg', '_377x380_crop_center.jpg');
                    $('#product_quick_view #img_big').append( '<img src="' + bigImgUrl + '" alt=""  loading="lazy" />' );

                    // APPENDING ALL IMAGES TO GALLERY
                    $.each(product.images, function(i, src) {
                        var smallSrc = src.replace('.png', '_68x82_crop_center.png').replace('.jpg', '_68x82_crop_center.jpg');
                        var bigSrc = src.replace('.png', '_377x380_crop_center.png').replace('.jpg', '_377x380_crop_center.jpg');

                        $('#img_gallery .swiper-wrapper').append( '<a class="swiper-slide" href="' + bigSrc + '"><img src="' + smallSrc + '" alt=""  loading="lazy"/></a>' );
                    });

                    // ADDING THUMBS SLIDER
                    var quickViewGallery = new Swiper('#img_gallery', {
                        slidesPerView: 5,
                        spaceBetween: 10,
                        slideToClickedSlide: true,
                        direction: 'horizontal',
                        height: 82,
                        width: 370,
                    });

                    // VARIANT CHANGE FUNCTION
                    var selectCallback = function(variant, selector) {
                        
                        if ( variant && variant.available ) {

                            jQuery('#quick_view__add').removeAttr('disabled').removeClass('disabled');

                            // VARIANT PRICES
                            if( variant.price < variant.compare_at_price ){
                                jQuery('#quick_view__price').html('<span class="money item_price">' + Shopify.formatMoney(variant.price, theme.moneyFormat) + '</span><span class="money compare-at-price money_sale">' + Shopify.formatMoney(variant.compare_at_price, theme.moneyFormat) + '</span><span class="money_sale_percent">Save' + parseInt( 100 - ( variant.price*100 )/variant.compare_at_price ) + '%</span>');
                            }
                            else {
                                jQuery('#quick_view__price').html('<span class="money item_price">' + Shopify.formatMoney(variant.price, theme.moneyFormat) + '</span>');
                            };

                            // PRODUCT QUANTITY
                            if ( variant.inventory_management != null ) {
                                jQuery('#quick_view__availability span').removeClass('notify_danger').addClass('notify_success').html('Available');
                            }
                            else {
                                jQuery('#quick_view__availability span').removeClass('notify_danger').addClass('notify_success').html( 'Available' );
                            };
                        } else {

                            jQuery('#quick_view__add').addClass('disabled').attr('disabled', 'disabled'); // set add-to-cart button to unavailable class and disable button

                            jQuery('#quick_view__availability span').removeClass('notify_success').addClass('notify_danger').html( 'Unavailable' );

                            jQuery('#quick_view__price').html('<span class="money">' + Shopify.formatMoney(variant.price, theme.moneyFormat) + '</span>');
                        };




                        // COLOR & SIZE OPTIONS
                        for (var i = 0; i < selector.product.options.length; i++) {
                            if ( selector.product.options[i].name.toLowerCase() == 'color' ) {
                                var selectorNum = i;
                                var selectorName = selector.product.options[i].name;

                                renderColorOptions(selectorNum, selectorName);
                            };
                            if ( selector.product.options[i].name.toLowerCase() == 'size' ) {
                                var selectorNum = i;
                                var selectorName = selector.product.options[i].name;

                                renderSizeOptions(selectorNum, selectorName);
                            };
                        };


                        // CHANGING VARIANT IMAGE
                        if ( variant && variant.featured_image ) {

                            var originalImage = $("#img_big img");
                            var newImage = variant.featured_image;
                            var element = originalImage[0];

                            Shopify.Image.switchImage(newImage, element, function (newImageSizedSrc, newImage, element) {
                                $('#img_big img').attr('src', newImageSizedSrc);
                                quickViewGallery.slides.each(function(i) {
                                    var thumb = $(this).find('img').attr('src').replace('_68x82_crop_top', '').replace('_68x82_crop_center', '').replace('_68x82_crop_bottom', '').replace(/\?v=.*/ , '');
                                    var newImg = newImageSizedSrc.replace('_377x380', '').replace(/\?v=.*/ , '');


                                    if ( thumb == newImg ) {
                                        quickViewGallery.slideTo(i);
                                    };
                                });
                            });
                        };

                        currencyToggle('#quick_view__price .money');
                    };

                    // VARIANT CHANGE FUNCTION (INIT)
                    new Shopify.OptionSelectors( "product-select",
                        {
                            product: product,
                            onVariantSelected: selectCallback,
                            enableHistoryState: false
                        });

                    // HIDING DEFAULT VARIANT SELECTOR
                    $.each( $('#quick_view__variants select option'), function() {
                        if ( $(this).val() == 'Default Title' ) {
                            $('#quick_view__variants').hide();
                        };
                    });

                    // SHOWING QUICK VIEW MODAL
                    $.fancybox( $('#product_quick_view'),
                        {
                            'openSpeed': 100,
                            'closeSpeed': 100,
                            'width': 800,
                            'autoSize': false,
                            'tpl': {
                                wrap: '<div id="quick_view__wrap" class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
                                closeBtn : '<a title="Close" id="quick_view__close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
                            },
                            'afterClose': function() {
                                $('#product_quick_view').remove(); // REMOVING QUICK VIEW MODAL AFTER CLOSE
                            }
                        }
                    );

                });

            });


            function renderColorOptions(num, name) {
                var colorSelect = $('#product_quick_view .single-option-selector').eq(num);
                var selectId = '#' + colorSelect.attr('id');
                var container = $('#product_quick_view #quick_view_colors');
                var content = '<label>' + name + ': </label>';

                colorSelect.parent('.selector-wrapper').addClass('hidden');

                if ( $('#product_quick_view .single-option-selector').length == 1 ) {
                    $('#quick_view__variants label').hide();
                }

                $('#product_quick_view ' + selectId + ' option' ).each(function(){
                    var value = $(this).val();
                    if ( colorSelect.val() == value ) {
                        return content = content + '<div class="color_item current" data-val="' + value + '" title="' + value + '"><span class="color_inner" style="background-color: ' + value + '; border: 1px solid red;"></span></div>';
                    } else {
                        return content = content + '<div class="color_item" data-val="' + value + '" title="' + value + '"><span class="color_inner" style="background-color: ' + value + '"></span></div>';
                    }
                });

                container.html(content);

                $('#product_quick_view .color_item').on('click', function(e){
                    colorSelect.val( $(this).data('val') ).trigger('change');
                });
            };

            // RENDER SIZE OPTION
            function renderSizeOptions(num, name){
                var sizeSelect = $('#product_quick_view .single-option-selector').eq(num);
                var selectId = '#' + sizeSelect.attr('id');
                var container = $('#product_quick_view #quick_view_size');
                var content = '<label>' + name + ': </label>';

                sizeSelect.parent('.selector-wrapper').addClass('hidden');

                if ( $('#product_quick_view .single-option-selector').length == 1 ) {
                    $('#quick_view__variants label').hide();
                }

                $('#product_quick_view ' + selectId + ' option' ).each(function(){
                    var value = $(this).val();
                    if ( sizeSelect.val() == value ) {
                        return content = content + '<div class="size_item current" data-val="' + value + '"><span class="size_inner">' + value + '</span></div>';
                    } else {
                        return content = content + '<div class="size_item" data-val="' + value + '"><span class="size_inner">' + value + '</span></div>';
                    };
                });

                container.html(content);

                $('#product_quick_view .size_item').on('click', function(e){
                    sizeSelect.val( $(this).data('val') ).trigger('change');
                });

            };


            // CLOSING QUICK VIEW MODAL AFTER ADDING TO CART
            $('#quick_view__add').on('click', function() {
                $.fancybox.close();
            });

        });

    });

});
