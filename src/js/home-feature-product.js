//===== Define =====
const SELECT_OPTION = 'select_option'
const LIST_OPTION = 'list_option'

// Warn if overriding existing method
if(Array.prototype.equals) {
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
}

// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array) {
        return false;
    }

    // compare lengths - can save a lot of time
    if (this.length != array.length) {
        return false;
    }

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i])) {
                return false;
            }
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}

class VariantsFeaturedProduct {
    constructor() {
        this.variants = null;
        this.options = null;
        this.productId = null;
        this.themeName = null;
        this.typeShow = null;
        this.productMedias = null;
        this.wpMainImg = null; //Left Content
        this.wpThumb = null; //Left Content
        this.classActiveThumb = null; //Left Content
        this.iconSelect = null; //For theme used select options : art, fasion, clothes

        this.isShowFeaturedImage = null; //theme electronic
        this.positionOptionShowFeatureImage = null;

        //--class active---
        this.wpVariantClassOption1 = null;
        this.wpVariantClassOption2 = null;
        this.wpVariantClassOption3 = null;
        this.activeClassClickedOption1 = null;
        this.activeClassClickedOption2 = null;
        this.activeClassClickedOption3 = null;
        this.activeClassAnother = null;
        this.activeNotStock = null;
        this.activeVariantName = null;

        this.rightContentPrice = null;
        this.realPriceEle = null;
        this.comparePriceEle = null;

        this.heightSwiperThumb = null; //Only for theme fashion

        this.buttnAtcHasIconCart = null;

        this.variantShowType = null;
    }

