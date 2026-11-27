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
            addToCart(product.id, 1)
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

// cart
let cart = [] = JSON.parse(localStorage.getItem("cart")) || [] // lab 10



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
    if (viewName === "cart") {
        showCart()
    }
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
                addToCart(product.id, 1)
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
}

const closeXButton = $("#closeXButton")
closeXButton.addEventListener("click", () => {
    about.close() // lab9b
})

// cart
function findProduct(id) { // find
    const match = products.find(p => p.id == id)
    return match
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart))
}

//what i need: 
//      the count
//      add to cart
//      remove from the actual cart
//      get the shipping and summary
//      show the cart
//      check out
//      toast message

function showCartCount() {
    let count = 0

    for (let item of cart) {
        count += item.quantity
    }

    $("#cartCount").textContent = count
}

function addToCart(id, quantity) {
    const item = cart.find(p => p.id === id)
    if (item) {
        item.quantity += quantity
    } else {
        cart.push({ id: id, quantity: quantity })
    }

    saveCart()
    showCartCount()
}

function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id)
    saveCart()
    showCartCount()
    showCart()
}


function showSummary(merchandise) {
    const type = $("#shippingType").value
    const destination = $("#shippingDestination").value

    let shipping = 0 // cost value 

    if (merchandise > 500) {
        shipping = 0
    } else if (type == "Standard") {
        if (destination == "Canada") {
            shipping = 10
        } else if (destination === "United States") {
            shipping = 15
        } else {
            shipping = 20
        }

    } else if (type === "Express") {
        if (destination === "International") {
            shipping = 30
        } else {
            shipping = 25
        }
    } else {
        if (destination == "Canada") {
            shipping = 35
        } else {
            shipping = 50
        }
    }

    let tax = 0
    if (destination === "Canada") {
        tax = merchandise * 0.05
    }

    const total = merchandise + shipping + tax

    $("#merchandise").textContent = "$" + merchandise.toFixed(2)
    $("#shippingCost").textContent = "$" + shipping.toFixed(2)
    $("#tax").textContent = "$" + tax.toFixed(2)
    $("#total").textContent = "$" + total.toFixed(2)

}

function showCart() {
    const cartItems = $("#cartItems")
    cartItems.textContent = ""

    let merchandise = 0
    for (let item of cart) {
        const product = products.find(p => p.id === item.id)
        const subtotal = product.price * item.quantity
        merchandise += subtotal

        const row = _("tr")
        const removeTd = _("td")
        const removeBtn = _("button")
        removeBtn.textContent = "X"
        removeBtn.addEventListener("click", () => {
            removeFromCart(item.id)
        })
        removeTd.appendChild(removeBtn)
        const imageTd = _('td')
        const img = _("img")
        img.setAttribute("src", product.thumbnail)
        img.setAttribute("alt", product.title)
        imageTd.appendChild(img)

        const titleTd = _("td")
        titleTd.textContent = product.title
        const priceTd = _("td")
        priceTd.textContent = "$" + product.price.toFixed(2)
        const quantityTd = _("td")
        quantityTd.textContent = item.quantity
        const subTotalTd = _("td")
        subTotalTd.textContent = "$" + subtotal.toFixed(2)

        row.appendChild(removeTd)
        row.appendChild(imageTd)
        row.appendChild(titleTd)
        row.appendChild(priceTd)
        row.appendChild(quantityTd)
        row.appendChild(subTotalTd)
        cartItems.appendChild(row)

    }
    if (cart.length === 0) { //empty cart
        $("#emptyCart").classList.remove("hide")
        $("#cartTable").classList.add("hide")
        $("#cartBottom").classList.add("hide")
    } else {
        $("#emptyCart").classList.add("hide")
        $("#cartTable").classList.remove("hide")
        $("#cartBottom").classList.remove("hide")
    }

    showSummary(merchandise)
}

function checkout() {
    cart = []
    saveCart()
    showCartCount()
    showView("home")
}

const url = "https://dummyjson.com/products?limit=100"

async function getData() {
    try {
        const resp = await fetch(url)

        if (resp.ok) {
            const data = await resp.json()
            // do something with data
            products = data.products
            localStorage.setItem("products", JSON.stringify(products)) // lab 10
        } else {
            throw new Error("fetch failed")
        }

        showFeatured() // get data has to finish before this function so when the data is ready
    } catch (err) {
        // handle error
        console.error(err)
    }
}

getData()
showCartCount()

// showFeatured() // bruh it had to be called, took me long for no reason
