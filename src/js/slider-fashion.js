
$( document ).ready(function() {
    const hsTag = $(".homeslideSwiper__fashion"),
        hslVal = hsTag.data("loop"),
        hsaVal = hsTag.data("autoplay");      
        hsDelayVal = hsTag.data('swiper-autoplay');

    var homeslideSwiper = new Swiper(".homeslideSwiper__fashion", {
        slidesPerView: 1,
        loop: hslVal,
        autoplay: hsaVal,
        // autoplay: {
        //     delay: hsDelayVal,
        //     disableOnInteraction: false,
        // },
        calculateHeight: true,
        calculateWidth: true,
        // fadeEffect: {
        //     crossFade: true,
        // },
        effect: "fade",
        // speed: 2000,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".homeslideSwiper__fashion .swiper-pagination",
            clickable: true,
            renderBullet: function (index, className) {
              return '<span class="' + className + '">' + '0'+(index + 1) + "</span>";
            },
          },
          on: {
            init: function () {
                const sliderFashion = document.querySelector('.slider-fashion');
                if (sliderFashion) {
                    const homeslideSwiperFashion = sliderFashion.querySelector('.homeslideSwiper__fashion');
                    if (homeslideSwiperFashion) {
                        const slideActiveInit = homeslideSwiperFashion.querySelector('.swiper-wrapper .swiper-slide-active');
                        if (slideActiveInit) {
                            const swiperSlideContent = slideActiveInit.querySelector('.swiper-slide__content');
                            // swiperSlideContent && swiperSlideContent.classList.add('fadeInUp');

                            setTimeout(function () {
                                swiperSlideContent.classList.add('fadeInUp');
                            }, 800);
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
    
   
});