    init() {
        let selfClass = this;
        // console.log(selfClass)

        let featureProduct = document.querySelector(`.home-feature-product`);
        if (featureProduct) {
            let featureProductTheme = featureProduct.firstElementChild;
            // console.log(featureProductTheme)
            let themeName = featureProductTheme.getAttribute('data-theme');
            // console.log(themeName)
            

            selfClass.themeName = themeName;

            switch (selfClass.themeName) {
                case 'theme-electronic':
                    selfClass.typeShow = 1;
                    selfClass.classActiveThumb = 'active-border-electronic';
                    selfClass.wpVariantClassOption1 = 'media-variant-item';
                    selfClass.wpVariantClassOption2 = 'variant-item';
                    selfClass.activeClassClickedOption1 = 'active-border-electronic';
                    selfClass.activeClassClickedOption2 = 'active-border-bottom-electronic';
                    selfClass.activeClassAnother = 'active-border-bottom-electronic';
                    selfClass.activeNotStock = 'active-border-not-stock';
                    selfClass.activeVariantName = 'active-variant-name';

                    selfClass.realPriceEle = 'real-price';
                    selfClass.comparePriceEle = 'compare-price'

                    selfClass.buttnAtcHasIconCart = true;
                    break;
                case 'theme-clothes':
                    selfClass.typeShow = 2;
                    selfClass.classActiveThumb = 'thumb-media__item--active';
                    selfClass.realPriceEle = 'real-price';
                    selfClass.comparePriceEle = 'compare-price';
                    selfClass.buttnAtcHasIconCart = false;
                    break;
                case 'theme-fashion':
                    selfClass.typeShow = 2;
                    selfClass.classActiveThumb = 'thumb-media__item--active';
                    selfClass.buttnAtcHasIconCart = false;
                    selfClass.realPriceEle = 'real-price';
                    selfClass.comparePriceEle = 'compare-price';
                    break;
                case 'theme-art':
                    selfClass.typeShow = 2;
                    selfClass.buttnAtcHasIconCart = false;
                    break;
                case 'theme-medical':
                    selfClass.typeShow = 2;
                    selfClass.buttnAtcHasIconCart = true;
                    // selfClass.classActiveThumb = 'thumb-media__item--active';
                    break;                
                case 'theme-organic':
                    selfClass.typeShow = 1;
                    selfClass.buttnAtcHasIconCart = true;
                    selfClass.activeClassClickedOption1 = 'active-border-bottom-electronic';
                    selfClass.realPriceEle = 'real-price';
                    selfClass.comparePriceEle = 'compare-price';
                    break;                
                default:
                    // code block
            }

            switch (selfClass.themeName) {
                case 'theme-medical': 
                case 'theme-organic': 
                    let hfpSwiper = featureProductTheme.querySelector(".hfpSwiper");

                    if (window._featuredProducts) {
                        let dataProductFromShopify = window._featuredProducts;

                        selfClass.variants = dataProductFromShopify.variants;
                        selfClass.productId = dataProductFromShopify.id;
                        selfClass.options = dataProductFromShopify.options;
                    }

                    //get right-content__price element => render first load page
                    let rightContent = hfpSwiper.querySelector('.right-content');
                    if (rightContent) {
                        let rightContentPrice = rightContent.querySelector(".right-content__price");
                        selfClass.rightContentPrice = rightContentPrice;
                    }

                    selfClass.createRightContentVariants(selfClass.typeShow, selfClass.variants, selfClass.productId, selfClass.options, selfClass.isShowFeaturedImage, selfClass.positionOptionShowFeatureImage, selfClass.iconSelect);

                    document.addEventListener("click", function (e) {
                        if (e.target.classList.contains('variant-item')) {
                            if (!e.target.classList.contains(selfClass.activeNotStock)) {
                                selfClass.validateDataVariant(e.target, e.target.getAttribute('data-option-value'));
                                selfClass.activeVariantEffect(e.target, selfClass.activeClassClickedOption1, 'wp-variants');
                            }
                        }
                    })
                    break;
                default: 
                    let hfpSwiperWrapperToSlidersEle = featureProductTheme.querySelector('.hfpSwiper>.swiper-wrapper').querySelectorAll('.slide-big');
                    if (hfpSwiperWrapperToSlidersEle) {
                        //============ Handle Render ==========
                        //------- Start loop
                        var hfpswiper = new Swiper(".hfpSwiper", {
                            slidesPerView: 1,
                            loop: false,
                            spaceBetween: 0,
                            pagination: {
                                el: ".hfpSwiper .swiper-pagination",
                                clickable: true,
                                renderBullet: function (index, className) {
                                    return '<span class="' + className + '"></span>';
                                }
                            },
                            navigation: {
                                nextEl: ".swiper-button-next",
                                prevEl: ".swiper-button-prev",
                            }
                        });
                        
                        hfpSwiperWrapperToSlidersEle.forEach(function (slide) {
                            let productJsonEle = slide.querySelector('input.product-json');
                            let productId = productJsonEle.getAttribute('data-product-id');
                            let dataProductFromShopify = window._featuredProducts[productId];

                            let variants = dataProductFromShopify.variants,
                                options = dataProductFromShopify.options,
                                isShowFeatureImage = productJsonEle.getAttribute('data-show-thumb-media') == 'false' ? false : true,
                                productMedias = dataProductFromShopify.media,
                                positionOptionShowFeatureImage = productJsonEle.getAttribute('data-position-option-show-feature-image'),
                                variantShowType = productJsonEle.getAttribute('data-variant-show-type');

                            let wpMainImg = slide.querySelector('.wp-img-main');
                            let wpThumb = slide.querySelector('.left-content .wp-thumb-media');
                            if (selfClass.themeName == 'theme-fashion') {
                                let heightImgMain = wpMainImg.clientHeight;
                                selfClass.heightSwiperThumb = heightImgMain;
                            }
        
                            selfClass.wpMainImg = wpMainImg;
                            selfClass.wpThumb = wpThumb;
        
                            selfClass.variants = variants;
                            selfClass.options = options;
                            selfClass.productId = productId;
                            selfClass.isShowFeaturedImage = isShowFeatureImage;
                            selfClass.productMedias = productMedias;
                            selfClass.positionOptionShowFeatureImage = positionOptionShowFeatureImage;
                            selfClass.variantShowType = variantShowType;
        
                            //get right-content__price element => render first load page
                            let rightContentPrice = slide.querySelector('.right-content>.right-content__price');
                            selfClass.rightContentPrice = rightContentPrice;
        
                            //-------- Render right content ----------
                            if (selfClass.themeName == 'theme-electronic') {
                                //---- Render Image Main - Left Content ----------------------
                                selfClass.renderImageMain(selfClass.variants, selfClass.wpMainImg, selfClass.productMedias);
        
                                //----- Unique thumb - Left Content --------------------
                                selfClass.uniqueThumbProduct(selfClass.wpThumb, selfClass.classActiveThumb);
        
                                //----- Render varints in Right Content -------
                                selfClass.createRightContentVariants(selfClass.typeShow, selfClass.variants, selfClass.productId, selfClass.options, selfClass.isShowFeaturedImage, selfClass.positionOptionShowFeatureImage);
                            }
        
                            if (selfClass.themeName == 'theme-clothes') {
                                let iconSelect = productJsonEle.getAttribute('data-icon-select');
                                selfClass.iconSelect = iconSelect;
        
                                selfClass.createRightContentVariants(selfClass.typeShow, selfClass.variants, selfClass.productId, selfClass.options, selfClass.isShowFeaturedImage, selfClass.positionOptionShowFeatureImage, selfClass.iconSelect);
                            }                    
        
                            if (selfClass.themeName == 'theme-fashion') {
                                let iconSelect = productJsonEle.getAttribute('data-icon-select');
                                selfClass.iconSelect = iconSelect;
        
                                selfClass.createRightContentVariants(selfClass.typeShow, selfClass.variants, selfClass.productId, selfClass.options, selfClass.isShowFeaturedImage, selfClass.positionOptionShowFeatureImage, selfClass.iconSelect);
        
                                //--- Set height swiper thumb equal height image main -------
                                wpThumb.style.maxHeight = selfClass.heightSwiperThumb + 'px';
                            }
        
                            if (selfClass.themeName == 'theme-art') {
                                let iconSelect = productJsonEle.getAttribute('data-icon-select');
                                selfClass.iconSelect = iconSelect;
        
                                selfClass.createRightContentVariants(selfClass.typeShow, selfClass.variants, selfClass.productId, selfClass.options, selfClass.isShowFeaturedImage, selfClass.positionOptionShowFeatureImage, selfClass.iconSelect);
                            }
                            //------- end render right content
                        }) 
                        
                        //------------- End loop --------
    
                    //========= Handle action choose variant ===========
                    document.addEventListener("click", function (e) {
                        if (e.target.classList.contains('media-variant-item')) { //Khi click vào variant kiểu image
                            selfClass.validateDataVariant(e.target, e.target.getAttribute('data-option-value'));
                            selfClass.activeVariantEffect(e.target, selfClass.activeClassClickedOption1, 'wp-media-variants');
    
                            //Effect variant name :
                            let eleVariantNameTarget = e.target.nextElementSibling;
                            selfClass.activeVariantEffect(eleVariantNameTarget, 'active-variant-name', 'wp-media-variants');

                            //Effect variant image - left content
                            let slideActive = e.target.closest('.slide-big.swiper-slide-active');
                            let leftContent = slideActive.querySelector('.left-content');
                            let listThumbMediaItem = leftContent.querySelectorAll(".thumb-media__item");
                            if (listThumbMediaItem) {
                                listThumbMediaItem.forEach(function (item) {
                                    if (e.target.getAttribute('src').includes(item.getAttribute('src'))) {
                                        selfClass.activeThumbLeftContent(item, selfClass.classActiveThumb);
                                    }
                                })
                            }
                        }

                        if (e.target.classList.contains('variant-item')) {
                            if (!e.target.classList.contains(selfClass.activeNotStock)) {
                                selfClass.validateDataVariant(e.target, e.target.getAttribute('data-option-value'));
                                selfClass.activeVariantEffect(e.target, selfClass.activeClassClickedOption2, 'wp-variants');
                            }
                        }
    
                        if (e.target.classList.contains('thumb-media__item')) {
                            // console.log(selfClass.themeName)
                            switch (selfClass.themeName) {
                                case 'theme-electronic':
                                    selfClass.activeThumbLeftContent(e.target, selfClass.classActiveThumb);

                                    //Effect active in right content
                                    let slideActive = e.target.closest('.slide-big.swiper-slide-active');
                                    let rightContent = slideActive.querySelector('.right-content');
                                    let mediaVariantItems = rightContent.querySelectorAll('img.media-variant-item');
                                    if (mediaVariantItems) {
                                        mediaVariantItems.forEach(function (item) {
                                            if (item.getAttribute('src').includes(e.target.getAttribute('src'))) {
                                                selfClass.validateDataVariant(item, item.getAttribute('data-option-value'));
                                                selfClass.activeVariantEffect(item, selfClass.activeClassClickedOption1, 'wp-media-variants');

                                                //Effect variant name :
                                                let eleVariantNameTarget = item.nextElementSibling;
                                                selfClass.activeVariantEffect(eleVariantNameTarget, 'active-variant-name', 'wp-media-variants');
                                            }
                                        })
                                    }
                                    break;
                                case 'theme-clothes':
                                    selfClass.activeThumbLeftContent(e.target, selfClass.classActiveThumb);
                                    break;
                                case 'theme-fashion':
                                    selfClass.activeThumbLeftContent(e.target, selfClass.classActiveThumb);
                                    break;
                            }
                        }

                        if (e.target.classList.contains('color-item') && !e.target.classList.contains('media-variant-item')) {
                            selfClass.validateDataVariant(e.target, e.target.getAttribute('data-value'), 'hvr-bounce-to-right');
                            selfClass.activeVariantEffect(e.target, 'active-variant-color','list-color');   
                        }
                    })
    
                    document.addEventListener("change", function (e) {
                        if (e.target.classList.contains('select-variant-option')) {
                            selfClass.validateDataVariant(e.target, e.target.value, 'hvr-bounce-to-right');
                        }
                    })
                }
            }
            
            
        }
    }
    
