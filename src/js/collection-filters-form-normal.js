// Active class when click
function showLoading() {
    const loading = document.querySelector('.loading-collection');
    if (loading) {
        loading.classList.remove('d-none')
    }
}

function hideLoading() {
    const loading = document.querySelector('.loading-collection');
    if (loading) {
        loading.classList.add('d-none')
    }
}
(function($){
    $( document ).ready(function() {
        function updateCartAtributtes(val){
            $.post('/cart/update.js', {
                attributes: {
                    'collection_products_per_page': val
                }
            });
        }
        var dataHandle = $('.collection-filters__page #pagination').data('url'),
            ctabsContent = $('#CollectionProductGrid__content .collection');
        $('.collection-filters__page #pagination').on('change', function() {
            updateCartAtributtes($(this).val());
            if ($(this).val() === '12') {
                var finishHandle = dataHandle + '?view=12';
            } else if ($(this).val() === '24') {
                var finishHandle = dataHandle + '?view=24';
            } else if ($(this).val() === '36') {
                var finishHandle = dataHandle + '?view=36';
            } else if ($(this).val() === '48') {
                var finishHandle = dataHandle + '?view=48';
            }
            $.ajax({
                url: finishHandle,
                type: 'GET',
                dataType: 'html',
                beforeSend: function() {
                    // setting a timeout
                    showLoading();
                },
                success: function(responseHTML){
                    ctabsContent.empty();
                    if(ctabsContent.children().length == 0){
                        $response = $(responseHTML).find('#CollectionProductGrid__content .collection');
                        $('#CollectionProductGrid__content .collection').append($response).html();
                    }
                },
                complete: function() {
                    hideLoading();
                }
            })
        });

        $('.collection-filters__left').on('click', 'li', function() {
            $('.collection-filters__left li.active').removeClass('active');
            $("#main-collection-product-grid").attr('class', '');
            let descrp;
            const type = $(this).data('type');
            if (type === 'list'){
                $('#main-collection-product-grid').addClass('column-list');
                localStorage.removeItem('status-layout');
                localStorage.setItem('status-layout', 'column-list');
            }else if(type === 'two'){
                $('#main-collection-product-grid').addClass('column-2');
                localStorage.removeItem('status-layout');
                localStorage.setItem('status-layout', 'column-2');
            }else if(type === 'three'){
                $('#main-collection-product-grid').addClass('column-3');
                localStorage.removeItem('status-layout');
                localStorage.setItem('status-layout', 'column-3');
            }else if(type === 'four'){
                $('#main-collection-product-grid').addClass('column-4');
                localStorage.removeItem('status-layout');
                localStorage.setItem('status-layout', 'column-4');
            }else if(type === 'five'){
                $('#main-collection-product-grid').addClass('column-5');
                localStorage.removeItem('status-layout');
                localStorage.setItem('status-layout', 'column-5');
            }
            $(this).addClass('active');
        });
        var layout = localStorage.getItem('status-layout');

        if (layout != null) {
            if (layout === 'column-list') {
                $('.collection-filters__left .icon--list').addClass('active');
                $('#main-collection-product-grid').addClass(layout);
            }
            else if(layout === 'column-2')
            {
                $('.collection-filters__left .icon--two').addClass('active');
                $('#main-collection-product-grid').addClass(layout);
            }
            else if(layout === 'column-3')
            {
                $('.collection-filters__left .icon--three').addClass('active');
                $('#main-collection-product-grid').addClass(layout);
            }
            else if(layout === 'column-4')
            {
                $('.collection-filters__left .icon--four').addClass('active');
                $('#main-collection-product-grid').addClass(layout);
            }
            else if(layout === 'column-5')
            {
                $('.collection-filters__left .icon--five').addClass('active');
                $('#main-collection-product-grid').addClass(layout);
            }
        }
    });

})(jQuery);

// price range slider

