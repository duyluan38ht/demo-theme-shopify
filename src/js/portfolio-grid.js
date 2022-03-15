//==== First load page =========
const inputTagFilter = document.querySelector('#tag_filter')
var valueInputTagFilterCurrent = inputTagFilter.value
const listItemPortfolio = document.querySelector(".wrapper-portfolio").querySelectorAll('.item')
if (listItemPortfolio.length > 0) {
    listItemPortfolio.forEach(function (item, index) {
        if (item.getAttribute('data-tag') != valueInputTagFilterCurrent) {
            item.classList.add('hide-item')
        }
    })
}
//===========================

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('tab')) {
        //Change input hidden filter_tag
        let valueTag = e.target.getAttribute('data-value')
        
        inputTagFilter.value = valueTag

        //effect active tag filter
        const parentFilterTag = e.target.parentElement
        const tagFilterActiveCurrent = parentFilterTag.querySelector('.active-tag')
        if (tagFilterActiveCurrent) {
            tagFilterActiveCurrent.classList.remove('active-tag')
        }
        e.target.classList.add('active-tag')

        //Re-render content 
        listItemPortfolio.forEach(function (item, index) {
            if (item.getAttribute('data-tag') != valueTag) {
                if (!item.classList.contains('hide-item')) {
                    item.classList.add('hide-item')
                }
            } else {
                if (item.classList.contains('hide-item')) {
                    item.classList.remove('hide-item')
                }
            }
        })
    }
})