class VariantSelectFeaturedCollection {
    constructor() {
        this.variantValue = null;
        this.variantId = null;
        this.imageMain = null;
        this.variantsArray = null;
        this.productId = null;
        this.themeName = null;
        this.classActiveVariant = null;
        this.priceFormat = null;
        this.comparePriceFormat = null;

        this.priceEle = null;
        this.comparePriceEle = null;

        this.buttonAtcEle = null;
        this.buttonAtcEleReal = null;

        this.variantQuantity = null;

        this.classWpVariantItem = null;
        this.typeShowVariant = null;
    }

    init() {
        let selfClass = this;
        // console.log(selfClass)

        //-- init count down ---
        let productIsCountDownCosmetic = document.querySelectorAll('.theme-cosmetic .wp-product-count-down');
        if (productIsCountDownCosmetic) {
            // console.log(productIsCountDown)
            productIsCountDownCosmetic.forEach(function (item) {
                selfClass.countDownTime(item);
            })
        }

        let productIsCountDownClothes = document.querySelectorAll('.theme-clothes .wp-product-count-down');
        if (productIsCountDownClothes) {
            // console.log(productIsCountDown)
            productIsCountDownClothes.forEach(function (item) {
                selfClass.countDownTime(item);
            })
        }

        //-- Init swiper thumb ---- Electronic using ----
        let listWpThumbs = document.querySelectorAll('.card-information__pcard-options-variant');
        if (listWpThumbs.length > 0) {
            listWpThumbs.forEach(function (item) {
                let swiperVariantThumb = new Swiper(`#${item.getAttribute('id')}`, {
                    slidesPerView: 4,
                    loop: true,
                    navigation: {
                        nextEl: `.swiper-button-next-${item.getAttribute('data-product-id')}`
                    },
                });
            })
        } 

        document.addEventListener('click', function (e) {
            if (e.target.classList.contains('product-option-item') || e.target.classList.contains('variant-item-img')) { //Khi click vào variant kiểu image
                // console.log(e.target)
                // Set data
                let cardWrapper = e.target.closest('.card-wrapper'),
                    cardProduct = cardWrapper.querySelector('.card--product'),
                    imgMainEle = cardProduct.querySelector('img'),
                    wpPriceEle = cardWrapper.querySelector('.card-information>.card-information__wrapper .price');

                // let inputHiddenSingle = cardWrapper.firstElementChild;                     

                //set button ATC element
                let buttonAtcEle = cardWrapper.querySelector('.card-information__cart>form>input[name="id"]'),
                    buttonAtcEleReal = cardWrapper.querySelector('.card-information__cart>form>input[type="submit"]');
                if (!buttonAtcEleReal) {
                    buttonAtcEleReal = cardWrapper.querySelector('.card-information__cart>form>button[type="submit"]');
                }
                selfClass.buttonAtcEle = buttonAtcEle;
                selfClass.buttonAtcEleReal = buttonAtcEleReal;
                
                selfClass.imageMain = imgMainEle;
                selfClass.variantValue = e.target.getAttribute('data-variant-value');
                selfClass.themeName = cardWrapper.getAttribute('data-theme-name');
                selfClass.productId = e.target.getAttribute('data-product-id');
                selfClass.variantsArray = window._featuredCollectionListProduct[selfClass.productId].variants;


                switch (selfClass.themeName) {
                    case "art":
                    case 'fashion':
                    case 'cosmetic':
                    case 'clothes':
                        selfClass.classActiveVariant = 'active-variant-color';
                        selfClass.classWpVariantItem = 'card-information__pcard-options-color';
                        selfClass.typeShowVariant = 1;
                        break;
                    case 'electronic-type-1':
                    case 'electronic-type-2':
                        selfClass.classActiveVariant = 'border-active-variant-item';
                        selfClass.classWpVariantItem = 'variant-item'; //thumb 
                        selfClass.typeShowVariant = 2;
                    default:
                        //code block
                }

                //Handle active 
                selfClass.activeIconVariant(e.target, selfClass.classActiveVariant, selfClass.classWpVariantItem, selfClass.typeShowVariant)

                //--- Find image variant actve -----
                let variantDataSingle = null;

                switch (selfClass.themeName) {
                    case 'electronic':
                        selfClass.variantId = e.target.getAttribute('data-variant-id');
                        selfClass.variantsArray.forEach(function (variant) {
                            if (variant.id == selfClass.variantId) {
                                variantDataSingle = variant;
                            }
                        })
                        break;
                    default:
                        //các theme đang render options chứ ko phải variants
                        selfClass.variantsArray.forEach(function (variant) {
                            if (variant.options.includes(selfClass.variantValue)) {
                                variantDataSingle = variant;
                            }
                        })
                        selfClass.variantId = variantDataSingle.id;
                }
                if (variantDataSingle.featured_image) {
                    selfClass.activeImageMain(selfClass.imageMain, variantDataSingle.featured_image.src);
                }


                //--- Get info price of variant clicked ------
                let variantChoose = window._variantsPriceQtyInCollection[selfClass.variantId];
                selfClass.priceFormat = variantChoose.price_format;
                selfClass.comparePriceFormat = variantChoose.compare_at_price_format;
                selfClass.variantQuantity = variantChoose.inventory_quantity;

                //  console.log(selfClass)


                //set priceEle, comparePriceEle
                if (!variantDataSingle.compare_at_price) {
                    selfClass.priceEle = wpPriceEle.querySelector('.price__regular .price-item.price-item--regular');
                    selfClass.comparePriceEle = null;
                } else {
                    selfClass.priceEle = wpPriceEle.querySelector('.price__sale .price-item.price-item--sale.price-item--last');
                    selfClass.comparePriceEle = wpPriceEle.querySelector('.price__sale .price-item.price-item--regular');

                    selfClass.renderComparePrice(selfClass.comparePriceEle, selfClass.comparePriceFormat);
                }
                selfClass.renderPrice(selfClass.priceEle, selfClass.priceFormat);

                //change variant id in button ATC
                selfClass.updateVariantIdInButtonATC(selfClass.buttonAtcEle, selfClass.variantId);
                
                // console.log(selfClass)

                //-- Render again variant status sold out || sale ---
                selfClass.renderImgStatusVariant(selfClass.imageMain, selfClass.buttonAtcEleReal, parseInt(selfClass.variantQuantity));
            }
        })
    }

