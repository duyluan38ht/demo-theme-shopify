$(document).ready(function () {
  const hsTag = $(".slider-clothes__list"),
    hslVal = hsTag.data("loop"),
    hsaVal = hsTag.data("autoplay"),
    hsnVal = hsTag.data("item"),
    hsDelayVal = hsTag.data('swiper-autoplay');

  var sliderClothes = new Swiper('.slider-clothes__list', {
    spaceBetween: 10,
    loop: hslVal,
    loopedSlides: 4,
    autoplay: hsaVal,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    // autoplay: {
    //   delay: hsDelayVal,
    //   disableOnInteraction: false,
    // },

    on: {
      init: function () {
          const sliderClothes = document.querySelector('.slider-clothes');
          if (sliderClothes) {
              const homeslideSwiperClothes = sliderClothes.querySelector('.slider-clothes__list');
              if (homeslideSwiperClothes) {
                  const slideActiveInit = homeslideSwiperClothes.querySelector('.swiper-wrapper .swiper-slide-active');
                  if (slideActiveInit) {
                      const swiperSlideContent = slideActiveInit.querySelector('.slider-clothes__content');

                      setTimeout(function () {
                          swiperSlideContent.classList.add('fadeInUp');
                      }, 800);
                  }
              }
          }       
       },
       slideChange: function () {
           const index_currentSlide = sliderClothes.activeIndex;
           const currentSlide = sliderClothes.slides[index_currentSlide];
           const currentslideContent = currentSlide.querySelector(
               ".slider-clothes__content"
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
  var sliderClothesThumbs = new Swiper('.slider-clothes__thumb', {
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: 'auto',
    touchRatio: 0.2,
    slideToClickedSlide: true,
    loop: hslVal,
    loopedSlides: 4,
    // autoplay: {
    //   delay: hsDelayVal,
    //   disableOnInteraction: false,
    // },
  });

  sliderClothes.controller.control = sliderClothesThumbs;
  sliderClothesThumbs.controller.control = sliderClothes;
});
