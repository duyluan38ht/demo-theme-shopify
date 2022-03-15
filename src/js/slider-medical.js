const hsTag = $(".slider-medical__list"),
    hslVal = hsTag.data("loop"),
    hsaVal = hsTag.data("autoplay"),
    hsDelayVal = hsTag.data('swiper-autoplay');
var sliderMedical = new Swiper(".slider-medical__list", {
    slidesPerView: 1,
    loop: hslVal,
    autoplay: hsaVal,
   
    calculateHeight: true,
    fadeEffect: {
        crossFade: true,
    },
    effect: "fade",
    navigation: {
        nextEl: ".swiper-button-next-medical",
        prevEl: ".swiper-button-prev-medical",
    },
    pagination: {
        el: ".slider-medical__list .swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '"></span>';
        },
    },
    on: {
        init: function () {
            const sliderMedical = document.querySelector('.slider-medical');
            if (sliderMedical) {
                const homeslideSwiperMedical = sliderMedical.querySelector('.slider-medical__list');
                if (homeslideSwiperMedical) {
                    const slideActiveInit = homeslideSwiperMedical.querySelector('.swiper-wrapper .swiper-slide-active');
                    if (slideActiveInit) {
                        const swiperSlideContent = slideActiveInit.querySelector('.slm-content');
                        const swiperImage = slideActiveInit.querySelector('.slider-medical__img');
                        setTimeout(function () {
                            swiperSlideContent.classList.add('fadeInUp');
                            swiperImage.classList.add('fadeLeftRight');

                        }, 800);
                    }
                }
            }
        },
        slideChange: function () {
            const index_currentSlide = sliderMedical.activeIndex;
            const currentSlide = sliderMedical.slides[index_currentSlide];
            const currentslideContent = currentSlide.querySelector(
                ".slm-content"
            );
            const currentslideImg = currentSlide.querySelector(
                ".slider-medical__img"
            );

            if (currentslideContent.classList.contains("fadeInUp")) {
                currentslideContent.classList.remove("fadeInUp");
                setTimeout(function () {
                    currentslideContent.classList.add("fadeInUp");
                }, 200);
            } else {
                currentslideContent.classList.add("fadeInUp");
            }

            if (currentslideImg.classList.contains("fadeLeftRight")) {
                currentslideImg.classList.remove("fadeLeftRight");
                setTimeout(function () {
                    currentslideImg.classList.add("fadeLeftRight");
                }, 200);
            } else {
                currentslideImg.classList.add("fadeLeftRight");
            }
        },
    },
});