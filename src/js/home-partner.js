const partnerSwiper = $('.partnerSwiper');
var swiper = new Swiper(".partnerSwiper", {
    slidesPerView: 5,
    loop: true,
    spaceBetween: 0,
    pagination: false,
    centeredSlides: false,
    breakpoints: {
        200: {
            slidesPerView: 1
        },
        554: {
            slidesPerView: 2
        },
        767: {
            slidesPerView: partnerSwiper.data('item') - 2,
        },
        979: { // >979
            slidesPerView: partnerSwiper.data('item'),
        },
    },
    navigation: {
        nextEl: ".swiper-button-next-medical-partner",
        prevEl: ".swiper-button-prev-medical-partner",
    },
});