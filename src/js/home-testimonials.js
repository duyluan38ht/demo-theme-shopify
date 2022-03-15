window.addEventListener("load", function () {
    const testimonialSwiperCosmetic = new Swiper(".cosmetic-testimonial-swiper", { // Optional parameters
        direction: getDirection(),
        pagination: {
            el: ".cosmetic-testimonial-pagination",
            clickable: true,
            renderBullet: function (index, className) {
                return "<span class=\"" + className + "\"></span>";
            },
            bulletClass: "cosmetic-testimonial-bullet",
            bulletActiveClass: "cosmetic-testimonial-bullet-active"
        },
        on: {
            resize: function () {
              swiper.changeDirection(getDirection());
            },
        },
    });

    function getDirection() {
        var direction = window.innerWidth <= 1024 ? 'horizontal' : 'vertical';

        return direction;
    }

    const testimonialSwiperMedical = new Swiper(".medical-testimonial-swiper", { // Optional parameters
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination.pagination-medical-testimonial-swiper',
            clickable: true,
        },
        loop: true,
        centeredSlides: true,
        breakpoints: {
            992:
			{
				slidesPerView: 3
			},
            768:
			{
				slidesPerView: 1.5
			},
			300:
			{
				slidesPerView: 1
			}
        },
    });
})