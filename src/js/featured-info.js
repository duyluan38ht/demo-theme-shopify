
$( document ).ready(function() {

    var topRecommend = new Swiper(".top-recommend__list", {
        slidesPerView: 1,
        loop: true,      
        calculateHeight: true,
        // fadeEffect: {
        //     crossFade: true,
        // },
        // effect: "fade",
        speed: 500,
        navigation: {
            nextEl: '.top-recommend__list .swiper-button-next',
            prevEl: '.top-recommend__list .swiper-button-prev',
        },
        pagination: {
            el: ".top-recommend__list .swiper-pagination",
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '"></span>';
            },
        },
       
    });

    var featuredPost = new Swiper(".featured-post__list", {
        slidesPerView: 1,
        loop: true,      
        calculateHeight: true,
        fadeEffect: {
            crossFade: true,
        },
        effect: "fade",
        speed: 500,
        navigation: {
            nextEl: '.featured-post__list .swiper-button-next',
            prevEl: '.featured-post__list .swiper-button-prev',
        },    
    });

    var bestReviewer = new Swiper(".best-reviewer__list", {
        slidesPerView: 1,
        loop: true,      
        calculateHeight: true,
        fadeEffect: {
            crossFade: true,
        },
        effect: "fade",
        speed: 500,
        navigation: {
            nextEl: '.best-reviewer__list .swiper-button-next',
            prevEl: '.best-reviewer__list .swiper-button-prev',
        },    
    });

    var eleSliderElectronic = document.querySelectorAll(".top-recommend__count-down");
   eleSliderElectronic.forEach(function(slide) {
       countDownTime(slide);
   })
    
//------ Function count down --------
function countDownTime(element) {
    // console.log('123')
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
            clearInterval(x);
            document.querySelector(`.${element}`).innerHTML = "EXPIRED";
        }
    }, 1000);
}

function contentHTMLCountDown ( days, hours, minutes, seconds) {
    // console.log('abcd');
    let content = "";
   
        content += "<span class='day'><b>" + days + "</b> Days</span>";
        content += "<span class='hour'><b>" + hours + "</b> Hour</span>";
        content += "<span class='minutes'><b>" + minutes + "</b> Min</span>";
        content += "<span class='seconds'><b>" + seconds + "</b> Sec</span>";
 
  
    return content;
}



});