    //--------------------- Methods ----------------------------------
    validateDataVariant(ele, valueVariantChooseEle, classForBtnAtc = null) { //Hàm này dùng để xử lý từ check variant đến hiển thị ra giao diện để ng dùng biết : có thế atc, sold out, unavailable, render lại price
        let selfClass = this;
        let rightContentEle = ele.closest('.right-content');

        let swiperSlideCurrent = rightContentEle.closest('.swiper-slide-active');
        let productId = null;
        let dataVariants = [];

        if (swiperSlideCurrent) { //Kieu slide swiper
            let inputProductJson = swiperSlideCurrent.firstElementChild;
            if (inputProductJson) {
                productId = inputProductJson.getAttribute('data-product-id');
                dataVariants = window._featuredProducts[productId].variants;
            }
        } else { //Kieu single : medical, organic
            let inputProductJson = rightContentEle.querySelector('.product-json');
            if (inputProductJson) {
                productId = inputProductJson.getAttribute('data-product-id');
                dataVariants = window._featuredProducts.variants;
            }   
        }
            
        // let dataVariants = JSON.parse(inputProductJson.getAttribute('data-variants'));
        

        let priceEle = rightContentEle.querySelector('.right-content__price');
        let infoEle = rightContentEle.querySelector('.right-content__info');

        let valueVariantChoose = valueVariantChooseEle;
        let variantOptionPostion = ele.getAttribute('data-index');
        let positionReal = parseInt(variantOptionPostion.substr(variantOptionPostion.length - 1, 1));

        let inputCheckVariant = document.querySelector(`#check_variant_${productId}`);
        let inputCheckVariantValue = JSON.parse(inputCheckVariant.value);
        
        //reset array check variant
        inputCheckVariantValue[positionReal-1] = valueVariantChoose;
        inputCheckVariant.value = JSON.stringify(inputCheckVariantValue);

        let inputCheckVariantValueNew = inputCheckVariantValue;
        let variantCheckIsset = selfClass.checkVariant(inputCheckVariantValueNew, dataVariants); //kiểm tra xem có variant này trong product hay không ? 
        
        let formAtc = document.querySelector(`#product_form_${productId}`),
            buttonAtc = formAtc.querySelector('button'),
            inputHiddenVariantIdFromFormATC = formAtc.querySelector('input[name = "id"]');

        if (!variantCheckIsset) {
            //Variant không tồn tại
            selfClass.removeAttrInputCheckVariant(inputCheckVariant);

            selfClass.buttonAtcChangeStatus(buttonAtc,3, classForBtnAtc, selfClass.buttnAtcHasIconCart);
            // priceEle.style.visibility = 'hidden';
            // priceEle.style.opacity = 0;

            selfClass.renderPrice(priceEle, false)

            if (infoEle) {
                selfClass.renderInfo(infoEle)
            }
        } else {
            //Variant này có 
            let variantSingle = window._variantsPriceQty[variantCheckIsset.id];
            selfClass.updateAttrInputCheckVariant(
                inputCheckVariant, 
                // variantSingle.getAttribute('data-variant-id'), 
                // variantSingle.getAttribute('data-variant-inventory-quantity'), 
                // variantSingle.getAttribute('data-price-format'), 
                // variantSingle.getAttribute('data-compare-at-price-format')
                variantSingle.id, 
                variantSingle.inventory_quantity, 
                variantSingle.price_format, 
                variantSingle.compare_at_price_format
            );
            
            let priceReal = inputCheckVariant.getAttribute('data-price'),
                priceCompare = inputCheckVariant.getAttribute('data-compare-at-price'),
                qty = parseInt(inputCheckVariant.getAttribute('data-in-stock'));
            if (qty == 0) {
                selfClass.buttonAtcChangeStatus(buttonAtc,2, classForBtnAtc, selfClass.buttnAtcHasIconCart);
            } else {
                selfClass.buttonAtcChangeStatus(buttonAtc,1, classForBtnAtc, selfClass.buttnAtcHasIconCart);
            }
            selfClass.renderPrice(priceEle, true, priceReal, priceCompare);
            // priceEle.innerHTML = priceReal;
            // priceEle.style.visibility = 'visible';
            // priceEle.style.opacity = 1;

            //Update variant id for input hidden button atc
            // selfClass.updateValueVariantInputPendingATC(inputVariantSingle.getAttribute('data-variant-id'), inputHiddenVariantIdFromFormATC);
            selfClass.updateValueVariantInputPendingATC(variantSingle.id, inputHiddenVariantIdFromFormATC);

            //Update info product variant
            let dataInfo = {
                sku: variantSingle.sku,
                qty: variantSingle.inventory_quantity
            }
            if (infoEle) {
                selfClass.renderInfo(infoEle, dataInfo)
            }
        }                        
    }

