var galleryThumbs = new Swiper(".slide-vertical__thumb", {
    centeredSlides: false,
    centeredSlidesBounds: true,
    slidesPerView: 4,
    watchOverflow: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    direction: 'vertical',
    // freeMode: false,
    spaceBetween: 20,
    slideToClickedSlide: true,
    loop: true,
    navigation: {
        nextEl: ".thumb-button-next",
        prevEl: ".thumb-button-prev",
    },
    breakpoints: {
        767: {
            slidesPerView: 1,
        },
        1024: {
            slidesPerView: 2,
        },
        1366: {
            slidesPerView: 3,
        }
    }
});

var slideType = document.querySelector('#dynamic-gallery-demo');

const wpMain = slideType.querySelector('.wp-img-main')
if (wpMain) {
    var imageMain = wpMain.querySelector('img.image-main')
}

let index = 0
galleryThumbs.on('slideChange', function () {
    const index_currentSlide = galleryThumbs.activeIndex;
    const currentSlide = galleryThumbs.slides[index_currentSlide];

    let indexRealCurrntSlide = currentSlide.getAttribute('data-swiper-slide-index')
    index = parseInt(indexRealCurrntSlide)

    let imgActiveThumb = currentSlide.querySelector('img')
    if (imgActiveThumb) {
        let imgSrcNew = imgActiveThumb.getAttribute('src')
        imageMain.setAttribute('src',imgSrcNew)
    }
});


