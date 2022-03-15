$(document).ready(function () {
  var clCothes = new Swiper(".collection-clothes__slider", {
    slidesPerView: 4,
    spaceBetween: 30,
    navigation: {
      nextEl: ".collection-clothes-action .collection-clothes-action__next",
      prevEl: ".collection-clothes-action .collection-clothes-action__prev",
    },
    breakpoints: {
        1500: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
      1024: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      768: {
        slidesPerView: 'auto',
        
      }
    },
  });
});
