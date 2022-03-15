$( document ).ready(function() {
    const hsTag = $(".homeslideSwiper"),
        hslVal = hsTag.data("loop"),
        hsaVal = hsTag.data("autoplay"),
        hsnVal = hsTag.data("item"),
        hstpVal = hsTag.data("type-pagination"),
        typeStyle=hsTag.data("type");
        hsDelayVal = hsTag.data('swiper-autoplay');
    if (hsnVal === '2_image') {
        var effect = false;
        var sliderperView = 2;
    } else {
        var effect = "fade";
        var sliderperView = 1;
    }
    
    var homeslideSwiper = new Swiper(".homeslideSwiper", {
        slidesPerView: sliderperView,
        loop: hslVal,
        autoplay: hsaVal,
        // autoplay: {
        //     delay: hsDelayVal,
        //     disableOnInteraction: false,
        // },
        calculateHeight: true,
        fadeEffect: {
            crossFade: true,
        },
        effect: effect,
        // speed: 2000,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".homeslideSwiper .swiper-pagination",
            clickable: true,
            renderBullet: function (index, className) {
                if (hstpVal === 'default') {
                    var typePaginate = '<span class="' + className + '"></span>';
                } else {
                    var typePaginate = '<span class="' + className + '">' + '0'+(index + 1) + "</span>";
                }
                return typePaginate;
            },
        },
        on: {
           init: function () {
                if (typeStyle == "default") {
                    const sliderArt = document.querySelector('.slider-art');
                    if (sliderArt) {
                        const homeslideSwiperArt = sliderArt.querySelector('.homeslideSwiper');
                        if (homeslideSwiperArt) {
                            const slideActiveInit = homeslideSwiperArt.querySelector('.swiper-wrapper .swiper-slide-active');
                            if (slideActiveInit) {
                                const swiperSlideContent = slideActiveInit.querySelector('.swiper-slide__content');
                                // swiperSlideContent && swiperSlideContent.classList.add('fadeInUp');

                                setTimeout(function () {
                                    swiperSlideContent.classList.add('fadeInUp');
                                }, 800);
                            }
                        }
                    }
                } else {
                    const sliderCosmetic = document.querySelector('.slider-cosmetic');
                    if (sliderCosmetic) {
                        const homeslideSwiperCosmetic = sliderCosmetic.querySelector('.homeslideSwiper');
                        if (homeslideSwiperCosmetic) {
                            const slideActiveInit = homeslideSwiperCosmetic.querySelector('.swiper-wrapper .swiper-slide-active');
                            if (slideActiveInit) {
                                const swiperSlideContent = slideActiveInit.querySelector('.swiper-slide__content');
                                // swiperSlideContent && swiperSlideContent.classList.add('fadeInUp');

                                setTimeout(function () {
                                    swiperSlideContent.classList.add('fadeInUp');
                                }, 800);
                            }
                        }
                    } 
                }            
            },
            slideChange: function () {
                const index_currentSlide = homeslideSwiper.activeIndex;
                const currentSlide = homeslideSwiper.slides[index_currentSlide];
                const currentslideContent = currentSlide.querySelector(
                    ".swiper-slide__content"
                );
              
                    if (currentslideContent.classList.contains("fadeInUp")) {
                        currentslideContent.classList.remove("fadeInUp");
                        setTimeout(function () {
                            currentslideContent.classList.add("fadeInUp");
                        }, 200);
                    } else {
                        currentslideContent.classList.add("fadeInUp");
                    }

               
                
            },
        },
    });
    
    function swiperChangeNav() {
        var nxSlide = $('.homeslideSwiper .swiper-wrapper').children().eq( homeslideSwiper.realIndex + 1 ).next();
        $('.swiper-button-next figure img').fadeOut('slow', function () {
            $(this).animate({ opacity: 0 }, 200);
            $(this).attr('src', nxSlide.find('img').attr('data-lowsrc'));
            $(this).fadeIn('slow', function() {
              $(this).animate({ opacity: 1 }, 200);
            });
          });

        var pvSlide = $('.homeslideSwiper .swiper-wrapper').children().eq( homeslideSwiper.realIndex + 1 ).prev();
        $('.swiper-button-prev figure img').fadeOut('slow', function () {
          $(this).animate({ opacity: 0 }, 500);
          $(this).attr('src', pvSlide.find('img').attr('data-lowsrc'));
          $(this).fadeIn('slow', function() {
            $(this).animate({ opacity: 1 }, 500);
          });
        });
    }

    homeslideSwiper.on('imagesReady', swiperChangeNav );
    homeslideSwiper.on('slideChange', swiperChangeNav );
    homeslideSwiper.init();


});