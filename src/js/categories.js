
$( document ).ready(function() {

    var ctgrSwiper = new Swiper(".ctgrSwiper", {
    slidesPerView: 5,
    spaceBetween: 0,
    initialSlide: 1,
    breakpoints: {
        1600: {
            slidesPerView: 4,
          },
        1024: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 1,
        },
      },
      pagination: {
        el: ".ctgrSwiper .swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + '0'+(index + 1) + "</span>";
        },
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
   
});