    renderInfo(infoEle, dataInfo = null) {
        const availabilityEle = infoEle.querySelector('.info-vendor-available .info-available .info-value')
        const skuEle = infoEle.querySelector(".info-sku-product-type .info-sku .info-value")
        
        if (infoEle && dataInfo) {
            if (availabilityEle) {
                availabilityEle.innerHTML = `${dataInfo.qty} in stock`
            }

            if (skuEle) {
                skuEle.innerHTML = dataInfo.sku
            }
        } else {
            if (availabilityEle) {
                availabilityEle.innerHTML = `0 in stock`
            }
            if (skuEle) {
                skuEle.innerHTML = ''
            }
        }
    }

    renderPrice(priceElement, isExistVariant = boolean, priceReal = null, priceCompare = null) {
        let selfClass = this;
        // console.log('here render price')
        let realPriceElement = null;
        let comparePriceElement = null;

        switch (selfClass.themeName) {
            case 'theme-electronic': 
            case 'theme-clothes' :
            case 'theme-organic': 
            case 'theme-fashion': 
                realPriceElement = priceElement.querySelector(`.${selfClass.realPriceEle}`);
                comparePriceElement = priceElement.querySelector(`.${selfClass.comparePriceEle}`);
                if (isExistVariant) {
                    realPriceElement.innerHTML = priceReal;
                    realPriceElement.style.visibility = 'visible';
                    realPriceElement.style.opacity = 1;

                    if (priceCompare != 'null') {
                        comparePriceElement.innerHTML = priceCompare;
                    } else {
                        comparePriceElement.innerHTML = '';
                    }
                    comparePriceElement.style.visibility = 'visible';
                    comparePriceElement.style.opacity = 1;
                } else {
                    realPriceElement.style.visibility = 'hidden';
                    realPriceElement.style.opacity = 0;

                    comparePriceElement.style.visibility = 'hidden';
                    comparePriceElement.style.opacity = 0;
                }
                break;
            default:
                //code block
        }
    }

    activeVariantEffect(element, classActive, classWpParentVariants) {
        let eleParent = element.closest(`.${classWpParentVariants}`);
        if (eleParent) {
            let eleActiveCurrent = eleParent.querySelector(`.${classActive}`);
            if (eleActiveCurrent) {
                eleActiveCurrent.classList.remove(`${classActive}`);
            }
            element.classList.add(classActive);
        }
    }

