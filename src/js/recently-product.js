var dataRecentlyProductStr = localStorage.getItem('recently_product')
if (dataRecentlyProductStr) {
    var dataRecentlyProduct = JSON.parse(dataRecentlyProductStr)

    // console.log(dataRecentlyProduct)

    const wrapperRecentlyProduct = document.querySelector(".wrapper-recently-product")
    if (wrapperRecentlyProduct) {
        const wpItem = wrapperRecentlyProduct.querySelector('.wp-item')
        // console.log(wpItem)

        if (wpItem) {
            let stars = ''
            let starRemaining = ''
            let hasRating = false

            let html = '';
            for (const [key, item] of Object.entries(dataRecentlyProduct)) {
                if (item.rating) {
                    hasRating = true
                    stars = item.rating
                    starRemaining = 5 - stars
                }

                //Handle price 
                let priceRegular = item.priceRegular
                let priceCompare = ''
                if (item.priceCompare) {
                    priceCompare = item.priceCompare
                }

                html += `<div class='item col-lg-3 col-md-3 col-sm-6' data-product-id='${key}'>`

                html += `<a class='wp-image' href="${item.urlProduct}" title="${item.title}">`
                html += `<img src='${item.featured_image}' />`
                html += `</a>
                `
                html += `<div class='info'>`
                html += `<h3>`
                html += `<a href="${item.urlProduct}" title="${item.title}">${item.title}</a>`
                html += `</h3>`
                html += `<div class='box-rating-price'>`
                html += `<div class='stars-new'>`
                if (hasRating) {
                    if (stars != '') {
                        for (let index = 1; index <= stars; index++) {
                            html += `<span aria-label="Rating of this product is out of 5." class="stars-new have">★</span>`
                        }
                    }
                    if (starRemaining != '') {
                        for (let index = 1; index <= starRemaining; index++) {
                            html += `<span aria-label="Rating of this product is out of 5." class="stars not-have">☆</span>`
                        }
                    }
                } else {
                    for (let index = 1; index <= 5; index++) {
                        html += `<span aria-label="Rating of this product is out of 5." class="stars not-have">☆</span>`
                    }
                }

                html += `</div>`
                html += `<div class='price-box'>`
                html += `<span class='price-sale'>${priceCompare}</span>`
                html += `<span class='price-regular'>${priceRegular}</span>`
                html += `</div>`
                html += `</div>`

                html += `</div>`

                html += `</div>`
            }


            wpItem.innerHTML = html
        }
    }
}