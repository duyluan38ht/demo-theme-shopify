$( document ).ready(function() {    
    var homeslideSwiper = new Swiper(".banner-ele__slider", {
        slidesPerView: 1,
        loop: true,      
        calculateHeight: true,
        // fadeEffect: {
        //     crossFade: true,
        // },
        // effect: "fade",
        speed: 500,
        navigation: {
            nextEl: ".wp-banner-slider .swiper-button-next",
            // prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".banner-ele__slider .swiper-pagination",
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '"></span>';
            },
        },
    });
    

});