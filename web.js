// import config from './data/data-minifed.json' with { type: 'json' };
function $(selector) {
    return document.querySelector(selector)
}

function $$(selector) {
    return document.querySelectorAll(selector)
}

function _(tag) {
    return document.createElement(tag)
}

// const products = config.products
let products = []
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

        const title = _('a')
        title.setAttribute('href', '#singleProduct')
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

        img.addEventListener('click', (event) => {
            event.preventDefault()
            showProduct(product.id)
        })

        title.addEventListener("click", (event) => {
            event.preventDefault()
            showProduct(product.id)
        })

        productBox.appendChild(img)
        productBox.appendChild(title)
        productBox.appendChild(price)
        productBox.appendChild(btn)
        productList.appendChild(productBox)

        display += 1

    }

}

// cart section
let cart = []



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
    const viewToShow = document.getElementById(viewName)
    viewToShow.classList.remove("hide")
}


const links = $$(".navLink")

for (let link of links) {
    link.addEventListener("click", (event) => {
        event.preventDefault()
        showView(link.dataset.view)
    })
}

// close about section button

const about = $("#about")
const aboutLink = $("#aboutLink")
const aboutLinkFooter = $("#aboutLinkFooter")
const closeButtonAbout = $("#closeButtonAbout")

aboutLink.addEventListener("click", (event) => { //open from header linker
    event.preventDefault()
    about.showModal() // lab 9b
})

// open from footer

aboutLinkFooter.addEventListener("click", (event) => {
    event.preventDefault()
    about.classList.remove("hide")
})

closeButtonAbout.addEventListener("click", (event) => { // close section button
    event.preventDefault()
    about.close()// lab 9
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

            const title = _('a')
            title.setAttribute('href', "#singleProduct")
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
                showProduct(product.id)
            })

            title.addEventListener("click", (event) => {
                event.preventDefault()
                showProduct(product.id)
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

// single product

let currentProductId // needs this for the actual product for the view 


const specsTab = $("#specifiTab")
const reviewTab = $("#reviewTab")
const specs = $("#specs")
const reviews = $("#reviews")
// tabs

function showSpecsTab() {
    specs.classList.remove("hide")
    reviews.classList.add("hide")
}

function showReviewTab() {
    reviews.classList.remove("hide")
    specs.classList.add("hide")
}

specsTab.addEventListener("click", showSpecsTab)
reviewTab.addEventListener("click", showReviewTab)


function showProduct(id) {
    currentProductId = id

    let product

    for (let p of products) {
        if (p.id === id) {
            product = p
        }
    } // need to find the product and match it so function can grab the title, price, image

    $("#breadcrumb").textContent = "Home > " + product.category + " > " + product.title
    $("#detailImage").setAttribute("src", product.images[0])
    $("#detailImage").setAttribute("alt", product.title)
    $("#detailTitle").textContent = product.title
    $("#detailPrice").textContent = "$" + product.price.toFixed(2)
    $("#detailSku").textContent = "SKU: " + product.sku + " " + makeStar(product.rating)
    $("#detailDescription").textContent = product.description
    $("#quantity")
    // stock
    if (product.stock > 0) {
        $("#detailStock").textContent = "In Stock"
    } else {
        $("#detailStock").textContent = "Out of Stock"
    }

    // specifications section
    $("#weight").textContent = "Weight: " + product.weight + " lb"
    $("#dimensions").textContent = "Dimensions: " + product.dimensions.width + " x "
        + product.dimensions.height + " x " + product.dimensions.depth + " cm"
    $("#warranty").textContent = "Warranty: " + product.warrantyInformation
    $("#shippingInfo").textContent = "Shipping: " + product.shippingInformation
    $("#returnPolicy").textContent = "Return Policy: " + product.returnPolicy

    // review section
    reviews.textContent = ""
    for (let review of product.reviews) {
        const reviewBox = _("div")
        reviewBox.classList.add("review")

        const stars = _("p")
        stars.classList.add("stars")
        stars.textContent = makeStar(review.rating)

        const comment = _("p")
        comment.textContent = review.comment

        const name = _("p")
        const date = review.date.substring(0, 10)
        name.textContent = review.reviewerName + " - " + date

        reviewBox.appendChild(stars)
        reviewBox.appendChild(comment)
        reviewBox.appendChild(name)
        reviews.appendChild(reviewBox)
    }

    // tags
    const tagBox = $("#detailTags")
    tagBox.textContent = ""
    for (let tag of product.tags) {
        const tagItem = _("span")
        tagItem.classList.add("tagItem")
        tagItem.textContent = tag
        tagBox.appendChild(tagItem)
    }

    showSpecsTab()
    showView("singleProduct")


}

function makeStar(rating) {
    if (rating >= 4.5) {
        return "★★★★★"
    } else if (rating >= 3.5) {
        return "★★★★☆"
    } else if (rating >= 2.5) {
        return "★★★☆☆"
    } else if (rating >= 1.5) {
        return "★★☆☆☆"
    } else if (rating >= 0.5) {
        return "★☆☆☆☆"
    } else {
        return "☆☆☆☆☆"
    }

    const closeXButton = $("#closeXButton")
    closeXButton.addEventListener("click", () => {
        about.close() // lab9b
    })
}



showFeatured() // bruh it had to be called, took me long for no reason


