function getVariantWithValue(value, dataVariants) {
    if (dataVariants.length > 0) {
        var result = dataVariants.find(function (item) {
            return item.title.includes(value) ? true : false
        })
        return result
    } else {
        throw new Error('No data variant ...'); 
    }
}

function activeVariantElement(element) {
    const cardInfomationWrapper = element.closest('.card-information__wrapper')
    if (cardInfomationWrapper) {
        const itemActiveCurrent = cardInfomationWrapper.querySelector('.active-variant-color')
        itemActiveCurrent && itemActiveCurrent.classList.remove('active-variant-color')
    }

    element.classList.add('active-variant-color')
}

function changeImageMain(e, dataSrcNew = null) {
    const cardWrapper = e.closest('.card-wrapper')
    if (cardWrapper) {
        const productItemImg = cardWrapper.querySelector('.product-item__img') 
        if (productItemImg) {
            const imgMain = productItemImg.querySelector('img')
            if (imgMain && dataSrcNew != null) {
                imgMain.setAttribute('src', dataSrcNew)
                imgMain.setAttribute('srcset', dataSrcNew)
            }
        }
    }
}

function updatePrice(e, dataPrice) {
    const cardInformationWrapper = e.closest('.card-information__wrapper')
    if (cardInformationWrapper) {
        const priceElement = cardInformationWrapper.querySelector('.price')
        
        let priceFormat = formatCurrency(dataPrice.price)
        if (dataPrice.compare_at_price) {
            // Sale
            let compareAtPriceFormat = formatCurrency(dataPrice.compare_at_price)
            const priceSale = priceElement.querySelector('.price__sale')
            if (priceSale) {
                const priceItemSale = priceSale.querySelector('.price-item--sale')
                const priceItemRegular = priceSale.querySelector('.price-item--regular')

                priceItemSale.innerHTML = priceFormat
                priceItemRegular.innerHTML = compareAtPriceFormat
            }
        } else {
            // Regular
            const priceRegular = priceElement.querySelector('.price__regular')
            if (priceRegular) {
                const priceItemRegular = priceRegular.querySelector('.price-item--regular')
                priceItemRegular.innerHTML = priceFormat
            }
        }
    }
}

function updateInputHiddenATC(e, variantId) {
    const cardInformationWrapper = e.closest('.card-information__wrapper')
    if (cardInformationWrapper) {
        const cardInformationCart = cardInformationWrapper.querySelector('.card-information__cart')
        if (cardInformationCart) {
            const inputValueVariantId = cardInformationCart.querySelector('form input[name="id"]')
            if (inputValueVariantId) {
                inputValueVariantId.value = variantId
            } else {
                throw new Error('Not input hidden this ...');    
            }
        }
    }
}

function formatCurrency(price) {
    const currencyFormatElement = document.querySelector('#currency_format')
    var isoCode = 'USD'
    var symbol = '$'
    if (currencyFormatElement) {
        isoCode = currencyFormatElement.getAttribute('data-iso-code')
        symbol = currencyFormatElement.getAttribute('data-symbol')
    }

    price = price.toString()

    let firstPrice = price.substr(0, price.length-2);
    let dot = '.'
    let lastPrice = price.substr(price.length-2, 2);

    // let result = symbol + firstPrice + dot + lastPrice + ' ' + isoCode
    let result = symbol + firstPrice + dot + lastPrice
    
    return result
}

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('product-option-item')) {
        // console.log(e.target)
        var dataProductHandle = e.target.getAttribute('data-product-handle')
        var urlProductHandle = `/products/${dataProductHandle}.js`
        var valueVariant = e.target.getAttribute('data-variant-value')
    
        fetch(urlProductHandle)
        .then(response => response.json())
        .then(data => {
            var variantFistClicked = getVariantWithValue(valueVariant, data.variants)
            // console.log(variantFistClicked)
            var dataPrice = {
                price: variantFistClicked.price,
                compare_at_price: variantFistClicked.compare_at_price
            }

            var featuredImageSrc = variantFistClicked.featured_image ? variantFistClicked.featured_image.src : null

            activeVariantElement(e.target)
            changeImageMain(e.target, featuredImageSrc)
            updatePrice(e.target, dataPrice)
            updateInputHiddenATC(e.target, variantFistClicked.id)
        });
    }
})