(function() {
    const parent = document.querySelector('.range-slider');

    if (!parent) {
        return;
    }

    const rangeS = parent.querySelectorAll('input[type="range"]'),
         ranger = document.querySelector('.range-slider'),
         count = document.querySelector('.count-price'),
        inputmin = document.querySelector('#Filter-Price-GTE'),
        inputmax = document.querySelector('#Filter-Price-LTE'),
        numbermin = count.querySelector('.min'),
        numbermax = count.querySelector('.max');

    rangeS.forEach((el) => {
        el.oninput = () => {
            let slide1 = parseFloat(rangeS[0].value),
                slide2 = parseFloat(rangeS[1].value);

            if (slide1 > slide2) {
                [slide1, slide2] = [slide2, slide1];
            }
        }
    });
    inputmin.addEventListener('input', updateValue1);
    inputmax.addEventListener('input', updateValue2);

    function updateValue1(e) {
        numbermin.textContent = e.target.value;
    }
    function updateValue2(e) {
        numbermax.textContent = e.target.value;
    }
    class CollectionFiltersForm extends HTMLElement {
        constructor() {
            super();
            this.filterData = [];
            this.onActiveFilterClick = this.onActiveFilterClick.bind(this);

            this.debouncedOnSubmit = debounce((event) => {
                this.onSubmitHandler(event);
            }, 500);

            this.querySelector('form').addEventListener('input', this.debouncedOnSubmit.bind(this));
            window.addEventListener('popstate', this.onHistoryChange.bind(this));

            const facetWrapper = this.querySelector('#FacetsWrapperDesktop');
            if (facetWrapper) facetWrapper.addEventListener('keyup', onKeyUpEscape);
        }

        onSubmitHandler(event) {
            event.preventDefault();
            const formData = new FormData(event.target.closest('form'));
            const searchParams = new URLSearchParams(formData).toString();
            this.renderPage(searchParams, event);
        }

        onActiveFilterClick(event) {
            event.preventDefault();
            this.toggleActiveFacets();
            this.renderPage(new URL(event.currentTarget.href).searchParams.toString());
        }

        onHistoryChange(event) {
            const searchParams = event.state ? event.state.searchParams : '';
            this.renderPage(searchParams, null, false);
        }

        toggleActiveFacets(disable = true) {
            document.querySelectorAll('.js-facet-remove').forEach((element) => {
                element.classList.toggle('disabled', disable);
            });
        }

        renderPage(searchParams, event, updateURLHash = true) {
            const sections = this.getSections();
            const countContainerDesktop = document.getElementById('CollectionProductCountDesktop');
            document.getElementById('CollectionProductGrid').querySelector('.collection').classList.add('loading');
            document.getElementById('CollectionProductCount').classList.add('loading');
            if (countContainerDesktop){
                countContainerDesktop.classList.add('loading');
            }

            sections.forEach((section) => {
                const url = `${window.location.pathname}?section_id=${section.section}&${searchParams}`;
                const filterDataUrl = element => element.url === url;

                this.filterData.some(filterDataUrl) ?
                    this.renderSectionFromCache(filterDataUrl, event) :
                    this.renderSectionFromFetch(url, event);
            });

            if (updateURLHash) this.updateURLHash(searchParams);
        }

        renderSectionFromFetch(url, event) {
            fetch(url)
                .then(response => response.text())
                .then((responseText) => {
                    const html = responseText;
                    this.filterData = [...this.filterData, { html, url }];
                    this.renderFilters(html, event);
                    this.renderProductGrid(html);
                    this.renderProductCount(html);
                });
        }

        renderSectionFromCache(filterDataUrl, event) {
            const html = this.filterData.find(filterDataUrl).html;
            this.renderFilters(html, event);
            this.renderProductGrid(html);
            this.renderProductCount(html);
        }

        renderProductGrid(html) {
            document.getElementById('main-collection-product-grid').innerHTML = new DOMParser().parseFromString(html, 'text/html').getElementById('main-collection-product-grid').innerHTML;

            let styleShow = this.checkTypeShow()
            let mainContent = document.querySelector('#main-collection-product-grid')
            if (styleShow == 'list') {
                mainContent.classList.add('product-is-list')
            }

            this.checkOnMobile(mainContent)
        }

        renderProductCount(html) {
            const count = new DOMParser().parseFromString(html, 'text/html').getElementById('CollectionProductCount').innerHTML
            const container = document.getElementById('CollectionProductCount');
            const containerDesktop = document.getElementById('CollectionProductCountDesktop');
            container.innerHTML = count;
            container.classList.remove('loading');
            if (containerDesktop) {
                containerDesktop.innerHTML = count;
                containerDesktop.classList.remove('loading');
            }
        }

        checkTypeShow() {
            const collectionFiltersLeft = document.querySelector('.collection-filters__left')
            let styleShow = ''
            // if (collectionFiltersLeft) {
            //     const styleEleActive = collectionFiltersLeft.querySelector('.active')
            //         // styleShow = styleEleActive.dataset.type;
            // }
            return styleShow
        }

        checkOnMobile(mainContent, columnClass) {
            let widthDevice = window.innerWidth
            if (widthDevice < 768) {
                let arrClass = mainContent.classList
                arrClass.forEach(function (item) {
                    if (item.includes('column-')) {
                        mainContent.classList.remove(item)
                        mainContent.classList.add('column-1')
                    }
                })
            }
        }

        renderFilters(html, event) {
            const parsedHTML = new DOMParser().parseFromString(html, 'text/html');

            const facetDetailsElements =
                parsedHTML.querySelectorAll('#CollectionFiltersForm .js-filter, #CollectionFiltersFormMobile .js-filter');
            const matchesIndex = (element) => {
                const jsFilter = event ? event.target.closest('.js-filter') : undefined;
                return jsFilter ? element.dataset.index === jsFilter.dataset.index : false;
            }
            const facetsToRender = Array.from(facetDetailsElements).filter(element => !matchesIndex(element));
            const countsToRender = Array.from(facetDetailsElements).find(matchesIndex);

            facetsToRender.forEach((element) => {
                document.querySelector(`.js-filter[data-index="${element.dataset.index}"]`).innerHTML = element.innerHTML;
            });

            this.renderActiveFacets(parsedHTML);
            // this.renderAdditionalElements(parsedHTML);

            if (countsToRender) this.renderCounts(countsToRender, event.target.closest('.js-filter'));
        }

        renderActiveFacets(html) {
            const activeFacetElementSelectors = ['.active-facets-mobile', '.active-facets-desktop'];

            activeFacetElementSelectors.forEach((selector) => {
                const activeFacetsElement = html.querySelector(selector);
                if (!activeFacetsElement) return;
                document.querySelector(selector).innerHTML = activeFacetsElement.innerHTML;
            })

            this.toggleActiveFacets(false);
        }

        renderAdditionalElements(html) {
            const mobileElementSelectors = ['.mobile-facets__open', '.mobile-facets__count', '.sorting'];

            mobileElementSelectors.forEach((selector) => {
                if (!html.querySelector(selector)) return;
                document.querySelector(selector).innerHTML = html.querySelector(selector).innerHTML;
            });

            document.getElementById('CollectionFiltersFormMobile').closest('menu-drawer').bindEvents();
        }

        renderCounts(source, target) {
            const countElementSelectors = ['.count-bubble','.facets__selected'];
            countElementSelectors.forEach((selector) => {
                const targetElement = target.querySelector(selector);
                const sourceElement = source.querySelector(selector);

                if (sourceElement && targetElement) {
                    target.querySelector(selector).outerHTML = source.querySelector(selector).outerHTML;
                }
            });
        }

        updateURLHash(searchParams) {
            history.pushState({ searchParams }, '', `${window.location.pathname}${searchParams && '?'.concat(searchParams)}`);
        }

        getSections() {
            return [
                {
                    id: 'main-collection-product-grid',
                    section: document.getElementById('main-collection-product-grid').dataset.id,
                }
            ]
        }
    }

    customElements.define('collection-filters-form', CollectionFiltersForm);

})();