// // console.log(window._mediaProduct)

let dataProductMedias = window._mediaProduct.medias
// console.log(dataProductMedias)

let dataIntoLightGallery = []
dataProductMedias.forEach(function (item) {
    // console.log(item)
    dataIntoLightGallery.push(
        {
            src: item.src,
            thumb: item.src,
        }
    )
})


var slideType = document.querySelector('.product__media-slider'),
    slideVal = slideType.dataset.type;

const wpMain = slideType.querySelector('.wp-img-main')
const lgContainer = document.getElementById('inline-gallery-container');
let index = 0
if (wpMain) {
    var imageMain = wpMain.querySelector('img.image-main')

    imageMain.addEventListener('click', function () {

        const inlineGallery = lightGallery(lgContainer, {
            container: lgContainer,
            dynamic: true,
            // Turn off hash plugin in case if you are using it
            // as we don't want to change the url on slide change
            hash: false,
            index: index,
            // Do not allow users to close the gallery
            closable: false,
            // Add maximize icon to enlarge the gallery
            showMaximizeIcon: true,
            // Append caption inside the slide item
            // to apply some animation for the captions (Optional)
            appendSubHtmlTo: '.lg-item',
            // Delay slide transition to complete captions animations
            // before navigating to different slides (Optional)
            // You can find caption animation demo on the captions demo page
            slideDelay: 400,
            dynamicEl: dataIntoLightGallery,
        });

        // Since we are using dynamic mode, we need to programmatically open lightGallery
        // inlineGallery.openGallery();
        // inlineGallery.slide(2);
    })
}

if (slideVal === 'slide-normal') {
    var mpswiper = new Swiper(".mpslider__thumb", {
        loop: true,
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,
    });
    var mtswiper = new Swiper(".mpslider__main", {
        loop: true,
        spaceBetween: 10,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        thumbs: {
            swiper: mpswiper,
        },
    });

    mtswiper.on('slideChangeTransitionStart', function () {
        mpswiper.slideTo(mtswiper.activeIndex);
    });

    mpswiper.on('transitionStart', function () {
        mtswiper.slideTo(mpswiper.activeIndex);
    });

} else if (slideVal === 'slide-vertical') {

    var galleryThumbs = new Swiper(".mpslider__thumb", {
        centeredSlides: false,
        centeredSlidesBounds: false,
        slidesPerView: 3,
        direction: 'vertical',
        freeMode: false,
        slideToClickedSlide: true,
        loop: true,
        spaceBetween: 30,
        navigation: {
            nextEl: ".sv-thumb-button-next",
            prevEl: ".sv-thumb-button-prev",
        }
    });

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
}