    buttonAtcChangeStatus(element, status, classEffectHover, isHasIcon = false) {
        /*
        * status : 1 - hiển thị atc như bthg, 2 - sold out, 3 - unavailable
        */
       switch (status) {
           case 1 : 
                if (!isHasIcon) {
                    element.innerHTML = 'Add to cart';
                } else {
                    element.innerHTML = '<svg width="25" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M 16 3.09375 L 7.09375 12 L 2 12 L 2 18 L 3.25 18 L 6.03125 27.28125 L 6.25 28 L 25.75 28 L 25.96875 27.28125 L 28.75 18 L 30 18 L 30 12 L 24.90625 12 Z M 16 5.9375 L 22.0625 12 L 9.9375 12 Z M 4 14 L 28 14 L 28 16 L 27.25 16 L 27.03125 16.71875 L 24.25 26 L 7.75 26 L 4.96875 16.71875 L 4.75 16 L 4 16 Z M 11 17 L 11 24 L 13 24 L 13 17 Z M 15 17 L 15 24 L 17 24 L 17 17 Z M 19 17 L 19 24 L 21 24 L 21 17 Z"/></svg> Add to cart';
                }
                element.removeAttribute('disabled');
                element.classList.add(classEffectHover);
                element.style.opacity = 1;
                break;
            case 2 :
                if (!isHasIcon) {
                    element.innerHTML = 'sold out';
                } else {
                    element.innerHTML = '<svg width="25" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M 16 3.09375 L 7.09375 12 L 2 12 L 2 18 L 3.25 18 L 6.03125 27.28125 L 6.25 28 L 25.75 28 L 25.96875 27.28125 L 28.75 18 L 30 18 L 30 12 L 24.90625 12 Z M 16 5.9375 L 22.0625 12 L 9.9375 12 Z M 4 14 L 28 14 L 28 16 L 27.25 16 L 27.03125 16.71875 L 24.25 26 L 7.75 26 L 4.96875 16.71875 L 4.75 16 L 4 16 Z M 11 17 L 11 24 L 13 24 L 13 17 Z M 15 17 L 15 24 L 17 24 L 17 17 Z M 19 17 L 19 24 L 21 24 L 21 17 Z"/></svg> sold out';
                }
                element.classList.remove(classEffectHover);
                element.setAttribute('disabled', true);
                element.style.opacity = 0.3;
                break;
            case 3 :
                element.classList.remove(classEffectHover);
                element.setAttribute('disabled', true);
                element.style.opacity = 0.3;
                if (!isHasIcon) {
                    element.innerHTML = 'Unavailalble';
                } else {
                    element.innerHTML = '<svg width="25" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M 16 3.09375 L 7.09375 12 L 2 12 L 2 18 L 3.25 18 L 6.03125 27.28125 L 6.25 28 L 25.75 28 L 25.96875 27.28125 L 28.75 18 L 30 18 L 30 12 L 24.90625 12 Z M 16 5.9375 L 22.0625 12 L 9.9375 12 Z M 4 14 L 28 14 L 28 16 L 27.25 16 L 27.03125 16.71875 L 24.25 26 L 7.75 26 L 4.96875 16.71875 L 4.75 16 L 4 16 Z M 11 17 L 11 24 L 13 24 L 13 17 Z M 15 17 L 15 24 L 17 24 L 17 17 Z M 19 17 L 19 24 L 21 24 L 21 17 Z"/></svg> Unavailalble';
                }
                break;
       }
    }

    removeAttrInputCheckVariant(element) {
        element.setAttribute('data-variant-exist', false);
        element.setAttribute('data-variant-id', null);
        element.setAttribute('data-in-stock', null);
        element.setAttribute('data-price', null);
        element.setAttribute('data-compare-at-price', null);
    }

    updateAttrInputCheckVariant(element, variantIdChange, qtyChange, priceChange, comparePriceChange) {
        element.setAttribute('data-variant-exist', true);
        element.setAttribute('data-variant-id', variantIdChange);
        element.setAttribute('data-in-stock', qtyChange);
        element.setAttribute('data-price', priceChange);
        element.setAttribute('data-compare-at-price', comparePriceChange?comparePriceChange:null);
    }

    updateValueVariantInputPendingATC(valueVarintId, inputHiddenVariantId) {
        inputHiddenVariantId.value = valueVarintId;
    }

    renderImageMain(variants, wpMainImg, productMedias) {
        let variantAvailableFirst = variants.find(function (variant) {
            return (variant.available == true && variant.featured_image);
        })

        let imgMain = document.createElement('img');
        if (variantAvailableFirst) {
            imgMain.src = variantAvailableFirst.featured_image.src;
        } else { 
            //Trường hợp ng dùng ko thêm ảnh variant nào vào variant option thì sẽ render ra ảnh của product.media
            productMedias.forEach(function(productMedia, productMediaIndex) {
                //Render main image
                if (productMediaIndex == 0) {
                    imgMain.src = productMedia.src;
                }
            })

        }
        wpMainImg.prepend(imgMain);
    }

    uniqueThumbProduct(wpThumb, classActiveFirst) { //Hiện hàm này đang dùng cho theme electronic để unique ảnh thumb ở left content. List ảnh thumb đc lấy từ product.variants
        const listChilds = wpThumb.querySelectorAll('.swiper-slide.wp-thumb-media-item .thumb-media__item');
        if (listChilds.length > 0) {
            let textArr = [];
            listChilds.forEach(function (child, index) {
                if (textArr.includes(child.getAttribute('src'))) {
                    child.parentElement.remove();
                } else {
                    textArr.push(child.getAttribute('src'));
                }
            })

            //Active first for img in arr temp
            if (textArr.length > 0) {
                let thumbMediaItemActiveFirst = document.querySelector(`img[src = "${textArr[0]}"]`);
                if (!thumbMediaItemActiveFirst.parentElement.classList.contains(`${classActiveFirst}`) && thumbMediaItemActiveFirst) {
                    thumbMediaItemActiveFirst.parentElement.classList.add(`${classActiveFirst}`);
                }
            }
        }
    }

