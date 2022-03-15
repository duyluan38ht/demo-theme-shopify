
$(document).ready(function () {
const hsTag = $(".slider-organic__list");
   let loopSlider = hsTag.data("loop");
   let autoSlide = hsTag.data("autoplay");
    if(autoSlide.includes('true')){
        autoSlide = true
    }
    if (loopSlider.includes('true')){
        loopSlider = true
    }else{
        loopSlider = false
    }
  
  var sliderOrganic = new Swiper(".slider-organic__list", {
    slidesPerView: 1,
    loop: loopSlider,
    autoplay: autoSlide,
    calculateHeight: true,
    fadeEffect: {
        crossFade: true,
    },
    effect: "fade",
    navigation: {
        nextEl: ".swiper-button-next-organic",
        prevEl: ".swiper-button-prev-organic",
    },
    on: {
        init: function () {
            const sliderOrganic = document.querySelector('.slider-organic');
            if (sliderOrganic) {
                const homeslideSwiperOrganic = sliderOrganic.querySelector('.slider-organic__list');
                if (homeslideSwiperOrganic) {
                    const slideActiveInit = homeslideSwiperOrganic.querySelector('.swiper-wrapper .swiper-slide-active');
                    if (slideActiveInit) {
                        const swiperSlideContent = slideActiveInit.querySelector('.item-left_content');
                        setTimeout(function () {
                            swiperSlideContent.classList.add('fadeInUp');
                        }, 800);
                    }
                }
            }
        },
        slideChange: function () {
            const index_currentSlide = sliderOrganic.activeIndex;
            const currentSlide = sliderOrganic.slides[index_currentSlide];
            const currentslideContent = currentSlide.querySelector(
                ".item-left_content"
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

