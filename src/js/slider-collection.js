var sliderCollection = new Swiper(".cl-slider-list", {
    slidesPerView: 5,
    loop: true,
    navigation: {
        nextEl: ".swiper-button-prev-sl-collection",
        prevEl: ".swiper-button-next-sl-collection",
    },
    pagination: {
        el: ".cl-swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '"></span>';
        },
    },
    breakpoints: {
        
        1440: {
            slidesPerView: 4,
        },
        1200: {
            slidesPerView: 3,
        },
        992: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 1,
        }
    }
});