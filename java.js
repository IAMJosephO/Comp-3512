import products from './data-minified.json' with { type: 'json'};

function $(selector) {
    return document.querySelector(selector)
}

function $$(selector) {
    return document.querySelectorAll(selector)
}

function _(tag) {
    return document.createElement(tag)
}

const products = data.products
const productList = $("#productList")

for (let product of products) {
    const productBox = _('article')
    productBox.classList.add('box')

    const img = _('img')
    img.setAttribute('src', product.thumbnail)
    img.setAttribute('src', product.title)
    img.classList.add('thumbnail')

    const info = _('div')


}