    renderImgStatusVariant(imageMain, buttonAtcRealEle, variantQuantity) {
        let selfClass = this;
        if (variantQuantity < 1) {
            imageMain.classList.add('sold-out-status');
            selfClass.updateIsDisableButtonATC(buttonAtcRealEle, true);
        } else {
            imageMain.classList.remove('sold-out-status');
            selfClass.updateIsDisableButtonATC(buttonAtcRealEle, false);
        }
    }

    updateIsDisableButtonATC(buttonAtcRealEle, isDisabled) {
        if (isDisabled) {
            buttonAtcRealEle.setAttribute('disabled', true);
        } else {
            buttonAtcRealEle.removeAttribute('disabled');
        }
    }

    renderBadgeStatusVariant() {

    }

    activeIconVariant(element, classActiveVariant, classWpVariantItem, type = 1) {
        /*
        * type : 1 - các theme hiển thị dạng không thumb, 2 - các theme hiển thị dạng thumb (như electronic)
        */
        if (type == 1) {
            let wpElementParent = element.closest(`.${classWpVariantItem}`);
            let eleActiveCurrent = wpElementParent.querySelector(`.${classActiveVariant}`);
            if (eleActiveCurrent) {
                eleActiveCurrent.classList.remove(`${classActiveVariant}`);
            }

            element.classList.add(`${classActiveVariant}`);
        } else {
            let grandElement = element.closest('.card-information')
            let wpElementParent = element.closest(`.${classWpVariantItem}`);
            let eleActiveCurrent = grandElement.querySelectorAll(`.${classActiveVariant}`);
            if (eleActiveCurrent) {
                eleActiveCurrent.forEach(function (item) {
                    item.classList.remove(`${classActiveVariant}`);
                })
            }
            wpElementParent.classList.add(`${classActiveVariant}`);
        }
        
    }

    activeImageMain (imageMain, imageVariantActive) {
        imageMain.src = imageVariantActive;
        imageMain.setAttribute('srcset', imageVariantActive)
    }
    
    renderPrice(priceEle, price) {
        priceEle.innerHTML = price;
    }

    renderComparePrice(comparePriceEle, comparePrice) {
        comparePriceEle.innerHTML = comparePrice;
    }

    updateVariantIdInButtonATC(element, variantId) {
        element.value = variantId;
    }

    //--- Method for count down -----
    countDownTime(element) {
        let selfClass = this;
        let year = element.getAttribute("data-flash-year"),
            month = element.getAttribute("data-flash-month"),
            day = element.getAttribute("data-flash-day");
        // var countDownDate = new Date("November 25, 2021 00:00:00").getTime();
        let countDownDate = new Date(`${year}-${month}-${day}T00:00:00`).getTime();
    
        // Update the count down every 1 second
        let x = setInterval(function () { // Get today's date and time
            let now = new Date().getTime();
    
            // Find the distance between now and the count down date
            let distance = countDownDate - now;
    
            // Time calculations for days, hours, minutes and seconds
            let days = Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
            let content = selfClass.contentHTMLCountDown(days, hours, minutes, seconds);
            element.innerHTML = content;
    
    
            // If the count down is over, write some text
            if (distance < 0) {
                let content = selfClass.contentHTMLCountDown('00', '00', '00', '00');
                element.innerHTML = content;
                clearInterval(x);
            }
        }, 1000);
    }

    contentHTMLCountDown (days, hours, minutes, seconds) {
        let content = "";
        content += "<span class='day'><b>" + days + "</b> <br> Days</span>";
            content += "<span class='hour'><b>" + hours + "</b> <br> Hr</span>";
            content += "<span class='minutes'><b>" + minutes + "</b> <br> Min</span>";
            content += "<span class='seconds'><b>" + seconds + "</b> <br> Sec</span>";
        return content;
    }
}

