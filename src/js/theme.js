$(document).ready(function () {
    var swiper = new Swiper(".testimonialSwiper", {
        slidesPerView: 1,
        loop: true,
        spaceBetween: 0,
        pagination: {
            el: ".testimonialSwiper .swiper-pagination",
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '"></span>';
            },
        },
    });

    const latestblogSwiper = document.querySelector('.latestblogSwiper');
    const hsTag = $(".latestblogSwiper"),
    numSl= hsTag.data('type')
    if (numSl === 'default') {
        var sliderperView = 1;
    } else {

        var sliderperView = "auto";
    }
    var swiper = new Swiper(".latestblogSwiper", {
        slidesPerView: sliderperView ,
        spaceBetween: 0,
        cssMode: true,
        loop: true,
        navigation: {
            // nextEl: ".swiper-button-next-latest-blog",
            prevEl: ".swiper-button-prev-latest-blog",
        },
        pagination: {
            el: ".latestblogSwiper .swiper-pagination",
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '"></span>';
            },
        },
        breakpoints: {
            1023: {
                slidesPerView:1,
            }
            
        }
    });


    //------ check data is loop -----------
    var hfpswperEle = document.querySelector('.hfpSwiper');
    if (hfpswperEle) {
        var dataIsLoop = hfpswperEle.getAttribute('data-is-loop');

        (dataIsLoop === 'false') ? false : true;
    }

    var fpiswiper = new Swiper(".fpiSwiper", {
        slidesPerView: 4,
        spaceBetween: 0,
        pagination: {
            el: ".fpiSwiper .swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        }
    });

    var cafSwiper = new Swiper(".cafSwiper", {
        slidesPerView: 3,
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            1024: {
                slidesPerView: 1,
            }
        }
    });

    // vanilla JS
    $('.gallery-container').packery({
        // options
        itemSelector: '.gallery-item',
        gutter: 30
    });

    var historySwiper = new Swiper(".historySwiper", {
        direction: getDirection(),
        pagination: false,
        slidesPerView: 2,
       
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },

        breakpoints: {
            640: {
                slidesPerView: 1,
                spaceBetween: 50,
            },
            768: {
                slidesPerView: 1,
                spaceBetween: 50,
            },
            1024: {
                slidesPerView: 2
            },            
            2000: {
                slidesPerView: 2
            }
        },
        on: {
            resize: function () {
              swiper.changeDirection(getDirection());
            },
        },
    });
    function getDirection() {
        var direction = window.innerWidth <= 768 ? 'horizontal' : 'vertical';
        return direction;
    }

    AOS.init();

    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 300) {
            $('#back_top').stop().fadeIn("slow");
            $('#back_top').parent().css('position', 'fixed');
            $('#back_top').parent().css('bottom', '15px');
        } else {
            $('#back_top').stop().fadeOut("slow");
        }
    });

    $('#back_top').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 800);
        $('#back_top').fadeOut("slow").stop();
    });

});

//handle slider when width client < 1024 - tablet view (Javascript raw)
var widthClient = window.innerWidth;
// console.log(widthClient);
var list_section_mobile = ['category_cosmetic', 'clothes-hover-type-2', 'theme-clothes-section-blog', 'blog-content-organic'];
var list_section_tablet = ['home-service', 'clothes-hover-type-2', 'theme-clothes-section-blog'];
if (widthClient < 991.98 && widthClient > 767.98) {
    list_section_tablet.forEach(function (item) {
        // console.log(item);
        createSlider(item, true);
    })
}
if (widthClient < 768) {
    list_section_mobile.forEach(function (item) {
        //category_cosmetic
        if (item == 'category_cosmetic') {
            // console.log(item);
            styleCategoryCosmeticMobileSlider();
        }
        // console.log(item);
        createSlider(item, true);
    })
    list_section_tablet.forEach(function (item) {
        // console.log(item);
        createSlider(item, true);
    })
}
function createSlider(ele, allow) {
    if (allow) {
        var eleWp = document.querySelector('.' + ele);
        // console.log(eleWp);
        if (eleWp) {
            eleWp.classList.add('swiper');
            eleWp.classList.add('mobile-slider');
            // console.log(eleWp);
            var firstChildWrapper = eleWp.firstElementChild;
            if (firstChildWrapper) {
                firstChildWrapper.classList.add('swiper-wrapper');
            }

            var item_slide = firstChildWrapper.children;
            if (item_slide.length > 1) {
                for (let item of item_slide) {
                    item.classList.add('swiper-slide');
                }

                //add lib slider
                const swiper = new Swiper('.mobile-slider');

                if (ele == 'category_cosmetic') {
                    // swiper.params.autoHeight = true;
                    // swiper.reInit();
                    let listSilde = eleWp.querySelector('.swiper-wrapper').querySelectorAll('.swiper-slide');

                    let arrHeight = [];
                    listSilde.forEach(function (itemSlide) {
                        arrHeight.push(itemSlide.clientHeight);
                    })

                    swiper.on('slideChange', function (e) {
                        // console.log('*** mySwiper.activeIndex', swiper.activeIndex);

                        let slideActive = listSilde[swiper.activeIndex];

                        arrHeight.forEach(function (item, index) {
                            if (index == swiper.activeIndex) {
                                eleWp.style.height = item + "px";
                            }
                        })
                    });
                }
            }
        }
    }
}

