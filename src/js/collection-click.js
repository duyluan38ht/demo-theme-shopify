(function($){

    $(document).ready(function () {
        // Collection type = "tabs"
        function restart(){
            var swiperCtabs = new Swiper(".clothes__container .ctabsSwiper", {
                slidesPerView: 4,
                loop: true,
                spaceBetween: 30,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                breakpoints:{
                    1366:{
                        slidesPerView: 3,
                    },
                    1024:{
                        slidesPerView: 2,
                    },
                    767:{
                        slidesPerView: 1,
                    }
                }
            })
        }
        var swiperCtabs = new Swiper(".clothes__container .ctabsSwiper", {
            slidesPerView: 4,
            loop: true,
            spaceBetween: 30,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints:{
                1366:{
                    slidesPerView: 3,
                },
                1024:{
                    slidesPerView: 2,
                },
                767:{
                    slidesPerView: 1,
                }
            }
        })

        $(".collection_tablinks").click(function(){
            // console.log('HERE ')
            var $this =$(this),
                dataHandle = $this.data('collection-url'),
                finishHandle = dataHandle + '?view=alternate',
                ctabsSwiper = $('.ctabsSwiper'),
                ctabsContent = $('.ctabsSwiper .swiper-wrapper');
            // console.log(ctabsContent.parent())
            var tabContent = ctabsContent.parent();
            var loadingIcon = $('.loading-clothes-featured-collection');

            tabContent.addClass('d-none');
            loadingIcon.removeClass('d-none');

            $.ajax({
                url: finishHandle,
                type: 'GET',
                dataType: 'html',
                success: function(responseHTML){
                    ctabsContent.empty();
                    ctabsContent.append($(responseHTML).find('#main-collection-product-grid').html());

                    tabContent.removeClass('d-none');
                    loadingIcon.addClass('d-none');
                },
                complete: function() {
                    restart();
                }
            })
        });

        $('.header__left button').on('click', function(e){
            e.preventDefault();
            $('.header__left button.active').removeClass('active');
            $(this).addClass('active');
        });

    });

})(jQuery);