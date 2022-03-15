
(function($){
    $(document).ready(function () {
        // Collection type = "tabs"
        function restart(){
            var organicSwiper = new Swiper(".collectionSwiper-organic", {
                slidesPerView: 3,
                slidesPerColumn: 2,
                slidesPerGroup :2,
                spaceBetween: 30,
            })
        }
        var organicSwiper = new Swiper(".collectionSwiper-organic", {
            slidesPerView: 3,
            slidesPerColumn: 2,
            slidesPerGroup :2,
            spaceBetween: 30,
        })

        $(".collection_tablinks").click(function(){
           
            var $this =$(this),
                dataHandle = $this.data('collection-url'),
                finishHandle = dataHandle + '?view=organic',
                
                ctabsSwiper = $('.collectionSwiper-organic'),
                ctabsContent = $('.collectionSwiper-organic .swiper-wrapper');
            $.ajax({
                url: finishHandle,
                type: 'GET',
                dataType: 'html',
                success: function(responseHTML){
                    ctabsContent.empty();
                    ctabsContent.append($(responseHTML).find('#main-collection-product-grid').html());
                },
                complete: function() {
                    restart();
                }
            })
        });

        $('.tab__header button').on('click', function(e){
            e.preventDefault();
            $('.tab__header button.active').removeClass('active');
            $(this).addClass('active');
        });

    });

})(jQuery);
