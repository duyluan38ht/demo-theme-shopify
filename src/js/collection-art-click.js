(function($){

    $(document).ready(function () {         
        $(".collection_tablinks").click(function(){
            var $this =$(this),
                dataHandle = $this.data('collection-url'),
                finishHandle = dataHandle + '?view=art',  
                ctabsContent = $(' .tab-art-list');
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

        $('.header__left button').on('click', function(e){
            e.preventDefault();
            $('.header__left button.active').removeClass('active');
            $(this).addClass('active');
        });

    });

})(jQuery);