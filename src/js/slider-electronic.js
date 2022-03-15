
$( document ).ready(function() {
    const hsTag = $(".slider-electronic__list"),
    hslVal = hsTag.data("loop"),
    hsaVal = hsTag.data("autoplay"),
    hsDelayVal = hsTag.data('swiper-autoplay');
    var sliderElectronic = new Swiper(".slider-electronic__list", {
        slidesPerView: 1,
        loop: hslVal,
        autoplay: hsaVal,
        // autoplay: {
        //     delay: hsDelayVal,
        //     disableOnInteraction: false,
        //   },      
        calculateHeight: true,
        fadeEffect: {
            crossFade: true,
        },
        effect: "fade",
        speed: 100,
        pagination: {
            el: ".slider-electronic__list .swiper-pagination",
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '"></span>';
            },
        },
        on: {
            init: function () {
                const sliderElectronic = document.querySelector('.slider-electronic');
                if (sliderElectronic) {
                    const homeslideSwiperElectronic = sliderElectronic.querySelector('.slider-electronic__list');
                    if (homeslideSwiperElectronic) {
                        const slideActiveInit = homeslideSwiperElectronic.querySelector('.swiper-wrapper .swiper-slide-active');
                        if (slideActiveInit) {
                            const swiperSlideContent = slideActiveInit.querySelector('.slider-electronic__content');
                            const swiperImage = slideActiveInit.querySelector('.slider-electronic__img');
                            setTimeout(function () {
                                swiperSlideContent.classList.add('fadeInUp');
                                swiperImage.classList.add('fadeLeftRight');

                            }, 800);
                        }
                    }             
                }  

             },
             slideChange: function () {
                 const index_currentSlide = sliderElectronic.activeIndex;
                 const currentSlide = sliderElectronic.slides[index_currentSlide];
                 const currentslideContent = currentSlide.querySelector(
                     ".slider-electronic__content"
                 );
                 const currentslideImg = currentSlide.querySelector(
                     ".slider-electronic__img"
                 );
                 
                  if (currentslideContent.classList.contains("fadeInUp")) {
                      currentslideContent.classList.remove("fadeInUp");
                      setTimeout(function () {
                          currentslideContent.classList.add("fadeInUp");
                      }, 200);
                  } else {
                      currentslideContent.classList.add("fadeInUp");
                  }

                  if (currentslideImg.classList.contains("fadeLeftRight")) {
                      currentslideImg.classList.remove("fadeLeftRight");
                      setTimeout(function () {
                          currentslideImg.classList.add("fadeLeftRight");
                      }, 200);
                  } else {
                      currentslideImg.classList.add("fadeLeftRight");
                  }
             },
         },
       
    });

    var eleSliderElectronic = document.querySelectorAll(".slider-electronic__count-down");
   eleSliderElectronic.forEach(function(slide) {
       countDownTime(slide);
   })
    
//------ Function count down --------
function countDownTime(element) {
    let year = element.getAttribute("data-year"),
        month = element.getAttribute("data-month"),
        day = element.getAttribute("data-day");

        // console.log(year, month, day)
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

        let content = contentHTMLCountDown( days, hours, minutes, seconds);
        element.innerHTML = content;


        // If the count down is over, write some text
        if (distance < 0) {
            let content = contentHTMLCountDown('00', '00', '00', '00');
            element.innerHTML = content;
            clearInterval(x);
        }
    }, 1000);
}

function contentHTMLCountDown ( days, hours, minutes, seconds) {
    let content = "";
   
        content += "<span class='day'><b>" + days + "</b> Days</span>";
        content += "<span class='hour'><b>" + hours + "</b> Hour</span>";
        content += "<span class='minutes'><b>" + minutes + "</b> Min</span>";
        content += "<span class='seconds'><b>" + seconds + "</b> Sec</span>";
 
  
    return content;
}



});