var variantFeaturedCollection = new VariantSelectFeaturedCollection();
variantFeaturedCollection.init();

var medicalSwiper = new Swiper('.collectionSwiper-medical', {
    // slidesPerView: 4,
    // slidesPerColumn: 2,
    // slidesPerGroup : 5,
    // autoHeight: true,
    grid: {
        rows: 2,
    },
    spaceBetween: 0,
    pagination: {
        el: '.swiper-pagination.pagination-medical',
        clickable: true,
    },
    breakpoints: {
        1200: {
            slidesPerView: 5,
        },
        1024: {
            slidesPerView: 3,
        },
        767: {
            slidesPerView: 2,
        }
    }
});

//Check theme => tag navigation
var eleCollections = document.querySelectorAll('.collectionSwiper');
let nextEl = '',
    prevEl = '',
    spaceBetween = '',
    breakPointsData = {},
    loop = false,
    slidesPerView = 4,
    centeredSlides = false,
    slidesPerColumn = 'auto',
    slidesPerGroup = 1;

if (eleCollections) {
    eleCollections.forEach(function (item) {
        let dataThemeType = item.getAttribute('data-theme-type');
        let isHomeCollection = item.getAttribute('data-is-home-collection');
        isHomeCollection = (isHomeCollection == 'true') ? true : false;
        
        switch (dataThemeType) {
            case 'theme-art':
            case 'theme-fashion':
                nextEl = '.swiper-button-next';
                prevEl = '.swiper-button-prev';

                if (!isHomeCollection) {
                    spaceBetween = 30;
               
                    breakPointsData = {
                        1366: {
                            slidesPerView: 4,
                        },
                        1290: {
                            slidesPerView: 3,
                        },
                        1024: {
                            slidesPerView: 2,
                        },
                        767: {
                            slidesPerView: 1.5,
                        },
                        460: {
                            slidesPerView: 1,
                        }
                    }
                } else {
                    loop = true;
                    slidesPerView = 5.9;
                    spaceBetween = 30;
                    centeredSlides = true,
               
                    breakPointsData = {
                        1366: {
                            slidesPerView: 5.9,
                        },
                        1290: {
                            slidesPerView: 3,
                        },
                        1024: {
                            slidesPerView: 2,
                        },
                        767: {
                            slidesPerView: 1.5,
                        },
                        460: {
                            slidesPerView: 1,
                        }
                    }
                }
                break;
            case 'theme-cosmetic':
                nextEl = '.swiper-button-next';
                prevEl = '.swiper-button-prev';

                if (!isHomeCollection) {
                    spaceBetween = 30;
               
                    breakPointsData = {
                        1366: {
                            slidesPerView: 4,
                        },
                        1290: {
                            slidesPerView: 3,
                        },
                        1024: {
                            slidesPerView: 2,
                        },
                        767: {
                            slidesPerView: 1.5,
                        },
                        460: {
                            slidesPerView: 1,
                        }
                    }
                } else {
                    loop = true;
                    slidesPerView = 5;
                    spaceBetween = 30;
                    centeredSlides = true,

                    slidesPerColumn = 2;
                    slidesPerGroup = 2;
               
                    breakPointsData = {
                        1366: {
                            slidesPerView: 5,
                        },
                        1290: {
                            slidesPerView: 3,
                        },
                        1024: {
                            slidesPerView: 2,
                        },
                        767: {
                            slidesPerView: 1.5,
                        },
                        460: {
                            slidesPerView: 1,
                        }
                    }
                }
            case 'theme-clothes': 
                spaceBetween = 30;

                breakPointsData = {
                    1366: {
                        slidesPerView: 4,
                    },
                    1290: {
                        slidesPerView: 3,
                    },
                    1024: {
                        slidesPerView: 2,
                    },
                    767: {
                        slidesPerView: 2,
                    },
                    460: {
                        slidesPerView: 1,
                    }
                }
                break;
            case 'theme-electronic':
                nextEl = '.electronic-next-type-2';
                prevEl = '.electronic-prev-type-2';

                spaceBetween = 0;

                breakPointsData = {
                    1366: {
                        slidesPerView: 4,
                    },
                    1290: {
                        slidesPerView: 3,
                    },
                    1024: {
                        slidesPerView: 2,
                    },
                    767: {
                        slidesPerView: 2,
                    },
                    460: {
                        slidesPerView: 1,
                    }
                }
                break;

            default:

        }
    })
}

var swiper = new Swiper(".collectionSwiper", {
    slidesPerView: slidesPerView,
    loop: loop,
    spaceBetween: spaceBetween,
    initialSlide: 1,
    centeredSlides: centeredSlides,
    centeredSlidesBounds: true,
    navigation: {
        nextEl: nextEl,
        prevEl: prevEl,
    },
    slidesPerColumn: slidesPerColumn,
    slidesPerGroup : slidesPerGroup,
    pagination: {
        el: ".collectionSwiper .swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + '0' + (index + 1) + "</span>";
        },
    },
    breakpoints: breakPointsData
})