    checkVariant(variantWantCheck = [], dataVariants) { //Hàm kiểm tra xem variant ng dùng chọn có trong list variant của product đó hay ko
        let result = dataVariants.find(function (variant) {
            return variant.options.equals(variantWantCheck);
        })
        return result;
    }

    getQtyAndPriceAll(variantId) {
        let variantPriceQty = window._variantsPriceQty[variantId]
        let result = {};
        if (variantPriceQty) {
            let qty = variantPriceQty.inventory_quantity,
                priceReal = variantPriceQty.price_format,
                priceCompare = variantPriceQty.compare_at_price_format;
                
            result = {
                qty: qty,
                price: priceReal,
                compare_price: priceCompare
            };
        }
        return result;
    }

    updateValueCheckVariantInput(data, productId, variantId) {
        let selfClass = this;
        let checkVariantInput = document.querySelector(`#check_variant_${productId}`);
        checkVariantInput.value = JSON.stringify(data);
        checkVariantInput.setAttribute('data-variant-id', variantId);
        checkVariantInput.setAttribute('data-variant-exist', true);

        let dataPriceQty = selfClass.getQtyAndPriceAll(variantId);
        checkVariantInput.setAttribute('data-in-stock', dataPriceQty.qty);
        checkVariantInput.setAttribute('data-price', dataPriceQty.price);
        checkVariantInput.setAttribute('data-compare-at-price', dataPriceQty.compare_price);
    }

    getFeaturedImageFromOption1(isShowFeaturedImage, dataVariants) { //for theme show image variant
        if (isShowFeaturedImage == true) {
            //theme need image thumb from variants
            let dataImageByOption1 = [];
            // console.log(dataVariants)
            if (dataVariants.length > 0) {
                dataVariants.forEach(function (variant) {
                    if (variant.featured_image && variant.available) {
                        let key = variant.option1,
                            value = variant.featured_image.src;
                        let arr_tmp = [key, value];
    
                        if (dataImageByOption1.length == 0) {
                            dataImageByOption1.push(arr_tmp);
                        } else {
                            let checkCount = 0;
                            for (let i = 0; i < dataImageByOption1.length; i++) {
                                if (!arr_tmp.equals(dataImageByOption1[i])) {
                                    checkCount += 1;
                                }
                            }
                            if (checkCount == dataImageByOption1.length) {
                                dataImageByOption1.push(arr_tmp);
                            }
                        }
                    }
                })
            }
        
            return dataImageByOption1;
        }
    }

