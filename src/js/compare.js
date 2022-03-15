window.theme = window.theme || {};
// Compare
theme.compare = (function (){
    var compareButtonClass = '.js-btn-compare',
        compareRemoveButtonClass = '.js-remove-compare',
        $compareCount = $('.js-compare-count'),
        $compareContainer = $('.js-compare-content'),
        compareObject = JSON.parse(localStorage.getItem('localCompare')) || [],
        alertClass='notice';
    function updateCompare(self) {
        var productHandle = $(self).data('handle'),
            alertText = '';
        var isAdded = $.inArray(productHandle,compareObject) !== -1 ? true:false;
        if (isAdded) {
            compareObject.splice(compareObject.indexOf(productHandle), 1);
            alertText = theme.strings.compareNotifyRemoved;
            alertClass = 'notice';
        }else{
            if (compareObject.length === 4){
                alertText = theme.strings.compareNotifyMaximum;
                alertClass = 'error';
            }else{
                alertClass = 'notice';
                compareObject.push(productHandle);
                alertText = theme.strings.compareNotifyAdded;
            }
        }
        //button text
        $(compareButtonClass).each(function(){
            var productHandle = $(this).data('handle');
            var status = $.inArray(productHandle,compareObject) !== -1 ? 'added' : '';
            $(this).removeClass('added').addClass(status);
        });

        //count items
        $compareCount.text(compareObject.length);
        localStorage.setItem('localCompare', JSON.stringify(compareObject));
        $compareCount.text(compareObject.length);
    };

    function removeItem(handle, eleItemCompare) {
        let localStorageCompareCurrent = localStorage.getItem('localCompare')
        if (localStorageCompareCurrent) {
            let dataCurrent = JSON.parse(localStorageCompareCurrent)
            var index = dataCurrent.indexOf(handle);
            if (index !== -1) {
                dataCurrent.splice(index, 1);
            }
            if (dataCurrent.length > 0) {
                localStorage.setItem('localCompare', JSON.stringify(dataCurrent));
            } else {
                localStorage.removeItem('localCompare')
            }

            // Re-render 
            if (eleItemCompare) 
                eleItemCompare.remove()
        }
    }

    $(document).on('click',compareButtonClass,function (event) {
        event.preventDefault();
        updateCompare(this);
        // loadCompare();
    });
    // $(document).on('click',compareRemoveButtonClass,function(){
    //     // var productHandle = $(this).data('handle');
    //     // compareObject.splice(compareObject.indexOf(productHandle), 1);
    //     // localStorage.setItem('localCompare', JSON.stringify(compareObject));
    //     // loadCompare();
    // });
    document.addEventListener('click', function (e) {
        if(e.target.classList.contains('js-remove-compare')) {
            var handle = e.target.getAttribute('data-product-handle')
            var itemCompare = e.target.closest('.item-compare')
            removeItem(handle, itemCompare)
        }
    })

    // loadCompare();
    // $(document).on('shopify:section:load', loadCompare);
    // return{
        // load:loadCompare
    // }
})()


//===== Render ===
//---- Get curreny format type ----
const currencyFormatElement = document.querySelector('#currency_format')
var isoCode = 'USD'
var symbol = '$'
if (currencyFormatElement) {
    isoCode = currencyFormatElement.getAttribute('data-iso-code')
    symbol = currencyFormatElement.getAttribute('data-symbol')
}

var localCompare = localStorage.getItem('localCompare')
var wrapperCompare = document.querySelector('.wp-compare')

if (localCompare) {
  var dataLocalCompare = JSON.parse(localCompare)  
  var html = ''
  dataLocalCompare.forEach(function (item) {
    var urlProductHandle = `/products/${item}.js`
    
    fetch(urlProductHandle)
      .then(response => response.json())
      .then(data => {
        let responseHTML = render(data)
        let itemCompareDOM = responseHTML.querySelector('.item-compare')
        if (itemCompareDOM) {
            if (wrapperCompare) {
                wrapperCompare.appendChild(itemCompareDOM)
            }
        }
      });
  })
} else {
    if (wrapperCompare) {
        wrapperCompare.innerHTML = '<p class="no-data">No Data Product</p>'
    }
}

function render(data) {
    // console.log(data)
    let priceRegular = data.price
    let priceSale = data.compare_at_price

    let priceSaleFormat = ''
    let priceRegularFormat = ''
    if (priceRegular) {
        priceRegularFormat = formatCurrency(priceRegular)
    }
    if (priceSale) {
        priceSaleFormat = formatCurrency(priceSale)
    }

    //--- Handle infomation product -------
    let listVariantOption1 = []
    data.variants.forEach(function (variant) {
        listVariantOption1.push(variant.option1)
    })
    listVariantOption1 = [...new Set(listVariantOption1)];
    let stringVaraints = listVariantOption1.join(', ')
    let option1Name = data.options[0].name

    //--- Get variant first available true ----
    let variantId = null
    let variantFirstAvailable = data.variants.find(function(variant) {
        return variant.available == true
    })
    if (variantFirstAvailable) {
        variantId = variantFirstAvailable.id
    }

    let html = `
<div class="item-compare col-3">
    <div class="inner">
        <span class="js-remove-compare" data-product-handle='${data.handle}' data-product-id='${data.id}'>&times;</span>
      <a href="${data.url}" class="image-link">
        <img src="${data.featured_image}" alt="">
      </a>
      <div class="info">
        <a href="${data.url}">
          <h3>${data.title}</h3>
        </a>
        <div class="price-in-compare">
          <span class="price-sale">${priceSaleFormat}</span>
          <span class="price-regular">${priceRegularFormat}</span>
        </div>
      </div>
    </div>

    <div class="button-atc hvr-bounce-to-right">
      <form method="POST" action="/cart/add">
        <input type="hidden" name="id" value="${variantId}" />
        <button type="submit">
            <svg width="25" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M 16 3.09375 L 7.09375 12 L 2 12 L 2 18 L 3.25 18 L 6.03125 27.28125 L 6.25 28 L 25.75 28 L 25.96875 27.28125 L 28.75 18 L 30 18 L 30 12 L 24.90625 12 Z M 16 5.9375 L 22.0625 12 L 9.9375 12 Z M 4 14 L 28 14 L 28 16 L 27.25 16 L 27.03125 16.71875 L 24.25 26 L 7.75 26 L 4.96875 16.71875 L 4.75 16 L 4 16 Z M 11 17 L 11 24 L 13 24 L 13 17 Z M 15 17 L 15 24 L 17 24 L 17 17 Z M 19 17 L 19 24 L 21 24 L 21 17 Z"/></svg>
            Add to card
        </button>
      </form>
    </div>

    <div class="infomation">
        <div class="availability item-info">
          <p class="title">Availability</p>
          <p class="content">In Stock</p>
        </div>
        <div class="brand item-info">
          <p class="title">Vendor</p>
          <p class="content">${data.vendor}</p>
        </div>
        <div class="color item-info">
          <p class="title">${option1Name}</p>
          <p class="content">${stringVaraints}</p>
        </div>
    </div>
  </div>
</div>
    `

    var parser = new DOMParser();
  	html = parser.parseFromString(html, 'text/html');
    return html
}

function formatCurrency(price) {
    price = price.toString()

    let firstPrice = price.substr(0, price.length-2);
    let dot = '.'
    let lastPrice = price.substr(price.length-2, 2);

    let result = symbol + firstPrice + dot + lastPrice
    
    return result
}