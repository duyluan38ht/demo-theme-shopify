//=========== Banner count down cosmetic theme ========
var eleBannerCountDownCosmetic = document.querySelector(".banner-count-down__count-down");
if (eleBannerCountDownCosmetic) {
    countDownTime(eleBannerCountDownCosmetic, 'cosmetic');
}

//=========== banner count down clothes theme ============
var eleBannerCountDownClothes = document.querySelector('.clothes-count-down-time');
if (eleBannerCountDownClothes) {
    //get days -> insert into slogan tag
    let sloganSaleDays = document.querySelector('.clothes-count-down-clothes .box-content__slogan-sale>div.day-left>p');
    let daysCountDown = getCountDownTimeFix(eleBannerCountDownClothes).days;

    if (sloganSaleDays) {
        if (daysCountDown < 0) daysCountDown = 0;
        sloganSaleDays.innerHTML = daysCountDown + ' day lefts';
    }

    //set count down
    countDownTime(eleBannerCountDownClothes, 'clothes');
}


//=============== Hande Count Down Banner Organic + Slide swiper ===========
var eleBannerCountDownOrganic = document.querySelector('.banner-organic__count-down')
if (eleBannerCountDownOrganic) {
    let swiperPagination = eleBannerCountDownOrganic.querySelector('.swiper-pagination')
    let swiperBannerCountDownOrganic = new Swiper('.banner-organic__count-down', {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        speed: 500,
        // pagination: {
        //     el: ".banner-organic .banner-organic__count-down .swiper-pagination",
        //     type: 'bullets',
        //     clickable: true
        // },
        // on: {
        //     slideChange: function () {
        //         const index_currentSlide = swiperBannerCountDownOrganic.activeIndexChange;
        //         const currentSlide = eleBannerCountDownOrganic.querySelector('.swiper-slide.swiper-slide-active')
        //         console.log(index_currentSlide)
        //         console.log(currentSlide)
        //         // if (swiperPagination) {
        //         //     swiperPagination.childNodes.forEach(function (item) {
                        
        //         //         if(item.classList.contains('swiper-pagination-bullet-active')) {
        //         //             item.classList.remove('swiper-pagination-bullet-active')
        //         //         }
                        
        //         //         if (item.getAttribute('aria-label').includes(index_currentSlide + 1)) {
        //         //             // console.log(item)
        //         //             item.classList.add('swiper-pagination-bullet-active')
        //         //         }
        //         //     })
        //         // }     
        //      },
        //  },
        hashNavigation: {
            watchState: true,
        },
        pagination: {
            el: ".banner-organic .banner-organic__count-down .swiper-pagination",
            clickable: true
        },
        navigation: {
            nextEl: `.banner-organic .swiper-button-next`
        },
    });
    
    var eleCountDownTime = eleBannerCountDownOrganic.querySelectorAll('.__count-down')
    if (eleCountDownTime.length > 0) {
        eleCountDownTime.forEach(function (item) {
            countDownTime(item, 'organic')       
        })
    }
}
//========================================================================================

//------ Function count down --------
function countDownTime(element, theme_type) {
    let year = element.getAttribute("data-year"),
        month = element.getAttribute("data-month"),
        day = element.getAttribute("data-day");
    // var countDownDate = new Date("November 25, 2021 00:00:00").getTime();
    let countDownDate = new Date(`${year}-${month}-${day}T00:00:00`).getTime();
    // Update the count down every 1 second
    let x = setInterval(function () { // Get today's date and time
        let now = new Date().getTime();

        // Find the distance between now and the count down date
        let distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        let days = Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds = Math.floor((distance % (1000 * 60)) / 1000);

        let content = contentHTMLCountDown(theme_type, days, hours, minutes, seconds);
        element.innerHTML = content;


        // If the count down is over, write some text
        if (distance < 0) {
            let content = contentHTMLCountDown(theme_type, '00', '00', '00', '00');
            element.innerHTML = content;
            clearInterval(x);
        }
    }, 1000);
}

function getCountDownTimeFix (element) {
    let year = element.getAttribute("data-year"),
        month = element.getAttribute("data-month"),
        day = element.getAttribute("data-day");

    let countDownDate = new Date(`${year}-${month}-${day}T00:00:00`).getTime();
    let now = new Date().getTime();

    // Find the distance between now and the count down date
    let distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    let days = Math.floor(distance / (1000 * 60 * 60 * 24))

    let arr_return = {
        days: days
    }

    return arr_return;
}

function contentHTMLCountDown (theme_type, days, hours, minutes, seconds) {
    let content = "";
    if (theme_type == 'cosmetic') {
        content += "<span class='day'><b>" + days + "</b> Days</span>";
        content += "<span class='hour'><b>" + hours + "</b> Hr</span>";
        content += "<span class='minutes'><b>" + minutes + "</b> Min</span>";
        content += "<span class='seconds'><b>" + seconds + "</b> Sec</span>";
    }
    if (theme_type == 'clothes' || theme_type == 'organic') {
        content += "<span class='time day'><b>" + days + "</b> <small>Days</small></span>";
        content += '<span class="two-dot">:</span>';
        content += "<span class='time hour'><b>" + hours + "</b> <small>Hours</small></span>";
        content += '<span class="two-dot">:</span>';
        content += "<span class='time minutes'><b>" + minutes + "</b> <small>Mins</small></span>";
        content += '<span class="two-dot">:</span>';
        content += "<span class='time seconds'><b>" + seconds + "</b> <small>Secs</small></span>";
    }
    return content;
}

//----- Small handling ----
var widthClient = window.innerWidth;
    //---- Clothes banner count down -> remove class container -> Mobile : background full width
if (widthClient < 600) {
    let eleClothesCountDownWP = document.querySelector('.clothes-count-down.container');
    if (eleClothesCountDownWP) {
        eleClothesCountDownWP.classList.remove('container');
    }
}


//---- Handle Category clothes type -----------
var wpCategoriesClothesType1 = document.querySelector('.wp-categories-clothes.type-1')
if (wpCategoriesClothesType1) {
    let listCateName = wpCategoriesClothesType1.querySelectorAll(".cate-name")  
    if (listCateName.length > 0) {
        listCateName.forEach(function (item) {
            let heightRealCateNameEle = item.clientWidth
            // console.log(heightRealCateNameEle)
            // console.log(`-${heightRealCateNameEle - 50}px`)
            item.style.left = `-${heightRealCateNameEle - 50}px`
        })
    }
}