//change style category_cosmetic when
function styleCategoryCosmeticMobileSlider() {
    var categoriesEleWp = document.querySelector('.category_cosmetic');
    if (categoriesEleWp) {
        var wp_categories_cosmetic = categoriesEleWp.querySelector('.wp-categories-cosmetic');
        if (wp_categories_cosmetic) {
            var item_cosmetic_slide = document.querySelectorAll('.categories__category-detail-cosmetic');
            item_cosmetic_slide.forEach(function (item, index) {

                item.style.flexDirection = 'column';
            })
            wp_categories_cosmetic.style.cssText = `
                        flex-wrap: unset;
                        justify-content: unset;
                    `;
        }
    }
}

//----- Handle render feature product fashion ---------
document.addEventListener("DOMContentLoaded", function(event) {
    const swiperThumbFashion = new Swiper('.thumb-media-fashion', {
        direction: 'vertical',
        slidesPerView: 3,
        slidesPerGroup: 1,
        loopFillGroupWithBlank: true,
        // loop: true,
        grabCursor: true,
        mousewheel: true,
        spaceBetween: 15,
    });

    const swiperThumbClothes = new Swiper(".thumb-media-clothes", {
        slidesPerView: 1,
        // loop:true,
        spaceBetween: 20,
        // simulateTouch: false,
        navigation: {
            nextEl: '.swiper-button-next-clothes',
            prevEl: '.swiper-button-prev-clothes',
        },
        breakpoints: {
            320: {
                slidesPerView: 2
            },
              // when window width is >= 480px
            480: {
                slidesPerView: 3
            },
              // when window width is >= 640px
            640: {
                slidesPerView: 4
            }
        }
    })

    const swiperThumbElectronic = new Swiper(".thumb-media-electronic", {
        slidesPerView: 4,
        // loop:true,
        // simulateTouch: false,
        spaceBetween: 20,
        navigation: {
            nextEl: '.swiper-button-next-electronic',
            prevEl: '.swiper-button-prev-electronic',
        },
    })
});
// ------ Fashion theme ---------------
function activeThumb (item) { //use for fashion, clothes theme
    let itemActiveCurrent = document.querySelectorAll('.thumb-media__item--active');

    if (itemActiveCurrent) {
        itemActiveCurrent.forEach(function (item, index) {
            item.classList.remove('thumb-media__item--active');
        })
    }

    item.closest('.wp-thumb-media-item').classList.add('thumb-media__item--active');
}

//================================================================================
//-------- Handle click menu mobile -------

const headerMobileMenuContent = document.querySelector('.header-mobile');
if (headerMobileMenuContent) {
    headerMobileMenuContent.style.top = -headerMobileMenuContent.clientHeight + 'px '
}

const wrapperHeaderMobile = document.querySelector('.wrapper-header-mobile');
if (wrapperHeaderMobile) {
    const eleIconMenu = wrapperHeaderMobile.querySelector('.menu-click__mobile');
    if (eleIconMenu) {
        eleIconMenu.addEventListener('click', function (e) {
            e.stopPropagation();
            if(headerMobileMenuContent.classList.contains('open')){
                headerMobileMenuContent.classList.remove('open');
            }else{
                headerMobileMenuContent.classList.add('open');
            }
        })
    }
}   

const listItemHasDropDown = headerMobileMenuContent.querySelectorAll('.list-menu li.has-dropdown');

const btn_close_menu = document.querySelector('.header-mobile #btn_close_menu');
btn_close_menu.addEventListener('click', function (e) {
    closeMenuMobile();
})

