import config from './data/data-minifed.json' with { type: 'json' };

function $(selector) {
    return document.querySelector(selector)
}

function $$(selector) {
    return document.querySelectorAll(selector)
}

function _(tag) {
    return document.createElement(tag)
}

const products = config.products
const productList = $("#productList")

let display = 0

for (let product of products) {
    if (display < 20) {
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
        price.textContent = '$' + product.price.toFixed(2)

        const btn = _('button')
        btn.classList.add('btn')
        btn.textContent = '+'

        btn.addEventListener('click', () => {
            alert("Product ID: " + product.id + "\nProduct Title: " + product.title)
        })

        img.addEventListener('click', () => {
            alert("This product's ID is " + product.id)
        })

        productBox.appendChild(img)
        productBox.appendChild(title)
        productBox.appendChild(price)
        productBox.appendChild(btn)
        productList.appendChild(productBox)

        display += 1

    }

}

// function to switch views
//    function showView(viewName){
//     for (const view of navLink)
//    }

function showView(viewName) {
    const views = $$(".view")

    for (const view of views) {
        view.classList.add("hide")
    }

    //show what we actually want 
    const sel = "#" + viewName
    const viewToShow = $(sel)
    viewToShow.classList.remove("hide")
}


const links = $$(".navLink")

for (const link of links) {
    link.addEventListener("click", (event) => {
        event.preventDefault()
        const viewName = link.getAttribute("href").substring(1)
        showView(viewName)
    })
}

// close about section button

const about = $("#about")
const aboutLink = $("#aboutLink")
const aboutLinkFooter = $("#aboutLinkFooter")
const closeButtonAbout = $("#closeButtonAbout")

aboutLink.addEventListener("click", (event) => { //open from header linker
    event.preventDefault()
    about.classList.remove("hide")
})

// open from footer

aboutLinkFooter.addEventListener("click", (event) => {
    event.preventDefault()
    about.classList.remove("hide")
})

closeButtonAbout.addEventListener("click", (event) => { // close section button
    about.classList.add("hide")
})


// home page for the 3 items that is being shown
function showFeatured() {
    const featured = $("#featured")

    let featuredCount = 0

    for (let product of products) {
        if (featuredCount < 3) {
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
            price.textContent = '$' + product.price.toFixed(2)

            const btn = _('button')
            btn.classList.add('btn')
            btn.textContent = '+'

            btn.addEventListener('click', () => {
                alert("Product ID: " + product.id + "\nProduct Title: " + product.title)
            })

            img.addEventListener('click', () => {
                alert("This product's ID is " + product.id)
            })

            productBox.appendChild(img)
            productBox.appendChild(title)
            productBox.appendChild(price)
            productBox.appendChild(btn)
            featured.appendChild(productBox)

            featuredCount += 1

        }
    }

}

showFeatured() // bruh it had to be called, took me long for no reason
