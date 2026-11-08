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
    img.setAttribute('alt', product.title)
    img.classList.add('thumbnail')

    const title = _('p')
    title.classList.add('productTitle')
    title.textContent = product.title;

    const price = _('p')
    price.classList.add('productPrice')
    price.textContent = '$' + product.price

    const btn = _('button')
    btn.classList.add('btn')
    btn.textContent = '+'

    btn.addEventListener('click', () => {
        alert("Item Added to Cart! " + product.id + ", " + product.title)
    })



}