    renderHtmlToVariantsEle(type_show, dataOptions, showFeatureImage = false, dataFeatureImages = null, optionKeyShowFeatureImage = null, dataVariants, dataProductId, dataIconSelect = null, variantShowType = null) {
        /* ex :
        *   renderHtmlToVariantsEle(type_show, dataOptions, showFeatureImage, dataFeatureImages, parseInt(dataPositionOptionShowFeatureImage), dataVariants);
        *   renderHtmlToVariantsEle(type_show, dataOptions);
        * -------
        * type_show : Kiểu hiển thị - 1 : grid, 2 : select options như mấy cái theme ban đầu, nếu là select options thì ko hiển thị ảnh variant nữa
        * dataOptions : là json lấy từ product.options_with_values

        * ------
        * showFeatureImage : boolean - true : hiển thị ảnh variants, false : ko hiển thị ảnh variants
        * dataFeatureImages : đi chung vs showFeatureImage, là mảng ảnh variants đã format từ hàm getFeaturedImageFromOption1
        * optionKeyShowFeatureImage : đi chung vs showFeatureImage, là position của option trong product đó muốn hiển thị ảnh tại option đó, ví dụ Electronic thì tại thằng color muốn hiển thị ảnh variants
        * dataVariants : là dữ liệu variants của product đó
        * dataProductId : là id của product đó trên shopify 
        * */
        let selfClass = this;
        let html = '';
        let arrVariantFirst = [];
        let variantIdFirst = 0;
        
        if (dataVariants) {
            dataVariants.forEach(function (variant, index) {
                if (index == 0) {
                    arrVariantFirst = variant.options;
                    variantIdFirst = variant.id;
                }
            })
            // console.log(arrVariantFirst)
            // console.log(dataVariants)

            dataOptions.forEach(function (option, index) {
                if (option.name != 'Title' && option.values[0] != 'Default Title') {
                    html += `<div class="wp-option wp-option-${index+1}">`;
                    html += `<label for="label-option ProductSelect-option-${index+1}">`;
                    html += `${option.name}:`;
                    html += `</label>`;
        
                    if (type_show == 1) { //Hiển thị kiểu grid - ví dụ Electronic theme là 1 thằng muốn hiển thị theo kiểu grid và hiển thị thêm ảnh variant ở option color
                        if (showFeatureImage) { //Muốn hiển thị ảnh variant
                            if ((index + 1) === optionKeyShowFeatureImage) {
                                if (dataFeatureImages.length > 0) {
                                    html += `<div class="wp-media-variants wp-${option.name.toLowerCase()}" id="ProductSelect-option-${index+1}">`;
                                    dataFeatureImages.forEach(function (featureImageItem, featureImageIndex) {
                                        let classActiveFirstOption1 = '',
                                            classActiveVariantNameFirstOption1 = '';
                                        if (featureImageIndex === 0) {
                                            classActiveFirstOption1 = 'active-border-electronic';
                                            classActiveVariantNameFirstOption1 = 'active-variant-name';
                                        }
                                        html += `<div class="box-media-variant-contain-img">`;
                                        html += `<img class="media-variant-item ${option.name.toLowerCase()}-item ${classActiveFirstOption1}" data-index="option${index+1}" data-option-value="${featureImageItem[0]}" src="${featureImageItem[1]}" />`;
                                        html += `<span class="variant-name ${classActiveVariantNameFirstOption1}">${featureImageItem[0]}</span>`;
                                        html += `</div>`;
                                    })
                                    html += `</div>`;
                                } else {
                                    html += `<div class="wp-variants wp-${option.name.toLowerCase()}" id="ProductSelect-option-${index+1}">`;
                                    option.values.forEach(function (value) {
                                        let activeFirstClass = '';
                                        if (arrVariantFirst.includes(value)) {
                                            activeFirstClass = 'active-border-bottom-electronic';
                                        }
                                        html += `<p class="variant-item ${activeFirstClass}" data-index="option${index+1}" data-option-value="${value}">${value}</p>`;
                                    })
                                    html += `</div>`;
                                }
                            } else {
                                //render các chỗ option khác theo kiểu hiển thị của text option.values -> ex: Capacity (Electronic theme)
                                html += `<div class="wp-variants wp-${option.name.toLowerCase()}" id="ProductSelect-option-${index+1}">`;
                                option.values.forEach(function (value) {
                                    let activeFirstClass = '';
                                    if (arrVariantFirst.includes(value)) {
                                        activeFirstClass = 'active-border-bottom-electronic';
                                    }
                                    html += `<p class="variant-item ${activeFirstClass}" data-index="option${index+1}" data-option-value="${value}">${value}</p>`;
                                })
                                html += `</div>`;
                            }
                        } else {
                            html += `<div class="wp-variants wp-${option.name.toLowerCase()}" id="ProductSelect-option-${index+1}">`;
                            option.values.forEach(function (value) {
                                let activeFirstClass = '';
                                if (arrVariantFirst.includes(value)) {
                                    activeFirstClass = 'active-border-bottom-electronic';
                                }
                                html += `<p class="variant-item ${activeFirstClass}" data-index="option${index+1}" data-belong-to="option${index+1}" data-option-value="${value}">${value}</p>`;
                            })
                            html += `</div>`;
                        }
                    } else { //Các trường hợp của các theme đầu như : art, fashion, clothes : select options
                        // console.log(index)
                        switch (variantShowType) {
                            case SELECT_OPTION: 
                                html += `<select id="ProductSelect-${index}" data-index="option${index+1}" class="select-variant-option-${index+1} select-variant-option" style="background-image: url(${dataIconSelect})">`;
                                option.values.forEach(function(value) {
                                    let selected = '';
                                    if (arrVariantFirst.includes(value)) {
                                        selected = 'selected'
                                    }

                                    html += `<option value="${value}" ${selected}>${value}</option>`;           
                                })
                                html += `</select>`;
                                break;
                            case LIST_OPTION: 
                                //Chia 2 ra truong hop : color, size. Colỏ thì hiển thị màu dạng list, size thì hiển thị select option như cũ
                                if (option.name == 'color' || option.name == 'Color') {
                                    html += `<div class="list-color">`;

                                    option.values.forEach(function(value) {
                                        let selected = '';
                                        if (arrVariantFirst.includes(value)) {
                                            selected = 'active-variant-color'
                                        }
    
                                        html += `<div class="color-item ${selected}" data-index="option${index+1}" data-value="${value}" style="background-color: ${value}">`;           

                                        html += `</div>`;
                                    })
                                    
                                    html += `</div>`;
                                } else {
                                    html += `<select id="ProductSelect-${index}" data-index="option${index+1}" class="select-variant-option-${index+1} select-variant-option" style="background-image: url(${dataIconSelect})">`;
                                    option.values.forEach(function(value) {
                                        let selected = '';
                                        if (arrVariantFirst.includes(value)) {
                                            selected = 'selected'
                                        }

                                        html += `<option value="${value}" ${selected}>${value}</option>`;           
                                    })
                                    html += `</select>`;
                                }
                                
                                break;
                            default:
                                throw new Error('Invalid variant show type'); 
                        }
                    }
        
                    html += `</div>`;
                }
                // console.log('-------------------------')
            })

            selfClass.updateValueCheckVariantInput(arrVariantFirst, dataProductId, variantIdFirst); //Load page First
            let checkVariantInput = document.querySelector(`#check_variant_${dataProductId}`);
            // console.log(checkVariantInput)
            let priceReal = checkVariantInput.getAttribute('data-price');
            let priceCompare = checkVariantInput.getAttribute('data-compare-at-price');

            selfClass.renderPrice(selfClass.rightContentPrice, true, priceReal, priceCompare);
        }
        return html;
    }