listItemHasDropDown.forEach(function (item) {
    let ulSubMenu = item.querySelector('ul.sub-menu');
    let tagLink = item.querySelector('a');
    let iconArrow = item.querySelector('a svg');

    let subMenuContainer = ulSubMenu.querySelector('.sub-menu__container');
    let heightRealSubMenuContainer = subMenuContainer.clientHeight;
    subMenuContainer.style.height = 0;

    item.addEventListener('click', function (e) {
        let ulSubMenuCurrent = e.target.parentElement.querySelector('ul.sub-menu');
        let tagLinkCurrent = e.target.parentElement.querySelector('a');
        let iconArrowCurrent = e.target.parentElement.querySelector('a svg');

        e.stopPropagation();

        const openSubMenu = headerMobileMenuContent.querySelectorAll('.open-sub-menu');
        if (openSubMenu) {
            openSubMenu.forEach(function (openMenu) {
                openMenu.style.transform = 'translate(0)';
                openMenu.style.opacity = 1;
            })
            
        } 

        if (ulSubMenuCurrent.classList.contains('open-sub-menu')) {
            closeSubMenus(ulSubMenuCurrent, tagLinkCurrent, iconArrowCurrent);
            subMenuContainer.style.height = 0;
        } else {
            ulSubMenuCurrent.classList.add('open-sub-menu');
            // subMenuContainer.style.height = heightRealSubMenuContainer + 'px';
            subMenuContainer.style.height = 'max-content'

            // tagLink.style.cssText = `border-bottom: 1px solid #938e7d;`;
            iconArrowCurrent.style.cssText = `
                fill: #000;
                transform: rotate(0deg);
                -webkit-transition: all 0.3s 0s ease;
                -moz-transition: all 0.3s 0s ease;
                -o-transition: all 0.3s 0s ease;
                transition: all 0.3s 0s ease;            
            `;
        }
    })

    let listSvgIcon = item.querySelector('a svg')
    if (listSvgIcon) {
        listSvgIcon.addEventListener('click', function (e) {
            let ulSubMenuCurrent = e.target.closest('.has-dropdown').querySelector('ul.sub-menu');
            let tagLinkCurrent = e.target.parentElement;
            let iconArrowCurrent = e.target;

            e.stopPropagation();
            const openSubMenu = headerMobileMenuContent.querySelectorAll('.open-sub-menu');
            if (openSubMenu) {
                openSubMenu.forEach(function (openMenu) {
                    openMenu.style.transform = 'translate(0)';
                    openMenu.style.opacity = 1;
                })                
            } 

            if (ulSubMenuCurrent.classList.contains('open-sub-menu')) {
                closeSubMenus(ulSubMenuCurrent, tagLinkCurrent, iconArrowCurrent);
                subMenuContainer.style.height = 0;
            } else {
                ulSubMenuCurrent.classList.add('open-sub-menu');
                // subMenuContainer.style.height = heightRealSubMenuContainer + 'px';
                subMenuContainer.style.height = 'max-content'
    
                // tagLink.style.cssText = `border-bottom: 1px solid #938e7d;`;
                iconArrowCurrent.style.cssText = `
                    fill: #000;
                    transform: rotate(0deg);
                    -webkit-transition: all 0.3s 0s ease;
                    -moz-transition: all 0.3s 0s ease;
                    -o-transition: all 0.3s 0s ease;
                    transition: all 0.3s 0s ease;            
                `;
            }
        })
    }
})

function closeSubMenus(ulSubMenu, tagLink, iconArrow) {
    ulSubMenu.classList.remove('open-sub-menu');
    iconArrow.style.cssText = `
        transform: rotate(-90deg);
    `;            
}

function closeMenuMobile() {
    headerMobileMenuContent.classList.remove('open');
}

window.addEventListener('click', function (e) {
    closeMenuMobile()
})

//mega menu mobile

// const btnDropDownMega = document.querySelector('.vm-container').querySelectorAll('.has-dropdown');
const vmContainerEle = document.querySelectorAll('.vm-container');
if (vmContainerEle.length > 0) {
    vmContainerEle.forEach(function (item) {
        let btnDropDownMega = item.querySelectorAll('.has-dropdown')
        btnDropDownMega.forEach(function (item){
            item.addEventListener('click', function (e) {
                e.stopPropagation();
                const subMenuMega = item.querySelector('.sub-mega__level2');
                // console.log(subMenuMega)
                if(subMenuMega.classList.contains('open-mega-menu-mobile')){
                    subMenuMega.classList.remove('open-mega-menu-mobile')
                }else{
                    subMenuMega.classList.add('open-mega-menu-mobile')
                } 
            })
        })
    })
}




//---- Sticky header -----
const headerEle = document.querySelector('header')
if (headerEle) { 
    var dataFixed = headerEle.getAttribute('data-fixed')
    dataFixed = (dataFixed == 'true') ? true : false

    if (dataFixed) {
        const shopifySectionHeader = headerEle.closest('#shopify-section-header')
        const mainContent = document.querySelector("main")
        if (mainContent) {
            mainContent.style.marginTop = shopifySectionHeader.clientHeight + 'px'
        }
    }
}