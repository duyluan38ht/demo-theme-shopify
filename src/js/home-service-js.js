var hsvJs = new Swiper(".home-service-js", { 

  initialSlide: 0,
  centeredSlides: false,
  spaceBetween: 5,
  breakpoints: {
    1024: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView:1,
    },
  },
});

// home-service-electronic-js

var hsvClothesJs = new Swiper(".home-service-clothes-js", {
  slidesPerView: 3,
  loop:true,
  spaceBetween: 0,
  centeredSlides: true,
  breakpoints: {
      1024: {
        slidesPerView: 1,
        centeredSlides: false,
      }
    },
});

new Swiper(".home-service-electronic-js", { 
  slidesPerView: 3,
  spaceBetween: 5,
  loop: true,
  breakpoints: {
    320: {
      slidesPerView: 1
    },
    768: {
      slidesPerView: 1
    },
    992: {
      slidesPerView: 2
    }
  },
});