    createRightContentVariants(type_show, dataVariants, dataProductId, dataOptions, isShowFeatureImage, dataPositionOptionShowFeatureImage, dataIconSelect) {
        let selfClass = this;
        let dataFeatureImages = selfClass.getFeaturedImageFromOption1(isShowFeatureImage, dataVariants);
        let variantsElement = document.querySelector('#variants_' + dataProductId);
        let html = '';

        if (isShowFeatureImage) {
            html = selfClass.renderHtmlToVariantsEle(type_show, dataOptions, isShowFeatureImage, dataFeatureImages, parseInt(dataPositionOptionShowFeatureImage), dataVariants, dataProductId, null);
        } else {
            html = selfClass.renderHtmlToVariantsEle(type_show, dataOptions, false, null, null, dataVariants, dataProductId, dataIconSelect, selfClass.variantShowType);
        }

        if (variantsElement) variantsElement.innerHTML = html;
    }

    activeThumbLeftContent (variantItem, activeClassClicked) {
        //---- Active in main element - left-content
        let imgSrc = variantItem.getAttribute('src');
        if (imgSrc) {
            let leftContent = variantItem.closest('.left-content');
            let imgMainLeftContent = leftContent.querySelector('.slide-img__wrap .wp-img-main>img')

            //Active main img
            imgMainLeftContent.setAttribute('src', imgSrc);

            //Active thumb img
            let wpThumbMedia = leftContent.querySelectorAll('.wp-thumb-media .wp-thumb-media-item');

            wpThumbMedia.forEach(function (thumb) {
                //Remove active current
                if (thumb.classList.contains(activeClassClicked)) {
                    thumb.classList.remove(activeClassClicked);
                }

                if (imgSrc.includes(thumb.getAttribute('data-src-img'))) {
                    thumb.classList.add(activeClassClicked);
                }
            })
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    var variantsFeaturedProduct = new VariantsFeaturedProduct();
    variantsFeaturedProduct.init();

    function getDirection() {
        var direction = window.innerWidth <= 768 ? 'horizontal' : 'vertical';
        return direction;
    }

    //-------- Set zoom image main in Left Content ---------
    let button_zoom = document.querySelectorAll('.icon-zoom');
// console.log(variantsFeaturedProduct.themeName)
    let directionSwiperThumb = '',
        spaceBetweenThumb = 0,
        event = {}

    switch (variantsFeaturedProduct.themeName) {
        case 'theme-medical':
            directionSwiperThumb = 'horizontal'
            spaceBetweenThumb = 20
            break
        case 'theme-organic':
            directionSwiperThumb = window.innerWidth <= 768 ? 'horizontal' : 'vertical';
            spaceBetweenThumb = 15
            
            break
        default:
    }
    switch (variantsFeaturedProduct.themeName) {
        case 'theme-medical':
        case 'theme-organic':
            let featureProduct = document.querySelector(`.home-feature-product`);
            let featureProductTheme = featureProduct.firstElementChild;
            let leftContent = featureProductTheme.querySelector('.hfpSwiper').querySelector('.left-content');
            

            let galleryTop = leftContent.querySelector('.gallery-medical-top'),
            galleryThumb = leftContent.querySelector('.gallery-medical-thumbs');

            // console.log(galleryTop)
            let galleryTopSwiper = new Swiper(galleryTop, {
                spaceBetween: 10,
                loopedSlides: 4,
                navigation: {
                    nextEl: '.swiper-button-next-medical',
                    prevEl: '.swiper-button-prev-medical',
                },
                slidesPerView: 1,
                loop: true
            });
            let galleryThumbSwiper = new Swiper(galleryThumb, {
                direction: directionSwiperThumb,
                spaceBetween: spaceBetweenThumb,
                centeredSlides: true,
                slidesPerView: 3,
                // touchRatio: 0.2,
                slideToClickedSlide: true,
                loop: true,
                loopedSlides: 4, 
                on: {
                    resize: function () {
                        if (variantsFeaturedProduct.themeName == 'theme-organic') {
                            galleryThumbSwiper.changeDirection(getDirection());
                        }
                    },
                }
              });
             galleryTopSwiper.controller.control = galleryThumbSwiper;
             galleryThumbSwiper.controller.control = galleryTopSwiper;

            // First zoom when not slide change
            let parentButtonZoom = button_zoom[0].closest('.gallery-medical-top');
            let slideActive = parentButtonZoom.querySelector('.swiper-wrapper').querySelector('.swiper-slide.swiper-slide-active');

            let tagImgMain = slideActive.querySelector('img');
            let zoom = mediumZoom(tagImgMain, {
                margin: 24,
                background: '#646464',
                scrollOffset: 40,
            });

            galleryTopSwiper.on('slideChange', function() {
                let slides = galleryTopSwiper.slides;
                for (let i = 0; i < slides.length; i++) {
                    if (slides[i].getAttribute('data-swiper-slide-index') == galleryTopSwiper.realIndex) {
                        tagImgMain = slides[i].querySelector('img');
                        zoom = mediumZoom(tagImgMain, {
                            margin: 24,
                            background: '#646464',
                            scrollOffset: 40,
                        });
                        break;
                    }    
                 }
            });

            button_zoom[0].addEventListener('click', function () {
                zoom.open();
            })
            break;
        default:
            button_zoom.forEach(function (item, index) {
                let parentButtonZoom = item.closest('.slide-img__wrap'),
                    tagImgMain = parentButtonZoom.querySelector('a').querySelector('.wp-img-main').querySelector('img');
        
                var zoom = mediumZoom(tagImgMain, {
                    margin: 24,
                    background: '#646464',
                    scrollOffset: 40,
                });
        
                item.addEventListener('click', function () {
                    zoom.open();
                })
            })

    }
})

